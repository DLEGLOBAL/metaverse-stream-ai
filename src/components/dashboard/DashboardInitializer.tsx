
import { useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Camera, Computer, Mic } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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
        toast({
          title: 'Browser Compatibility Issue',
          description: 'Your browser may not fully support camera/microphone access.',
          variant: 'destructive',
        });
      }
      
      // Show streaming limitation notice
      toast({
        title: 'Streaming Information',
        description: 'Due to browser limitations, direct streaming to platforms like Twitch requires additional software like OBS Studio.',
        duration: 8000,
      });
      
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
      
      // Initialize stream keys if not already set
      if (!localStorage.getItem('streamKeys')) {
        const defaultPlatforms = [
          {
            platform: 'Twitch',
            rtmpUrl: 'rtmp://live.twitch.tv/app',
            streamKey: ''
          },
          {
            platform: 'YouTube',
            rtmpUrl: 'rtmp://a.rtmp.youtube.com/live2',
            streamKey: ''
          },
          {
            platform: 'Facebook',
            rtmpUrl: 'rtmp://live-api-s.facebook.com:80/rtmp',
            streamKey: ''
          },
          {
            platform: 'TikTok',
            rtmpUrl: 'rtmp://rtmp-push.tiktok.com/live',
            streamKey: ''
          }
        ];
        localStorage.setItem('streamKeys', JSON.stringify(defaultPlatforms));
      }

      onInitialize();
    } catch (error) {
      console.error('Error initializing dashboard:', error);
      onInitialized(); // Still call onInitialized to prevent permanent loading state
    }
  }, [setScenes, setSources, setAiFeatures, onInitialized]);
  
  const onInitialize = () => {
    // Show streaming limitation modal on first load
    if (!localStorage.getItem('streamLimitationShown')) {
      setTimeout(() => {
        toast({
          title: 'Streaming Limitation Notice',
          description: 'This web app can preview your camera and microphone, but cannot directly stream to Twitch due to browser security restrictions. For professional streaming, please use OBS Studio or similar software.',
          duration: 10000,
        });
        localStorage.setItem('streamLimitationShown', 'true');
      }, 2000);
    }
    
    onInitialized();
  };
  
  return null; // This is a utility component, it doesn't render anything
};

export default DashboardInitializer;
