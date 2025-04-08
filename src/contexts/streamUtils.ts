
import { Stats, StreamStatus } from './types';
import { toast } from '@/hooks/use-toast';

export const startStream = (
  isStreamPreviewAvailable: boolean, 
  setStreamStatus: (status: StreamStatus) => void,
  simulateStatsChange: () => void
) => {
  if (!isStreamPreviewAvailable) {
    toast({
      title: 'Cannot Start Stream',
      description: 'No active video source available. Please enable a camera or display source.',
      variant: 'destructive',
    });
    return;
  }
  
  setStreamStatus('live');
  toast({
    title: 'Stream Started',
    description: 'You are now live!',
  });
  
  // Simulate stats change during streaming
  simulateStatsChange();
};

export const stopStream = (setStreamStatus: (status: StreamStatus) => void) => {
  setStreamStatus('offline');
  toast({
    title: 'Stream Stopped',
    description: 'Your stream has ended',
  });
};

export const testStream = (isStreamPreviewAvailable: boolean) => {
  if (!isStreamPreviewAvailable) {
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
  
  // Simulate a 3-second test
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
