
import { StreamStatus, Source } from '../types';
import { toast } from '@/hooks/use-toast';
import { getAllActiveStreams } from './mediaStreamUtils';
import { 
  startRelayStream, 
  stopRelayStream, 
  checkRelayServerAvailability 
} from '@/utils/relayServerUtils';

// Variables for stream management
let streamingSessionId: string | null = null;
let streamingInstance: { stop: () => void } | null = null;
let activeDestinations: string[] = [];

export const startStream = (
  isStreamPreviewAvailable: boolean, 
  setStreamStatus: (status: StreamStatus) => void,
  simulateStatsChange: () => void,
  sources: Source[]
) => {
  // Check if any video source is active
  const hasActiveVideoSource = sources.some(
    source => source.active && (source.type === 'camera' || source.type === 'display')
  );
  
  // Double-check with actual streams (more reliable)
  const streams = getAllActiveStreams();
  const streamKeys = Object.keys(streams);
  const hasActiveVideoStream = streamKeys.includes('camera') || streamKeys.includes('display');
  
  console.log('Active sources check:', { hasActiveVideoSource, hasActiveVideoStream, isStreamPreviewAvailable });
  
  // Check for active audio
  const hasActiveAudio = sources.some(
    source => source.active && source.type === 'audio'
  );
  
  if (!hasActiveVideoSource && !hasActiveVideoStream) {
    toast({
      title: 'Cannot Start Stream',
      description: 'No active video source available. Please enable a camera or display source.',
      variant: 'destructive',
    });
    return;
  }
  
  if (!hasActiveAudio) {
    toast({
      title: 'Stream Started Without Audio',
      description: 'Warning: No active audio source. Your stream will be silent.',
      variant: 'default',
    });
  }

  // Get saved stream keys
  try {
    const savedKeys = localStorage.getItem('streamKeys');
    if (savedKeys) {
      const platforms = JSON.parse(savedKeys);
      const enabledPlatforms = platforms.filter((p: any) => p.streamKey.trim() !== '');
      
      if (enabledPlatforms.length === 0) {
        toast({
          title: 'No Stream Keys Found',
          description: 'Please add at least one stream key in the Stream Keys section.',
          variant: 'destructive',
        });
        return;
      }
      
      // Process platforms and handle advanced configurations
      const processedPlatforms = enabledPlatforms.map((platform: any) => {
        const processed = { 
          platform: platform.platform, 
          rtmpUrl: platform.rtmpUrl, 
          streamKey: platform.streamKey 
        };
        
        // Handle custom RTMP configurations
        if (platform.isAdvanced && platform.customConfig) {
          // Handle TikTok Beta Program
          if (platform.platform === 'TikTok' && platform.customConfig.betaProgram) {
            console.log('Using TikTok custom RTMP beta configuration');
            
            // In a real implementation, we might have special handling for TikTok's beta program
            toast({
              title: 'TikTok Beta',
              description: 'Using TikTok Custom RTMP Beta configuration.',
            });
          }
          
          // Handle Instagram proxy
          if (platform.platform === 'Instagram' && platform.customConfig.proxyEnabled) {
            console.log('Using Instagram proxy:', platform.customConfig.proxyType);
            
            // Set the custom RTMP URL for the proxy
            if (platform.customConfig.proxyUrl) {
              processed.rtmpUrl = platform.customConfig.proxyUrl;
            } else {
              // Set default proxy URLs based on the type
              switch (platform.customConfig.proxyType) {
                case 'yellowduck':
                  processed.rtmpUrl = 'rtmp://localhost:1935/rtmp';
                  break;
                case 'android-emulator':
                  processed.rtmpUrl = 'rtmp://127.0.0.1:1935/live';
                  break;
                default:
                  processed.rtmpUrl = platform.rtmpUrl;
              }
            }
            
            toast({
              title: 'Instagram Proxy',
              description: `Using ${platform.customConfig.proxyType} proxy for Instagram streaming.`,
            });
          }
        }
        
        return processed;
      });
      
      activeDestinations = processedPlatforms.map((p: any) => p.platform);
      
      // Check if we have the stream for broadcast
      if (!window.streamForBroadcast) {
        toast({
          title: 'Stream Not Ready',
          description: 'Media stream is not ready. Please try again.',
          variant: 'destructive',
        });
        return;
      }
      
      // Start streaming via the relay server
      checkRelayServerAvailability().then(isAvailable => {
        if (isAvailable) {
          // Connect to relay server
          startRelayStream(window.streamForBroadcast, processedPlatforms)
            .then(response => {
              if (response.success) {
                toast({
                  title: 'Connected to Streaming Relay',
                  description: 'Successfully connected to the streaming relay server.',
                });
                
                // Store the session ID
                streamingSessionId = response.sessionId || null;
                
                // Set stream status to live
                setStreamStatus('live');
                
                // Start monitoring stream stats
                simulateStatsChange();
              } else {
                throw new Error(response.error || 'Unknown error');
              }
            })
            .catch(error => {
              console.error('Failed to connect to relay server:', error);
              
              toast({
                title: 'Relay Server Error',
                description: 'Could not connect to streaming relay. Please check your connection.',
                variant: 'destructive',
              });
            });
        } else {
          toast({
            title: 'Relay Server Unavailable',
            description: 'Streaming relay server is not available. Please check network connection or contact support.',
            variant: 'destructive'
          });
        }
      });
    } else {
      toast({
        title: 'No Stream Keys Found',
        description: 'Please add your stream keys in the Stream Keys section.',
        variant: 'destructive',
      });
      return;
    }
  } catch (error) {
    console.error('Error parsing stream keys:', error);
    toast({
      title: 'Error Starting Stream',
      description: 'Could not read stream keys. Please check your settings.',
      variant: 'destructive',
    });
    return;
  }
};

