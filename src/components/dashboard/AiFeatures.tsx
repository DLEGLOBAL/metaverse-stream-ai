
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Camera, Mic, Wand2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useAppContext } from '@/contexts/AppContext';

const AiFeatures = () => {
  const { aiFeatures, toggleAiFeature, updateAiFeatureSlider } = useAppContext();

  return (
    <Card className="h-full glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">AI Features</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-4">
          {aiFeatures.map((feature) => (
            <AiFeatureItem 
              key={feature.id}
              icon={getFeatureIcon(feature.name)}
              label={feature.name}
              description={feature.description}
              enabled={feature.enabled}
              hasSlider={feature.hasSlider}
              sliderValue={feature.sliderValue}
              onToggle={() => toggleAiFeature(feature.id)}
              onSliderChange={(value) => updateAiFeatureSlider(feature.id, value)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to get the correct icon for each feature
const getFeatureIcon = (featureName: string) => {
  switch (featureName) {
    case 'AI Director':
      return <Wand2 className="h-4 w-4" />;
    case 'Smart Green Screen':
      return <Camera className="h-4 w-4" />;
    case 'Voice Commands':
      return <Mic className="h-4 w-4" />;
    case 'AI Assistant':
      return <Bot className="h-4 w-4" />;
    default:
      return <Wand2 className="h-4 w-4" />;
  }
};

type AiFeatureItemProps = {
  icon: React.ReactNode;
  label: string;
  description: string;
  enabled: boolean;
  hasSlider?: boolean;
  sliderValue?: number;
  onToggle: () => void;
  onSliderChange: (value: number) => void;
};

const AiFeatureItem = ({ 
  icon, 
  label, 
  description, 
  enabled, 
  hasSlider, 
  sliderValue, 
  onToggle, 
  onSliderChange 
}: AiFeatureItemProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`mr-2 ${enabled ? 'text-meta-teal' : 'text-gray-400'}`}>{icon}</div>
          <div>
            <p className={`font-medium ${enabled ? 'text-white' : 'text-gray-400'}`}>{label}</p>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
        </div>
        <Switch checked={enabled} onCheckedChange={onToggle} />
      </div>
      
      {hasSlider && enabled && sliderValue !== undefined && (
        <div className="pl-6">
          <Slider
            value={[sliderValue]}
            max={100}
            step={1}
            className="w-full"
            onValueChange={(values) => onSliderChange(values[0])}
          />
        </div>
      )}
    </div>
  );
};

export default AiFeatures;
