
import { toggleSceneActive as toggleSceneActiveUtil } from '../sceneUtils';
import { Scene } from '../types';

type UseSceneHandlersProps = {
  setScenes: (scenes: Scene[]) => void;
  setActiveSceneId: (id: number | null) => void;
};

export const useSceneHandlers = ({ setScenes, setActiveSceneId }: UseSceneHandlersProps) => {
  const toggleSceneActive = (id: number) => {
    setScenes(prevScenes => 
      toggleSceneActiveUtil(prevScenes, id, setScenes, setActiveSceneId)
    );
  };

  return { toggleSceneActive };
};
