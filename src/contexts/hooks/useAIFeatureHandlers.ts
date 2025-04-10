
import { 
  toggleAiFeature as toggleAiFeatureUtil, 
  updateAiFeatureSlider as updateAiFeatureSliderUtil 
} from '../aiFeatureUtils';
import { AiFeature } from '../types';

type UseAIFeatureHandlersProps = {
  setAiFeatures: (features: AiFeature[] | ((prev: AiFeature[]) => AiFeature[])) => void;
};

export const useAIFeatureHandlers = ({ setAiFeatures }: UseAIFeatureHandlersProps) => {
  const toggleAiFeature = (id: number) => {
    setAiFeatures((prevFeatures: AiFeature[]) => 
      toggleAiFeatureUtil(prevFeatures, id)
    );
  };

  const updateAiFeatureSlider = (id: number, value: number) => {
    setAiFeatures((prevFeatures: AiFeature[]) => 
      updateAiFeatureSliderUtil(prevFeatures, id, value)
    );
  };

  return { toggleAiFeature, updateAiFeatureSlider };
};
