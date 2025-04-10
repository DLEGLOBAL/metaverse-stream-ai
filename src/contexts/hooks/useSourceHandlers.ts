
import { toggleSourceActive as toggleSourceActiveUtil } from '../sourceUtils';
import { Source } from '../types';

type UseSourceHandlersProps = {
  sources: Source[];
  setSources: (sources: Source[]) => void;
  setIsStreamPreviewAvailable: (isAvailable: boolean) => void;
};

export const useSourceHandlers = ({ 
  sources, 
  setSources, 
  setIsStreamPreviewAvailable 
}: UseSourceHandlersProps) => {
  const toggleSourceActive = async (id: number) => {
    const result = await toggleSourceActiveUtil(sources, id, setIsStreamPreviewAvailable, setSources);
    return result;
  };

  return { toggleSourceActive };
};
