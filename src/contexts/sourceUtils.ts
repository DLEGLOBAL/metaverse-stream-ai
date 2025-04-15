
import { Source } from './types';
import { toast } from '@/hooks/use-toast';
import { activateRealDevice, deactivateRealDevice, hasActiveVideoSource } from './mediaUtils';

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
  
  // Set the updated sources state
  setSources(newSources);
  
  // Check if any video source is active after toggling
  const hasVideoSource = newSources.some(
    source => source.active && (source.type === 'camera' || source.type === 'display')
  );
  
  console.log('After toggle, active video source:', hasVideoSource);
  
  // Set availability based on source check
  setIsStreamPreviewAvailable(hasVideoSource);
  console.log('Stream preview availability updated:', hasVideoSource);
  
  return newSources;
};
