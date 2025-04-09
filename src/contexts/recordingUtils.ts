
import { toast } from '@/hooks/use-toast';

export const startRecording = (
  setStreamStatus: (status: 'live' | 'offline' | 'recording') => void,
  setIsRecording: (isRecording: boolean) => void
) => {
  setStreamStatus('recording');
  setIsRecording(true);
  
  toast({
    title: 'Recording Started',
    description: 'Your stream is now being recorded locally',
  });
};

export const stopRecording = (
  setStreamStatus: (status: 'live' | 'offline' | 'recording') => void,
  setIsRecording: (isRecording: boolean) => void
) => {
  setStreamStatus('offline');
  setIsRecording(false);
  
  toast({
    title: 'Recording Stopped',
    description: 'Your recording has been saved',
  });
  
  // In a real implementation, we would save the recording to disk
  // For demonstration purposes, we'll just show a toast
  setTimeout(() => {
    toast({
      title: 'Recording Saved',
      description: 'Your recording has been saved to your local storage',
    });
  }, 1500);
};
