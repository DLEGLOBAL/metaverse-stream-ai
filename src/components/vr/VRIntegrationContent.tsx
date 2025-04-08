
import React from 'react';
import { Button } from '@/components/ui/button';
import { Headset, Plug, Play } from 'lucide-react';
import { useEpilepsySafeMode } from '@/components/accessibility/EpilepsySafeMode';
import VRDeviceList from './VRDeviceList';
import VRPreview from './VRPreview';
import VRStreamSettings from './VRStreamSettings';

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