export const stopStream = (setStreamStatus: (status: StreamStatus) => void) => {
  // Stop the relay connection
  stopRelayStream()
    .catch(error => console.error('Error disconnecting from relay server:', error));
  
  streamingSessionId = null;
  
  // Update status
  setStreamStatus('offline');
  activeDestinations = [];
  
  toast({
    title: 'Stream Stopped',
    description: 'Your stream has ended',
  });
};

export const testStream = (isStreamPreviewAvailable: boolean, sources: Source[]) => {
  // Check if any video source is active
  const hasActiveVideoSource = sources.some(
    source => source.active && (source.type === 'camera' || source.type === 'display')
  );
  
  if (!hasActiveVideoSource) {
    toast({
      title: 'Cannot Test Stream',
      description: 'No active video source available. Please enable a camera or display source.',
      variant: 'destructive',
    });
    return;
  }
  
  // Get saved stream keys
  try {
    const savedKeys = localStorage.getItem('streamKeys');
    if (savedKeys) {
      const platforms = JSON.parse(savedKeys);
      const withKeys = platforms.filter((p: any) => p.streamKey.trim() !== '');
      
      if (withKeys.length === 0) {
        toast({
          title: 'No Stream Keys Found',
          description: 'Please add at least one stream key to test your stream.',
          variant: 'destructive',
        });
        return;
      }
      
      // Test connection to relay server
      checkRelayServerAvailability()
        .then(isAvailable => {
          if (isAvailable) {
            toast({
              title: 'Relay Server Available',
              description: 'Successfully connected to the streaming relay server. You can now go live directly from your browser!',
            });
          } else {
            toast({
              title: 'Relay Server Test Failed',
              description: 'Could not connect to the streaming relay. Please check your connection.',
              variant: 'destructive'
            });
          }
        })
        .catch(error => {
          console.error('Failed to test relay server connection:', error);
          toast({
            title: 'Relay Server Test Failed',
            description: 'Error connecting to streaming relay server.',
            variant: 'destructive'
          });
        });
    } else {
      toast({
        title: 'No Stream Keys Found',
        description: 'Please add your stream keys before testing.',
        variant: 'destructive',
      });
    }
  } catch (error) {
    console.error('Error parsing stream keys:', error);
    toast({
      title: 'Error Testing Stream',
      description: 'Could not read stream keys. Please check your settings.',
      variant: 'destructive',
    });
  }
};

// Function to actually stream to RTMP servers
// Note: Web browsers require a relay server to stream to RTMP 
const startActualStreaming = (mediaStream: MediaStream, platforms: any[]) => {
  try {
    console.log('Starting actual streaming with platforms:', platforms);
    
    // In a real implementation:
    // 1. We would connect to our relay server via WebRTC
    // 2. The relay server would take our WebRTC stream and push it to RTMP destinations
    
    platforms.forEach(platform => {
      console.log(`Streaming to ${platform.platform} via relay server`);
    });
    
    streamingInstance = {
      stop: () => {
        console.log('Stopping streams via relay server');
      }
    };
    
  } catch (error) {
    console.error('Error in startActualStreaming:', error);
    toast({
      title: 'Streaming Error',
      description: 'Could not connect to streaming service. Please check your settings.',
      variant: 'destructive',
    });
  }
};

// Test RTMP connection via relay - simulated
const testRTMPConnection = (platforms: any[]) => {
  try {
    platforms.forEach(platform => {
      console.log(`Testing relay connection to ${platform.platform}`);
    });
  } catch (error) {
    console.error('Error testing relay connection:', error);
  }
};

export const getActiveDestinations = (): string[] => {
  return activeDestinations;
};
