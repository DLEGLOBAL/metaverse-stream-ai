
import { AiFeature } from './types';
import { toast } from '@/hooks/use-toast';

export const toggleAiFeature = (aiFeatures: AiFeature[], id: number) => {
  return aiFeatures.map(feature => {
    if (feature.id === id) {
      const newEnabled = !feature.enabled;
      
      // Show toast notification
      toast({
        title: newEnabled ? 'Feature Enabled' : 'Feature Disabled',
        description: `${feature.name} is now ${newEnabled ? 'enabled' : 'disabled'}`,
      });
      
      return { ...feature, enabled: newEnabled };
    }
    return feature;
  });
};

export const updateAiFeatureSlider = (aiFeatures: AiFeature[], id: number, value: number) => {
  return aiFeatures.map(feature => {
    if (feature.id === id) {
      return { ...feature, sliderValue: value };
    }
    return feature;
  });
};
