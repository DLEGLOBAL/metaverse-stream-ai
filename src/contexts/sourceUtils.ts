
import { Source } from './types';
import { toast } from '@/hooks/use-toast';

export const toggleSourceActive = (
  sources: Source[], 
  id: number, 
  setIsStreamPreviewAvailable: (isAvailable: boolean) => void
) => {
  const newSources = sources.map(source => {
    if (source.id === id) {
      const newActive = !source.active;
      
      // Show toast notification
      toast({
        title: newActive ? 'Source Activated' : 'Source Deactivated',
        description: `${source.name} is now ${newActive ? 'active' : 'inactive'}`,
      });
      
      return { ...source, active: newActive };
    }
    return source;
  });
  
  // Check if any video source is active after toggling
  const hasActiveVideoSource = newSources.some(
    source => source.active && (source.type === 'camera' || source.type === 'display')
  );
  setIsStreamPreviewAvailable(hasActiveVideoSource);
  
  return newSources;
};
