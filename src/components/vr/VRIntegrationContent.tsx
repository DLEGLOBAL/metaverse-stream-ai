
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Headset, Plug, Play } from 'lucide-react';
import { useEpilepsySafeMode } from '@/components/accessibility/EpilepsySafeMode';
import VRDeviceList from './VRDeviceList';
import VRPreview from './VRPreview';
import VRStreamSettings from './VRStreamSettings';
import { toast } from '@/hooks/use-toast';

interface VRIntegrationContentProps {
  deviceConnected: boolean;
  handleConnectDevice: () => void;
  handleDisconnectDevice: () => void;
  handleStartCapture: () => void;
}

const VRIntegrationContent: React.FC<VRIntegrationContentProps> = ({
  deviceConnected,
  handleConnectDevice,
  handleDisconnectDevice,
  handleStartCapture
}) => {
  const { EpilepsySafeModeToggle } = useEpilepsySafeMode();
  const [connecting, setConnecting] = useState(false);
  
  const onConnectDevice = async () => {
    setConnecting(true);
    
    try {
      // Check if WebXR is available
      if ('xr' in navigator) {
        // @ts-ignore - WebXR TS definitions might not be available
        const isSupported = await navigator.xr.isSessionSupported('immersive-vr');
        
        if (isSupported) {
          // In a real implementation, we would actually connect to the VR device here
          // For this demo, we'll simulate the connection after a delay
          setTimeout(() => {
            handleConnectDevice();
            setConnecting(false);
            toast({
              title: 'VR Device Connected',
              description: 'Meta Quest 3 has been connected successfully.',
            });
          }, 2000);
        } else {
          toast({
            title: 'VR Not Supported',
            description: 'Your browser or device does not support WebXR VR sessions.',
            variant: 'destructive',
          });
          setConnecting(false);
        }
      } else {
        toast({
          title: 'WebXR Not Available',
          description: 'WebXR is not supported in this browser. Please try using Chrome, Edge or Firefox.',
          variant: 'destructive',
        });
        setConnecting(false);
      }
    } catch (error) {
      console.error('Error connecting VR device:', error);
      toast({
        title: 'Connection Failed',
        description: 'Could not connect to VR device. Please check your hardware and try again.',
        variant: 'destructive',
      });
      setConnecting(false);
    }
  };
  
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
              onClick={onConnectDevice}
              disabled={connecting}
            >
              {connecting ? (
                <>
                  <div className="h-4 w-4 border-2 border-meta-dark-blue border-t-transparent rounded-full animate-spin mr-2"></div>
                  Connecting...
                </>
              ) : (
                <>
                  <Headset className="h-4 w-4 mr-2" /> Connect Device
                </>
              )}
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device selection */}
        <div>
          <VRDeviceList deviceConnected={deviceConnected} />
        </div>
          
        {/* Preview area */}
        <div className="lg:col-span-2">
          <VRPreview 
            deviceConnected={deviceConnected}
            handleStartCapture={handleStartCapture}
          />
          
          <VRStreamSettings deviceConnected={deviceConnected} />
        </div>
      </div>
    </div>
  );
};

export default VRIntegrationContent;
