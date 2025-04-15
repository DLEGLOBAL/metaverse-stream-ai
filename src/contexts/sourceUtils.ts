
import { Source } from './types';
import { toast } from '@/hooks/use-toast';
import { activateRealDevice, deactivateRealDevice, getAllActiveStreams } from './mediaUtils';

export const toggleSourceActive = async (
  sources: Source[], 
  id: number, 
  setIsStreamPreviewAvailable: (isAvailable: boolean) => void,
  setSources: (sources: Source[]) => void
) => {
  const sourceIndex = sources.findIndex(source => source.id === id);
  if (sourceIndex === -1) return sources;
  
  const source = sources[sourceIndex];
  const newActive = !source.active;
  
  if (newActive) {
    // Attempting to activate a device
    const success = await activateRealDevice(
      source, 
      setIsStreamPreviewAvailable,
      setSources,
      sources
    );
    
    if (!success) {
      // If activation failed, don't toggle the state
      return sources;
    }
  } else {
    // Deactivating a device
    deactivateRealDevice(source.id);
    
    // Show toast notification
    toast({
      title: 'Source Deactivated',
      description: `${source.name} is now inactive`,
    });
  }
  
  // Update the sources array with the new state
  const newSources = sources.map(source => {
    if (source.id === id) {
      return { ...source, active: newActive };
    }
    return source;
  });
  
  // Check if any video source is active after toggling
  const hasActiveVideoSource = newSources.some(
    source => source.active && (source.type === 'camera' || source.type === 'display')
  );
  
  // Additionally check actual active streams (more reliable)
  const streams = getAllActiveStreams();
  const streamKeys = Object.keys(streams);
  const hasActiveVideoStream = streamKeys.includes('camera') || streamKeys.includes('display');
  
  // Set availability based on both checks
  setIsStreamPreviewAvailable(hasActiveVideoSource || hasActiveVideoStream);
  console.log('Stream preview availability updated:', { hasActiveVideoSource, hasActiveVideoStream });
  
  return newSources;
};
