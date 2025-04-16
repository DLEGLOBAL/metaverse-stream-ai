
import { Source } from './types';
import { toast } from '@/hooks/use-toast';

// Store for active streams
const activeStreams: Record<string, MediaStream> = {};

// Connects to a real camera or microphone
export const activateRealDevice = async (
  source: Source,
  setIsStreamPreviewAvailable: (isAvailable: boolean) => void,
  setSources: (sources: Source[]) => void,
  sources: Source[]
): Promise<boolean> => {
  try {
    console.log(`Attempting to activate ${source.type} source: ${source.name}`);
    
    // Define constraints based on source type
    let constraints: MediaStreamConstraints = {};
    
    if (source.type === 'camera') {
      constraints = { 
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      };
    } else if (source.type === 'audio') {
      constraints = { 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      };
    } else if (source.type === 'display') {
      try {
        // For screen sharing, we use a different API
        const displayStream = await navigator.mediaDevices.getDisplayMedia({ 
          video: true,
          audio: false 
        });
        
        activeStreams['display'] = displayStream;
        
        toast({
          title: 'Screen Share Activated',
          description: `${source.name} is now active`,
        });
        
        // Ensure there's at least one video source active
        setIsStreamPreviewAvailable(true);
        return true;
      } catch (error) {
        console.error('Error getting display media:', error);
        toast({
          title: 'Screen Share Error',
          description: 'Could not access screen sharing. Please check permissions.',
          variant: 'destructive',
        });
        return false;
      }
    }
    
    // Get user media based on constraints
    if (Object.keys(constraints).length > 0) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        // Store the stream for later use
        if (source.type === 'camera') {
          activeStreams['camera'] = stream;
          
          toast({
            title: 'Camera Activated',
            description: `${source.name} is now active`,
          });
          
          // Ensure there's at least one video source active
          setIsStreamPreviewAvailable(true);
        } else if (source.type === 'audio') {
          activeStreams['audio'] = stream;
          
          toast({
            title: 'Microphone Activated',
            description: `${source.name} is now active`,
          });
        }
        
        return true;
      } catch (error) {
        console.error(`Error getting ${source.type} media:`, error);
        toast({
          title: `${source.type === 'camera' ? 'Camera' : 'Microphone'} Error`,
          description: `Could not access your ${source.type}. Please check permissions.`,
          variant: 'destructive',
        });
        return false;
      }
    }
    
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
  console.log(`Deactivating source with ID: ${sourceId}`);
  
  // Identify source type from ID to clean up the right stream
  const sourceType = sourceId === 1 ? 'camera' : 
                    sourceId === 2 ? 'display' : 
                    sourceId === 3 ? 'audio' : null;
                    
  if (sourceType && activeStreams[sourceType]) {
    console.log(`Stopping ${sourceType} stream`);
    
    // Stop all tracks
    activeStreams[sourceType].getTracks().forEach(track => {
      track.stop();
    });
    
    // Remove the stream
    delete activeStreams[sourceType];
  }
};

export const getAllActiveStreams = (): Record<string, MediaStream> => {
  // Add stream validation - make sure we only return streams with tracks
  const validStreams: Record<string, MediaStream> = {};
  
  for (const [key, stream] of Object.entries(activeStreams)) {
    if (stream && stream.getTracks().length > 0) {
      validStreams[key] = stream;
    }
  }
  
  return validStreams;
};

// Helper function to check if there's any active video source
export const hasActiveVideoSource = (sources: Source[]): boolean => {
  // Check sources array
  const hasActiveVideoInSources = sources.some(
    source => source.active && (source.type === 'camera' || source.type === 'display')
  );
  
  // Also check actual streams
  const streams = getAllActiveStreams();
  const hasVideoTracks = Object.values(streams).some(stream => 
    stream.getVideoTracks().length > 0
  );
  
  return hasActiveVideoInSources && hasVideoTracks;
};
