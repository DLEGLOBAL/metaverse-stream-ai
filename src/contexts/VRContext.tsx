
import React, { createContext, useContext, useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface VRDevice {
  id: string;
  name: string;
  type: string;
  connected: boolean;
  batteryLevel?: number;
  resolution?: string;
  connectionType?: string;
  latency?: string;
}

interface VRContextType {
  devices: VRDevice[];
  activeDeviceId: string | null;
  isCapturing: boolean;
  captureMode: 'firstPerson' | 'mixedReality' | 'thirdPerson';
  connectDevice: (deviceId: string) => void;
  disconnectDevice: (deviceId: string) => void;
  startCapture: () => void;
  stopCapture: () => void;
  setCaptureMode: (mode: 'firstPerson' | 'mixedReality' | 'thirdPerson') => void;
}

const VRContext = createContext<VRContextType | undefined>(undefined);

export const VRProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [devices, setDevices] = useState<VRDevice[]>([
    {
      id: 'quest3',
      name: 'Meta Quest 3',
      type: 'Standalone VR Headset',
      connected: false,
      batteryLevel: 82,
      resolution: '2064 x 2208',
      connectionType: 'WiFi',
      latency: '35ms'
    },
    {
      id: 'steam-vr',
      name: 'PCVR / SteamVR',
      type: 'PC-Connected VR',
      connected: false
    },
    {
      id: '360-cam',
      name: '360° Camera',
      type: 'External VR Camera',
      connected: false
    }
  ]);
  
  const [activeDeviceId, setActiveDeviceId] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureMode, setCaptureMode] = useState<'firstPerson' | 'mixedReality' | 'thirdPerson'>('firstPerson');

  const connectDevice = (deviceId: string) => {
    setDevices(prevDevices => 
      prevDevices.map(device => 
        device.id === deviceId ? { ...device, connected: true } : device
      )
    );
    setActiveDeviceId(deviceId);
    
    const device = devices.find(d => d.id === deviceId);
    if (device) {
      toast({
        title: "VR Device Connected",
        description: `${device.name} has been connected successfully.`,
      });
    }
  };

  const disconnectDevice = (deviceId: string) => {
    setDevices(prevDevices => 
      prevDevices.map(device => 
        device.id === deviceId ? { ...device, connected: false } : device
      )
    );
    
    if (activeDeviceId === deviceId) {
      setActiveDeviceId(null);
      if (isCapturing) {
        stopCapture();
      }
    }
    
    const device = devices.find(d => d.id === deviceId);
    if (device) {
      toast({
        title: "VR Device Disconnected",
        description: `${device.name} has been disconnected.`,
      });
    }
  };

  const startCapture = () => {
    if (!activeDeviceId) {
      toast({
        title: 'Cannot Start Capture',
        description: 'No active VR device available. Please connect a device first.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsCapturing(true);
    toast({
      title: "Starting VR Capture",
      description: "Capturing VR content stream...",
    });
  };

  const stopCapture = () => {
    setIsCapturing(false);
    toast({
      title: "VR Capture Stopped",
      description: "VR content stream has been stopped.",
    });
  };

  const handleSetCaptureMode = (mode: 'firstPerson' | 'mixedReality' | 'thirdPerson') => {
    setCaptureMode(mode);
    toast({
      title: "Capture Mode Changed",
      description: `Switched to ${mode} mode`,
    });
  };

  return (
    <VRContext.Provider
      value={{
        devices,
        activeDeviceId,
        isCapturing,
        captureMode,
        connectDevice,
        disconnectDevice,
        startCapture,
        stopCapture,
        setCaptureMode: handleSetCaptureMode
      }}
    >
      {children}
    </VRContext.Provider>
  );
};

export const useVRContext = () => {
  const context = useContext(VRContext);
  if (context === undefined) {
    throw new Error('useVRContext must be used within a VRProvider');
  }
  return context;
};
