
import { useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Camera, Computer, Mic } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { checkRelayServerAvailability } from '@/utils/relayServerUtils';
import { useDesktop } from '@/contexts/DesktopContext';

interface DashboardInitializerProps {
  onInitialized: () => void;
}

const DashboardInitializer = ({ onInitialized }: DashboardInitializerProps) => {
  const { 
    setScenes, 
    setSources, 
    setAiFeatures,
    setRelayServerAvailable
  } = useAppContext();
  
  const { isDesktop, platform } = useDesktop();
  
  useEffect(() => {
    try {
      // Log initialization in desktop environment
      if (isDesktop) {
        console.log(`Initializing dashboard in desktop environment on ${platform}`);
      }
      
      // Check for relay server availability
      checkRelayServerAvailability()
        .then(available => {
          console.log('Relay server available:', available);
          setRelayServerAvailable?.(available);
          
          if (available) {
            toast({
              title: 'Streaming Relay Available',
              description: 'Direct browser-to-platform streaming is available through our relay server.',
            });
          }
        })
        .catch(error => {
          console.error('Error checking relay server:', error);
          setRelayServerAvailable?.(false);
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

      // Desktop-specific initialization
      if (isDesktop) {
        // In a real app, we would initialize desktop-specific resources here
        console.log("Desktop environment detected - initializing platform-specific features");
      }

      onInitialized(); // Call onInitialized directly
    } catch (error) {
      console.error('Error initializing dashboard:', error);
      onInitialized(); // Still call onInitialized to prevent permanent loading state
    }
  }, [setScenes, setSources, setAiFeatures, onInitialized, setRelayServerAvailable, isDesktop, platform]);
  
  return null; // This is a utility component, it doesn't render anything
};

export default DashboardInitializer;
