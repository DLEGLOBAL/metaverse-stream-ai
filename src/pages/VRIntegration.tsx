
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { EpilepsySafeModeProvider } from '@/components/accessibility/EpilepsySafeMode';
import VRIntegrationContent from '@/components/vr/VRIntegrationContent';
import { useVRContext } from '@/contexts/VRContext';

const VRIntegration = () => {
  const { 
    devices, 
    activeDeviceId, 
    connectDevice, 
    disconnectDevice, 
    startCapture 
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

  return (
    <DashboardLayout>
      <EpilepsySafeModeProvider>
        <VRIntegrationContent 
          deviceConnected={deviceConnected}
          handleConnectDevice={handleConnectDevice}
          handleDisconnectDevice={handleDisconnectDevice}
          handleStartCapture={startCapture}
        />
      </EpilepsySafeModeProvider>
    </DashboardLayout>
  );
};

export default VRIntegration;
