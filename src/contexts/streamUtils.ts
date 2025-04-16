
import { Stats, StreamStatus, Source } from './types';
import { toast } from '@/hooks/use-toast';
import { getAllActiveStreams } from './mediaUtils';

// Mock data for demonstration - in a real app this would connect to real streaming services
let streamingStatsInterval: number | null = null;
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
      activeDestinations = platforms
        .filter((p: any) => p.streamKey.trim() !== '')
        .map((p: any) => p.platform);
      
      if (activeDestinations.length === 0) {
        toast({
          title: 'No Stream Keys Found',
          description: 'Please add at least one stream key in the Stream Keys section.',
          variant: 'destructive',
        });
        return;
      }
      
      // In a real implementation, this would connect to real streaming services using RTMPv2 or similar
      toast({
        title: 'Stream Started',
        description: `You are now streaming to ${activeDestinations.join(', ')}!`,
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
  
  // Set stream status to live - in production this would connect to actual streaming services
  setStreamStatus('live');
  
  // Start monitoring stream stats
  simulateStatsChange();
};

export const stopStream = (setStreamStatus: (status: StreamStatus) => void) => {
  // In production, this would disconnect from streaming services
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
      
      toast({
        title: 'Testing Stream',
        description: `Testing connection to ${withKeys.map((p: any) => p.platform).join(', ')}...`,
      });
      
      // In a real implementation, this would test the connection to streaming services
      setTimeout(() => {
        toast({
          title: 'Stream Test Completed',
          description: 'Your stream settings are working correctly',
        });
      }, 3000);
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
