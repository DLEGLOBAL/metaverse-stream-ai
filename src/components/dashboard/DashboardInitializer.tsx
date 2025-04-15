
import { useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Camera, Computer, Mic } from 'lucide-react';

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
      // Check if browser supports getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.warn('Browser does not support camera/microphone access');
      }
      
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
        }
      ]);
      
      // Initialize sources
      setSources([
        {
          id: 1,
          name: "Webcam",
          type: "camera",
          icon: <Camera className="h-4 w-4" />,
          active: false,
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
          active: false,
        }
      ]);
      
      // Initialize AI features
      setAiFeatures([
        {
          id: 1,
          name: "AI Director",
          description: "Smart scene switching",
          enabled: false,
          hasSlider: false,
        },
        {
          id: 2,
          name: "Smart Green Screen",
          description: "Background removal",
          enabled: false,
          hasSlider: true,
          sliderValue: 75,
        }
      ]);

      onInitialized();
    } catch (error) {
      console.error('Error initializing dashboard:', error);
      onInitialized(); // Still call onInitialized to prevent permanent loading state
    }
  }, [setScenes, setSources, setAiFeatures, onInitialized]);
  
  return null; // This is a utility component, it doesn't render anything
};

export default DashboardInitializer;
