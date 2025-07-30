
import { Source } from '../types';
import { toast } from '@/hooks/use-toast';

// Store for active streams
const activeStreams: Record<string, MediaStream> = {};

// Get all active media streams
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
      // Try with less restrictive constraints first
      constraints = { 
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 }
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
        
        // Add track ended listener
        displayStream.getVideoTracks().forEach(track => {
          track.addEventListener('ended', () => {
            // When the user stops sharing (e.g., by clicking the browser's "Stop sharing" button),
            // we need to update our UI state
            const sourceIndex = sources.findIndex(s => s.type === 'display');
            if (sourceIndex >= 0) {
              const updatedSources = [...sources];
              updatedSources[sourceIndex] = {...updatedSources[sourceIndex], active: false};
              setSources(updatedSources);
              
              // Remove from active streams
              delete activeStreams['display'];
              
              toast({
                title: 'Screen Sharing Ended',
                description: 'You have stopped sharing your screen.'
              });
            }
          });
        });
        
        toast({
          title: 'Screen Share Activated',
          description: `${source.name} is now active`,
        });
        
        // Ensure there's at least one video source active
        setIsStreamPreviewAvailable(true);
        return true;
      } catch (error) {
        console.error('Error getting display media:', error);
        let errorMessage = 'Could not access screen sharing. Please check permissions.';
        
        // More specific error messages
        if (error instanceof Error) {
          if (error.name === 'NotAllowedError') {
            errorMessage = 'Screen sharing permission was denied. Please try again and allow access.';
          } else if (error.name === 'AbortError') {
            errorMessage = 'Screen sharing was cancelled.';
          }
        }
        
        toast({
          title: 'Screen Share Error',
          description: errorMessage,
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
        
        let errorMessage = `Could not access your ${source.type}. Please check permissions.`;
        
        // More specific error messages based on the error type
        if (error instanceof Error) {
          if (error.name === 'NotAllowedError') {
            errorMessage = `${source.type === 'camera' ? 'Camera' : 'Microphone'} access denied. Please enable permissions in your browser settings.`;
          } else if (error.name === 'NotFoundError') {
            errorMessage = `No ${source.type === 'camera' ? 'camera' : 'microphone'} found. Please check your device connections.`;
          } else if (error.name === 'NotReadableError') {
            errorMessage = `${source.type === 'camera' ? 'Camera' : 'Microphone'} is currently in use by another application. Please close other apps using your ${source.type} and try again.`;
            
            // For camera issues, try to help users by suggesting specific solutions
            if (source.type === 'camera') {
              // Try to release any existing camera streams first
              if (activeStreams['camera']) {
                activeStreams['camera'].getTracks().forEach(track => track.stop());
                delete activeStreams['camera'];
              }
              
              errorMessage += ' Common solutions: Close video conferencing apps (Zoom, Teams, Skype), browser tabs using camera, or restart your browser.';
            }
          } else if (error.name === 'OverconstrainedError') {
            // Try with less restrictive constraints for camera
            if (source.type === 'camera') {
              console.log('Trying with lower resolution constraints...');
              try {
                const fallbackStream = await navigator.mediaDevices.getUserMedia({ 
                  video: { width: 640, height: 480 } 
                });
                activeStreams['camera'] = fallbackStream;
                toast({
                  title: 'Camera Activated',
                  description: `${source.name} is now active (lower resolution)`,
                });
                setIsStreamPreviewAvailable(true);
                return true;
              } catch (fallbackError) {
                errorMessage = `Your camera does not support the required settings. Please try a different camera.`;
              }
            } else {
              errorMessage = `Your ${source.type} does not meet the required constraints. Try a different device.`;
            }
          }
        }
        
        toast({
          title: `${source.type === 'camera' ? 'Camera' : 'Microphone'} Error`,
          description: errorMessage,
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

// Create a unified stream from multiple sources for broadcasting
export const createBroadcastStream = () => {
  // TODO: Implement this to create a single stream from camera + display + audio
  // that can be sent to the relay server
};

// A utility function to check if the browser supports media access
export const checkMediaAccess = async (): Promise<{camera: boolean, microphone: boolean}> => {
  const result = { camera: false, microphone: false };
  
  try {
    // Check if getUserMedia is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia not supported in this browser");
      return result;
    }
    
    // Check camera permissions
    try {
      const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
      result.camera = true;
      cameraStream.getTracks().forEach(track => track.stop());
    } catch (e) {
      console.log("Camera permission denied or not available");
    }
    
    // Check microphone permissions
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      result.microphone = true;
      audioStream.getTracks().forEach(track => track.stop());
    } catch (e) {
      console.log("Microphone permission denied or not available");
    }
  } catch (e) {
    console.error("Error checking media permissions:", e);
  }
  
  return result;
};

// Get all available media devices
export const getAvailableMediaDevices = async (): Promise<MediaDeviceInfo[]> => {
  try {
    // First request permission to ensure device labels are populated
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      stream.getTracks().forEach(track => track.stop());
    } catch (e) {
      console.log("Could not get initial permissions:", e);
    }
    
    // Then enumerate devices
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices;
  } catch (error) {
    console.error("Error getting available devices:", error);
    return [];
  }
};
