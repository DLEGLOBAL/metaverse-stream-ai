
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
      // Set active scene
      const activeScene = scenes.find(scene => scene.active);
      if (activeScene) {
        setActiveSceneId(activeScene.id);
      }
      
      // Check for active video sources in the initial set of sources
      const hasVideoSource = sources.some(
        source => source.active && (source.type === 'camera' || source.type === 'display')
      );
      
      // Set availability based on source check
      setIsStreamPreviewAvailable(hasVideoSource);
      
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
