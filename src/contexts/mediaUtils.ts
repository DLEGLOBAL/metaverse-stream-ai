
import { Source } from './types';
import { toast } from '@/hooks/use-toast';

// Mock streams for development
const mockStreams: Record<string, MediaStream> = {};

// In a real app, this would connect to actual camera/microphone
export const activateRealDevice = async (
  source: Source,
  setIsStreamPreviewAvailable: (isAvailable: boolean) => void,
  setSources: (sources: Source[]) => void,
  sources: Source[]
): Promise<boolean> => {
  try {
    console.log(`Attempting to activate ${source.type} source: ${source.name}`);
    
    // For demonstration purposes, we're creating mock streams
    // In a real app, we would use navigator.mediaDevices.getUserMedia
    
    if (source.type === 'camera') {
      if (!mockStreams['camera']) {
        // In a real app: const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        // For now, create an empty mock stream
        mockStreams['camera'] = new MediaStream();
        console.log('Created mock camera stream');
      }
      
      toast({
        title: 'Camera Activated',
        description: `${source.name} is now active`,
      });
      
      // Ensure there's at least one video source active
      setIsStreamPreviewAvailable(true);
      return true;
    }
    
    if (source.type === 'audio') {
      if (!mockStreams['audio']) {
        // In a real app: const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mockStreams['audio'] = new MediaStream();
        console.log('Created mock audio stream');
      }
      
      toast({
        title: 'Microphone Activated',
        description: `${source.name} is now active`,
      });
      return true;
    }
    
    if (source.type === 'display') {
      if (!mockStreams['display']) {
        // In a real app: const stream = await navigator.mediaDevices.getDisplayMedia();
        mockStreams['display'] = new MediaStream();
        console.log('Created mock display stream');
      }
      
      toast({
        title: 'Screen Share Activated',
        description: `${source.name} is now active`,
      });
      
      // Ensure there's at least one video source active
      setIsStreamPreviewAvailable(true);
      return true;
    }
    
    // Handle other source types as needed
    console.log(`Source type ${source.type} is not handled yet`);
    return false;
    
  } catch (error) {
    console.error(`Error activating ${source.type} source:`, error);
    toast({
      title: 'Activation Failed',
      description: `Could not activate ${source.name}. ${error instanceof Error ? error.message : 'Unknown error'}`,
      variant: 'destructive',
    });
    return false;
  }
};

export const deactivateRealDevice = (sourceId: number): void => {
  // In a real app, we would stop the tracks and clean up
  console.log(`Deactivating source with ID: ${sourceId}`);
  
  // We don't actually stop the mock streams here,
  // but in a real app we would stop the appropriate tracks
};

export const getAllActiveStreams = (): Record<string, MediaStream> => {
  console.log('Getting all active streams:', Object.keys(mockStreams));
  return mockStreams;
};
