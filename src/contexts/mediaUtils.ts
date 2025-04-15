import { Source } from './types';
import { toast } from '@/hooks/use-toast';

// Mock streams for development
const mockStreams: Record<string, MediaStream> = {};

// Helper function to create a valid mock track
const createMockTrack = (kind: 'video' | 'audio'): MediaStreamTrack => {
  // Create a temporary canvas or audio element to generate a real track
  if (kind === 'video') {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    
    // Draw something on the canvas to make it visible
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#1f2937';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '24px Arial';
      ctx.fillStyle = '#14b8a6';
      ctx.textAlign = 'center';
      ctx.fillText('Mock Camera', canvas.width / 2, canvas.height / 2);
    }
    
    // Get a real MediaStreamTrack from the canvas
    const stream = canvas.captureStream(30); // 30fps
    return stream.getVideoTracks()[0];
  } else {
    // For audio, create a silent audio track
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const destination = audioContext.createMediaStreamDestination();
    oscillator.connect(destination);
    oscillator.start();
    return destination.stream.getAudioTracks()[0];
  }
};

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
      const mockStream = new MediaStream();
      
      try {
        // Add a real video track to the stream from a canvas
        const videoTrack = createMockTrack('video');
        mockStream.addTrack(videoTrack);
        
        mockStreams['camera'] = mockStream;
        console.log('Created mock camera stream with video track');
      } catch (trackError) {
        console.error('Error creating video track:', trackError);
        toast({
          title: 'Camera Error',
          description: 'Could not create video source',
          variant: 'destructive',
        });
        return false;
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
      const mockStream = new MediaStream();
      
      try {
        // Add a real audio track to the stream
        const audioTrack = createMockTrack('audio');
        mockStream.addTrack(audioTrack);
        
        mockStreams['audio'] = mockStream;
        console.log('Created mock audio stream with audio track');
      } catch (trackError) {
        console.error('Error creating audio track:', trackError);
        return false;
      }
      
      toast({
        title: 'Microphone Activated',
        description: `${source.name} is now active`,
      });
      return true;
    }
    
    if (source.type === 'display') {
      const mockStream = new MediaStream();
      
      try {
        // Add a real video track to the stream from a canvas
        const videoTrack = createMockTrack('video');
        mockStream.addTrack(videoTrack);
        
        mockStreams['display'] = mockStream;
        console.log('Created mock display stream with video track');
      } catch (trackError) {
        console.error('Error creating video track:', trackError);
        toast({
          title: 'Screen Share Error',
          description: 'Could not create display source',
          variant: 'destructive',
        });
        return false;
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
  
  // Identify source type from ID to clean up the right mock stream
  const sourceTypes = ['camera', 'display', 'audio', 'vr', 'media'];
  
  // Map source ID to type based on common configuration
  const sourceType = sourceId === 1 ? 'camera' : 
                    sourceId === 2 ? 'display' : 
                    sourceId === 3 ? 'audio' : null;
                    
  if (sourceType && mockStreams[sourceType]) {
    console.log(`Removing ${sourceType} mock stream`);
    
    // In a real app, we would stop all tracks
    // For our mocks, just delete the stream
    delete mockStreams[sourceType];
  }
};

export const getAllActiveStreams = (): Record<string, MediaStream> => {
  console.log('Getting all active streams:', Object.keys(mockStreams));
  
  // For debugging
  for (const [key, stream] of Object.entries(mockStreams)) {
    console.log(`Stream ${key} has ${stream.getTracks().length} tracks`);
    stream.getTracks().forEach(track => {
      console.log(`- Track: ${track.kind}, enabled: ${track.enabled}, readyState: ${track.readyState}`);
    });
  }
  
  // Add stream validation - make sure we only return streams with tracks
  const validStreams: Record<string, MediaStream> = {};
  
  for (const [key, stream] of Object.entries(mockStreams)) {
    if (stream.getTracks().length > 0) {
      validStreams[key] = stream;
    } else {
      console.log(`Stream ${key} has no tracks, not including it`);
    }
  }
  
  return validStreams;
};

// Helper function to check if there's any active video source
export const hasActiveVideoSource = (sources: Source[]): boolean => {
  // Check sources array first
  const hasActiveVideoInSources = sources.some(
    source => source.active && (source.type === 'camera' || source.type === 'display')
  );
  
  // Also check actual streams
  const streams = getAllActiveStreams();
  const hasVideoTracks = Object.values(streams).some(stream => 
    stream.getVideoTracks().length > 0
  );
  
  console.log(`Active video check: sources=${hasActiveVideoInSources}, streams=${hasVideoTracks}`);
  console.log('Current streams:', Object.keys(streams));
  
  // Log details of available streams for debugging
  Object.entries(streams).forEach(([key, stream]) => {
    console.log(`Stream ${key}:`, stream.id);
    console.log(`- All tracks: ${stream.getTracks().length}`);
    console.log(`- Video tracks: ${stream.getVideoTracks().length}`);
    console.log(`- Audio tracks: ${stream.getAudioTracks().length}`);
  });
  
  return hasActiveVideoInSources && hasVideoTracks;
};
