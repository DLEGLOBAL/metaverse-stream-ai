
import { useEffect } from 'react';
import { Scene, Source } from '../types';
import { toast } from '@/hooks/use-toast';
import { hasActiveVideoSource } from '../mediaUtils';

type UseAppInitializerProps = {
  scenes: Scene[];
  sources: Source[];
  setActiveSceneId: (id: number | null) => void;
  setIsStreamPreviewAvailable: (isAvailable: boolean) => void;
};

export const useAppInitializer = ({
  scenes,
  sources,
  setActiveSceneId,
  setIsStreamPreviewAvailable
}: UseAppInitializerProps) => {
  useEffect(() => {
    try {
      console.log('Initializing app data');
      
      const activeScene = scenes.find(scene => scene.active);
      if (activeScene) {
        setActiveSceneId(activeScene.id);
      }
      
      // Use our helper function to check for video sources
      const hasVideoSource = hasActiveVideoSource(sources);
      setIsStreamPreviewAvailable(hasVideoSource);
      console.log('Initial stream preview availability:', hasVideoSource);
      
    } catch (error) {
      console.error('Error initializing app data:', error);
      toast({
        title: 'Error',
        description: 'Failed to initialize application data',
        variant: 'destructive',
      });
    }
  }, [scenes, sources, setActiveSceneId, setIsStreamPreviewAvailable]);
};
