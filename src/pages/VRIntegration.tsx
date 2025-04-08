
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { toast } from '@/hooks/use-toast';
import { EpilepsySafeModeProvider } from '@/components/accessibility/EpilepsySafeMode';
import VRIntegrationContent from '@/components/vr/VRIntegrationContent';

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

export default VRIntegration;
