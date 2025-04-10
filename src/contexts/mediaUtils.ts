
import { toast } from '@/hooks/use-toast';
import { Source } from './types';

// Map source types to MediaDevices constraints
const getMediaConstraints = (sourceType: string) => {
  switch (sourceType) {
    case 'camera':
      return { video: true, audio: false };
    case 'display':
      return { video: true, audio: true };
    case 'audio':
      return { video: false, audio: true };
    default:
      return null;
  }
};

// Store active media streams
const activeStreams: Record<string, MediaStream> = {};

export const activateRealDevice = async (
  source: Source,
  setIsStreamPreviewAvailable: (value: boolean) => void,
  updateSources: (updatedSources: Source[]) => void,
  sources: Source[]
): Promise<boolean> => {
  try {
    // Get the appropriate constraints based on source type
    const constraints = getMediaConstraints(source.type);
    
    if (!constraints) {
      toast({
        title: 'Unsupported Source Type',
        description: `The source type "${source.type}" is not supported for device access.`,
        variant: 'destructive',
      });
      return false;
    }
    
    // If we already have an active stream for this source, stop it
    if (activeStreams[`source-${source.id}`]) {
      activeStreams[`source-${source.id}`].getTracks().forEach(track => track.stop());
      delete activeStreams[`source-${source.id}`];
    }
    
    let stream: MediaStream;
    
    // Get user media based on source type
    if (source.type === 'display') {
      // Screen sharing requires a different API
      stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      
      // Listen for when the user stops sharing via the browser UI
      stream.getVideoTracks()[0].onended = () => {
        // Update source to inactive
        const updatedSources = sources.map(s => 
          s.id === source.id ? { ...s, active: false } : s
        );
        updateSources(updatedSources);
        
        // Check if any video source is still active
        const hasActiveVideoSource = updatedSources.some(
          s => s.active && (s.type === 'camera' || s.type === 'display')
        );
        setIsStreamPreviewAvailable(hasActiveVideoSource);
        
        // Remove from active streams
        delete activeStreams[`source-${source.id}`];
        
        toast({
          title: 'Screen Sharing Stopped',
          description: 'You have stopped sharing your screen.',
        });
      };
    } else {
      // Camera or audio
      stream = await navigator.mediaDevices.getUserMedia(constraints);
    }
    
    // Store the active stream
    activeStreams[`source-${source.id}`] = stream;
    
    // Success! Show a toast notification
    toast({
      title: `${source.name} Activated`,
      description: source.type === 'display' 
        ? 'Screen sharing is now active.' 
        : `${source.name} is now connected and active.`,
    });
    
    return true;
  } catch (error) {
    console.error('Error activating media device:', error);
    
    let errorMessage = 'Unknown error occurred';
    
    if (error instanceof DOMException) {
      switch (error.name) {
        case 'NotAllowedError':
          errorMessage = 'Permission denied. Please allow access to your device.';
          break;
        case 'NotFoundError':
          errorMessage = 'No compatible device found. Please check your hardware.';
          break;
        case 'NotReadableError':
          errorMessage = 'Could not access your device. It may be in use by another application.';
          break;
        case 'OverconstrainedError':
          errorMessage = 'Could not find a device matching the requested constraints.';
          break;
        case 'AbortError':
          errorMessage = 'The operation was aborted.';
          break;
        default:
          errorMessage = `Error: ${error.message}`;
      }
    }
    
    toast({
      title: 'Device Activation Failed',
      description: errorMessage,
      variant: 'destructive',
    });
    
    return false;
  }
};

export const deactivateRealDevice = (sourceId: number): void => {
  // Stop all tracks in the stream
  if (activeStreams[`source-${sourceId}`]) {
    activeStreams[`source-${sourceId}`].getTracks().forEach(track => track.stop());
    delete activeStreams[`source-${sourceId}`];
  }
};

export const getActiveStream = (sourceId: number): MediaStream | null => {
  return activeStreams[`source-${sourceId}`] || null;
};

export const getAllActiveStreams = (): Record<string, MediaStream> => {
  return { ...activeStreams };
};
