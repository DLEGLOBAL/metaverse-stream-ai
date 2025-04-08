
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Headset, Play, Camera, RefreshCw } from 'lucide-react';
import { useVRContext } from '@/contexts/VRContext';
import { toast } from '@/hooks/use-toast';

const VRIntegrationPanel = () => {
  const { 
    devices, 
    activeDeviceId, 
    connectDevice, 
    disconnectDevice, 
    startCapture,
    isCapturing,
    captureMode,
    setCaptureMode
  } = useVRContext();
  
  const deviceConnected = !!activeDeviceId;
  
  const handleConnectDevice = () => {
    // Connect the first available device (Quest 3)
    connectDevice('quest3');
  };
  
  const handleDisconnectDevice = () => {
    if (activeDeviceId) {
      disconnectDevice(activeDeviceId);
    }
  };

  const handleStartCapture = () => {
    startCapture();
  };

  const handleChangeCaptureMode = (mode: 'firstPerson' | 'mixedReality' | 'thirdPerson') => {
    setCaptureMode(mode);
    toast({
      title: "Capture Mode Changed",
      description: `Switched to ${mode} mode`,
    });
  };

  const activeDevice = devices.find(d => d.id === activeDeviceId);

  return (
    <Card className="glass-card h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center">
          <Headset className="h-5 w-5 mr-2 text-meta-teal" />
          VR Integration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {deviceConnected ? (
            <div className="p-3 rounded-md border border-meta-teal/40 bg-meta-teal/10">
              <div className="flex items-center">
                <Headset className="h-6 w-6 mr-3 text-meta-teal" />
                <div>
                  <p className="font-medium text-white">{activeDevice?.name}</p>
                  <p className="text-xs text-gray-400">{activeDevice?.type}</p>
                </div>
                <div className="ml-auto">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-meta-teal rounded-full mr-2 animate-pulse"></div>
                    <span className="text-xs text-meta-teal">Connected</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-700">
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                  <div>Battery: <span className="text-meta-teal">{activeDevice?.batteryLevel}%</span></div>
                  <div>Latency: <span className="text-meta-teal">{activeDevice?.latency}</span></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-md border border-gray-700">
              <div className="flex items-center">
                <Headset className="h-6 w-6 mr-3 text-gray-400" />
                <div>
                  <p className="font-medium text-white">No Device Connected</p>
                  <p className="text-xs text-gray-400">Connect a VR headset to begin</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-2">
            {deviceConnected ? (
              <>
                <Button
                  variant="outline"
                  className="border-red-500/30 hover:bg-red-500/10 text-red-400 w-full"
                  onClick={handleDisconnectDevice}
                >
                  Disconnect
                </Button>
                <Button 
                  className="bg-meta-teal/20 hover:bg-meta-teal/30 text-meta-teal border border-meta-teal/30 w-full"
                  onClick={handleStartCapture}
                  disabled={isCapturing}
                >
                  <Play className="h-4 w-4 mr-2" /> {isCapturing ? 'Capturing...' : 'Start Capture'}
                </Button>
              </>
            ) : (
              <Button 
                className="bg-button-gradient text-meta-dark-blue hover:brightness-110 w-full col-span-2"
                onClick={handleConnectDevice}
              >
                <Headset className="h-4 w-4 mr-2" /> Connect Device
              </Button>
            )}
          </div>
          
          {deviceConnected && (
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="ghost"
                className={`p-1 h-auto text-xs ${captureMode === 'firstPerson' ? 'bg-meta-teal/20 text-meta-teal' : 'text-gray-400'}`}
                onClick={() => handleChangeCaptureMode('firstPerson')}
              >
                First Person
              </Button>
              <Button
                variant="ghost"
                className={`p-1 h-auto text-xs ${captureMode === 'mixedReality' ? 'bg-meta-teal/20 text-meta-teal' : 'text-gray-400'}`}
                onClick={() => handleChangeCaptureMode('mixedReality')}
              >
                Mixed Reality
              </Button>
              <Button
                variant="ghost"
                className={`p-1 h-auto text-xs ${captureMode === 'thirdPerson' ? 'bg-meta-teal/20 text-meta-teal' : 'text-gray-400'}`}
                onClick={() => handleChangeCaptureMode('thirdPerson')}
              >
                Third Person
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VRIntegrationPanel;
