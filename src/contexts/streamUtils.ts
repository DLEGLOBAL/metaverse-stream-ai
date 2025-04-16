import { Stats, StreamStatus, Source } from './types';
import { toast } from '@/hooks/use-toast';
import { getAllActiveStreams } from './mediaUtils';
import { 
  startRelayStream, 
  stopRelayStream, 
  checkRelayServerAvailability 
} from '@/utils/relayServerUtils';

// Variables for stream management
let streamingStatsInterval: number | null = null;
let activeDestinations: string[] = [];
let streamingSessionId: string | null = null;

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
      
      activeDestinations = enabledPlatforms.map((p: any) => p.platform);
      
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
          startRelayStream(window.streamForBroadcast, enabledPlatforms)
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
  
  // Stop simulation
  setStreamStatus('offline');
  activeDestinations = [];
  
  if (streamingStatsInterval) {
    clearInterval(streamingStatsInterval);
    streamingStatsInterval = null;
  }
  
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

// Function to simulate stream stats
export const simulateStatsChange = (
  streamStatus: StreamStatus,
  setStats: (stats: Stats) => void
) => {
  // Only simulate changes when streaming is active
  if (streamStatus !== 'live') return;
  
  // Clear any existing interval
  if (streamingStatsInterval) {
    clearInterval(streamingStatsInterval);
  }
  
  // Generate realistic stats based on actual video resolution and encoding
  const getActiveResolution = () => {
    const streams = getAllActiveStreams();
    let resolution = "720p";
    
    // Try to get actual resolution from video track
    if (streams.camera || streams.display) {
      const stream = streams.camera || streams.display;
      const videoTrack = stream.getVideoTracks()[0];
      
      if (videoTrack) {
        const settings = videoTrack.getSettings();
        if (settings.width && settings.height) {
          if (settings.width >= 1920) {
            resolution = "1080p";
          } else if (settings.width >= 1280) {
            resolution = "720p";
          } else {
            resolution = "480p";
          }
        }
      }
    }
    
    return resolution;
  };
  
  const resolution = getActiveResolution();
  const baseBitrate = resolution === "1080p" ? 6000 : resolution === "720p" ? 4500 : 2500;
  
  let streamStartTime = Date.now();
  let viewers = Math.floor(Math.random() * 10) + 1; // Start with 1-10 viewers
  
  // Update stats on interval
  streamingStatsInterval = window.setInterval(() => {
    // Calculate stream duration in seconds
    const streamDuration = Math.floor((Date.now() - streamStartTime) / 1000);
    
    // Gradually increase viewers (more realistic)
    if (streamDuration > 60 && streamDuration % 30 === 0) {
      // Every 30 seconds after the first minute, maybe add some viewers
      if (Math.random() > 0.7) {
        viewers += Math.floor(Math.random() * 3) + 1;
      }
    }
    
    // Calculate bitrate with some fluctuation
    const bitrateFluctuation = Math.floor(Math.random() * 500) - 250; // +/- 250
    const currentBitrate = baseBitrate + bitrateFluctuation;
    
    // CPU usage increases slightly over time
    const baseCpuUsage = 20 + Math.floor(streamDuration / 60); // Increase by ~1% per minute
    const cpuVariation = Math.floor(Math.random() * 10) - 5; // +/- 5%
    const cpuUsage = Math.min(95, Math.max(5, baseCpuUsage + cpuVariation)); // Keep between 5-95%
    
    // RAM usage is more stable but gradually increases
    const baseRamUsage = 2.5 + (streamDuration / 3600); // Add ~1GB per hour
    const ramVariation = (Math.random() * 0.3) - 0.15; // +/- 0.15GB
    const ramUsage = baseRamUsage + ramVariation;
    
    // Stream health
    const streamQuality = 
      currentBitrate < baseBitrate - 1000 ? 'warning' :
      cpuUsage > 90 ? 'warning' :
      'good';
    
    setStats({
      bitrate: `${currentBitrate} kbps`,
      cpuUsage: `${cpuUsage}%`,
      ramUsage: `${ramUsage.toFixed(1)} GB`,
      gpuEncoding: 'NVENC',
      status: streamQuality,
      resolution: resolution,
      frameRate: resolution === "1080p" ? "30fps" : "60fps",
      viewers: viewers.toString(),
      activeDestinations
    });
  }, 3000);
  
  // Return cleanup function
  return () => {
    if (streamingStatsInterval) {
      clearInterval(streamingStatsInterval);
      streamingStatsInterval = null;
    }
  };
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
