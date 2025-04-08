import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Headset, Camera, RefreshCw, Smartphone, LinkIcon, Gamepad2, Plug, Play } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useEpilepsySafeMode, EpilepsySafeModeProvider } from '@/components/accessibility/EpilepsySafeMode';

const VRIntegration = () => {
  const [deviceConnected, setDeviceConnected] = useState(false);
  
  const handleConnectDevice = () => {
    toast({
      title: "Connecting VR Device",
      description: "Searching for compatible VR devices...",
    });
    
    // Simulate connection after 2 seconds
    setTimeout(() => {
      setDeviceConnected(true);
      toast({
        title: "VR Device Connected",
        description: "Meta Quest 3 has been connected successfully.",
      });
    }, 2000);
  };
  
  const handleDisconnectDevice = () => {
    setDeviceConnected(false);
    toast({
      title: "VR Device Disconnected",
      description: "Device has been disconnected.",
    });
  };
  
  const handleStartCapture = () => {
    toast({
      title: "Starting VR Capture",
      description: "Capturing VR content stream...",
    });
  };

  return (
    <DashboardLayout>
      <EpilepsySafeModeProvider>
        <VRIntegrationContent 
          deviceConnected={deviceConnected}
          handleConnectDevice={handleConnectDevice}
          handleDisconnectDevice={handleDisconnectDevice}
          handleStartCapture={handleStartCapture}
        />
      </EpilepsySafeModeProvider>
    </DashboardLayout>
  );
};

const VRIntegrationContent = ({
  deviceConnected,
  handleConnectDevice,
  handleDisconnectDevice,
  handleStartCapture
}: {
  deviceConnected: boolean;
  handleConnectDevice: () => void;
  handleDisconnectDevice: () => void;
  handleStartCapture: () => void;
}) => {
  const { EpilepsySafeModeToggle } = useEpilepsySafeMode();
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white dark:text-white">VR Integration</h1>
          <p className="text-gray-400 mt-1">Connect and stream from VR devices</p>
        </div>
        <div className="flex space-x-4 items-center">
          <EpilepsySafeModeToggle />
          {deviceConnected ? (
            <Button 
              variant="outline"
              className="border-red-500/30 hover:bg-red-500/10 text-red-400"
              onClick={handleDisconnectDevice}
            >
              <Plug className="h-4 w-4 mr-2" /> Disconnect Device
            </Button>
          ) : (
            <Button 
              className="bg-button-gradient text-meta-dark-blue hover:brightness-110"
              onClick={handleConnectDevice}
            >
              <Headset className="h-4 w-4 mr-2" /> Connect Device
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device selection */}
        <div>
          <Card className="glass-card h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">VR Devices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className={`p-4 rounded-md border ${deviceConnected ? 'border-meta-teal/40 bg-meta-teal/10' : 'border-gray-700'}`}>
                  <div className="flex items-center">
                    <Headset className={`h-6 w-6 mr-3 ${deviceConnected ? 'text-meta-teal' : 'text-gray-400'}`} />
                    <div>
                      <p className="font-medium text-white">Meta Quest 3</p>
                      <p className="text-xs text-gray-400">Standalone VR Headset</p>
                    </div>
                    <div className="ml-auto">
                      {deviceConnected && (
                        <div className="flex items-center">
                          <div className="h-2 w-2 bg-meta-teal rounded-full mr-2 animate-pulse"></div>
                          <span className="text-xs text-meta-teal">Connected</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {deviceConnected && (
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                        <div>Battery: <span className="text-meta-teal">82%</span></div>
                        <div>Resolution: <span className="text-meta-teal">2064 x 2208</span></div>
                        <div>Connection: <span className="text-meta-teal">WiFi</span></div>
                        <div>Latency: <span className="text-meta-teal">35ms</span></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-4 rounded-md border border-gray-700">
                    <div className="flex items-center">
                      <Gamepad2 className="h-6 w-6 mr-3 text-gray-400" />
                      <div>
                        <p className="font-medium text-white">PCVR / SteamVR</p>
                        <p className="text-xs text-gray-400">PC-Connected VR</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-md border border-gray-700">
                    <div className="flex items-center">
                      <Camera className="h-6 w-6 mr-3 text-gray-400" />
                      <div>
                        <p className="font-medium text-white">360° Camera</p>
                        <p className="text-xs text-gray-400">External VR Camera</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-meta-teal/30 hover:bg-meta-teal/10 text-white mt-2"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" /> Refresh Devices
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Preview area */}
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-white">VR Preview</CardTitle>
                <Button 
                  className="bg-meta-teal/20 hover:bg-meta-teal/30 text-meta-teal border border-meta-teal/30"
                  disabled={!deviceConnected}
                  onClick={handleStartCapture}
                >
                  <Play className="h-4 w-4 mr-2" /> Start Capture
                </Button>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-900 rounded-md flex items-center justify-center relative overflow-hidden border border-meta-teal/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-tr from-meta-dark-blue/80 to-meta-slate/80 absolute inset-0 flex items-center justify-center">
                      {deviceConnected ? (
                        <div className="flex flex-col items-center">
                          <Headset className="h-12 w-12 text-meta-teal mb-2" />
                          <p className="text-meta-teal">Meta Quest 3 Connected</p>
                          <p className="text-xs text-gray-400 mt-1">Ready to start capturing</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Headset className="h-12 w-12 text-meta-teal/40 mb-2" />
                          <p className="text-gray-400">No VR device connected</p>
                          <p className="text-xs text-gray-500 mt-1">Connect a VR headset to begin</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-meta-dark-blue p-3 rounded-md border border-meta-teal/20">
                    <div className="flex items-center">
                      <div className="bg-meta-teal/20 p-2 rounded-md mr-3">
                        <Camera className="h-4 w-4 text-meta-teal" />
                      </div>
                      <div>
                        <p className="text-sm text-white">First Person</p>
                        <p className="text-xs text-gray-400">View from headset</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-meta-dark-blue p-3 rounded-md border border-meta-teal/20">
                    <div className="flex items-center">
                      <div className="bg-meta-teal/20 p-2 rounded-md mr-3">
                        <Smartphone className="h-4 w-4 text-meta-teal" />
                      </div>
                      <div>
                        <p className="text-sm text-white">Mixed Reality</p>
                        <p className="text-xs text-gray-400">Blended view</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-meta-dark-blue p-3 rounded-md border border-meta-teal/20">
                    <div className="flex items-center">
                      <div className="bg-meta-teal/20 p-2 rounded-md mr-3">
                        <LinkIcon className="h-4 w-4 text-meta-teal" />
                      </div>
                      <div>
                        <p className="text-sm text-white">Third Person</p>
                        <p className="text-xs text-gray-400">External view</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">VR Stream Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Stream Resolution</label>
                    <select className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white" disabled={!deviceConnected}>
                      <option>1080p (Full HD)</option>
                      <option selected>1440p (QHD)</option>
                      <option>2160p (4K UHD)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Frame Rate</label>
                    <select className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white" disabled={!deviceConnected}>
                      <option>30 fps</option>
                      <option selected>60 fps</option>
                      <option>90 fps</option>
                      <option>120 fps</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Bitrate</label>
                    <select className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white" disabled={!deviceConnected}>
                      <option>10 Mbps</option>
                      <option>15 Mbps</option>
                      <option selected>20 Mbps</option>
                      <option>30 Mbps</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Encoding</label>
                    <select className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white" disabled={!deviceConnected}>
                      <option>Software (CPU)</option>
                      <option selected>Hardware (GPU)</option>
                      <option>Auto (Recommended)</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VRIntegration;
