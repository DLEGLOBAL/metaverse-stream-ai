
import { useEffect } from 'react';
import { Scene, Source } from '../types';
import { toast } from '@/hooks/use-toast';

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
      
      const hasActiveVideoSource = sources.some(
        source => source.active && (source.type === 'camera' || source.type === 'display')
      );
      setIsStreamPreviewAvailable(hasActiveVideoSource);
      
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
