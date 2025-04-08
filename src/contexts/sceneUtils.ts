
import { Scene } from './types';
import { toast } from '@/hooks/use-toast';

export const toggleSceneActive = (
  scenes: Scene[], 
  id: number, 
  setScenes: (scenes: Scene[]) => void,
  setActiveSceneId: (id: number | null) => void
) => {
  const newScenes = scenes.map(scene => ({
    ...scene,
    active: scene.id === id
  }));
  
  // Update active scene ID
  setActiveSceneId(id);
  
  // Notify user
  const activatedScene = newScenes.find(scene => scene.id === id);
  if (activatedScene) {
    toast({
      title: 'Scene Activated',
      description: `Switched to "${activatedScene.name}" scene`,
    });
  }
  
  return newScenes;
};
