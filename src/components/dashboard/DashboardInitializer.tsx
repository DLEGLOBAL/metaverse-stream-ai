
import { useEffect, useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Camera, Computer, Headset, Mic, Video } from 'lucide-react';

interface DashboardInitializerProps {
  onInitialized: () => void;
}

const DashboardInitializer = ({ onInitialized }: DashboardInitializerProps) => {
  const { 
    setScenes, 
    setSources, 
    setAiFeatures 
  } = useAppContext();
  
  useEffect(() => {
    try {
      console.log('Dashboard component mounted');
      
      // Initialize scenes
      setScenes([
        {
          id: 1,
          name: "Main Camera",
          active: true,
        },
        {
          id: 2,
          name: "Screen Share",
          active: false,
        },
        {
          id: 3,
          name: "Game Overlay",
          active: false,
        },
        {
          id: 4,
          name: "VR Experience",
          active: false,
        }
      ]);
      
      // Initialize sources
      setSources([
        {
          id: 1,
          name: "Webcam",
          type: "camera",
          icon: <Camera className="h-4 w-4" />,
          active: true,
        },
        {
          id: 2,
          name: "Desktop",
          type: "display",
          icon: <Computer className="h-4 w-4" />,
          active: false,
        },
        {
          id: 3,
          name: "Microphone",
          type: "audio",
          icon: <Mic className="h-4 w-4" />,
          active: true,
        },
        {
          id: 4,
          name: "VR Headset",
          type: "vr",
          icon: <Headset className="h-4 w-4" />,
          active: false,
        },
        {
          id: 5,
          name: "Media File",
          type: "media",
          icon: <Video className="h-4 w-4" />,
          active: false,
        }
      ]);
      
      // Initialize AI features
      setAiFeatures([
        {
          id: 1,
          name: "AI Director",
          description: "Smart scene switching",
          enabled: true,
          hasSlider: false,
        },
        {
          id: 2,
          name: "Smart Green Screen",
          description: "Background removal",
          enabled: true,
          hasSlider: true,
          sliderValue: 75,
        },
        {
          id: 3,
          name: "Voice Commands",
          description: "Hands-free control",
          enabled: false,
          hasSlider: false,
        },
        {
          id: 4,
          name: "AI Assistant",
          description: "Stream helper",
          enabled: true,
          hasSlider: false,
        }
      ]);

      console.log('Dashboard initialization complete');
      onInitialized();
    } catch (error) {
      console.error('Error initializing dashboard:', error);
      onInitialized(); // Still call onInitialized to prevent permanent loading state
    }
  }, [setScenes, setSources, setAiFeatures, onInitialized]);
  
  return null; // This is a utility component, it doesn't render anything
};

export default DashboardInitializer;
