
import { Stats, StreamStatus, Source } from './types';
import { toast } from '@/hooks/use-toast';
import { getAllActiveStreams } from './mediaUtils';

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
  
  // Set stream status to live - in production this would connect to actual streaming services
  setStreamStatus('live');
  toast({
    title: 'Stream Started',
    description: 'You are now live!',
  });
  
  // Start monitoring stream stats
  simulateStatsChange();
};

export const stopStream = (setStreamStatus: (status: StreamStatus) => void) => {
  // In production, this would disconnect from streaming services
  setStreamStatus('offline');
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
  
  toast({
    title: 'Testing Stream',
    description: 'Running stream test...',
  });
  
  // In production, this would perform an actual stream health check
  setTimeout(() => {
    toast({
      title: 'Stream Test Completed',
      description: 'Your stream settings are working correctly',
    });
  }, 3000);
};

export const simulateStatsChange = (
  streamStatus: StreamStatus,
  setStats: (stats: Stats) => void
) => {
  // Only simulate changes when streaming is active
  if (streamStatus !== 'live') return;
  
  // In production, this would get real stats from the streaming API
  const interval = setInterval(() => {
    setStats({
      bitrate: `${5800 + Math.floor(Math.random() * 500)} kbps`,
      cpuUsage: `${30 + Math.floor(Math.random() * 20)}%`,
      ramUsage: `${3 + Math.random().toFixed(1)} GB`,
      gpuEncoding: 'NVENC',
      status: 'good',
    });
  }, 5000);
  
  // Cleanup interval when stream stops
  return () => clearInterval(interval);
};
