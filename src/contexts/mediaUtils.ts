
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
        // For now, create a mock stream with empty video track
        const mockStream = new MediaStream();
        // Add a mock video track to the stream
        const mockTrack = {
          kind: 'video',
          enabled: true,
          getSettings: () => ({}),
          applyConstraints: () => Promise.resolve(),
          getCapabilities: () => ({}),
          getConstraints: () => ({}),
          stop: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => true,
          onended: null,
          onmute: null,
          onunmute: null,
          id: 'mock-video-track',
          label: 'Mock Video Track',
          muted: false,
          readyState: 'live',
          contentHint: '',
          clone: function() { return this as MediaStreamTrack; }
        } as MediaStreamTrack;
        mockStream.addTrack(mockTrack);
        mockStreams['camera'] = mockStream;
        console.log('Created mock camera stream with video track');
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
        const mockStream = new MediaStream();
        // Add a mock audio track
        const mockTrack = {
          kind: 'audio',
          enabled: true,
          getSettings: () => ({}),
          applyConstraints: () => Promise.resolve(),
          getCapabilities: () => ({}),
          getConstraints: () => ({}),
          stop: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => true,
          onended: null,
          onmute: null,
          onunmute: null,
          id: 'mock-audio-track',
          label: 'Mock Audio Track',
          muted: false,
          readyState: 'live',
          contentHint: '',
          clone: function() { return this as MediaStreamTrack; }
        } as MediaStreamTrack;
        mockStream.addTrack(mockTrack);
        mockStreams['audio'] = mockStream;
        console.log('Created mock audio stream with audio track');
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
        const mockStream = new MediaStream();
        // Add a mock video track for display
        const mockTrack = {
          kind: 'video',
          enabled: true,
          getSettings: () => ({}),
          applyConstraints: () => Promise.resolve(),
          getCapabilities: () => ({}),
          getConstraints: () => ({}),
          stop: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => true,
          onended: null,
          onmute: null,
          onunmute: null,
          id: 'mock-display-track',
          label: 'Mock Display Track',
          muted: false,
          readyState: 'live',
          contentHint: '',
          clone: function() { return this as MediaStreamTrack; }
        } as MediaStreamTrack;
        mockStream.addTrack(mockTrack);
        mockStreams['display'] = mockStream;
        console.log('Created mock display stream with video track');
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
