
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Camera, Mic, Wand2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

const AiFeatures = () => {
  return (
    <Card className="h-full glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">AI Features</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-4">
          <AiFeatureItem 
            icon={<Wand2 className="h-4 w-4" />}
            label="AI Director"
            description="Smart scene switching"
            enabled={true}
          />
          
          <AiFeatureItem 
            icon={<Camera className="h-4 w-4" />}
            label="Smart Green Screen"
            description="Background removal"
            enabled={true}
            hasSlider
            sliderValue={75}
          />
          
          <AiFeatureItem 
            icon={<Mic className="h-4 w-4" />}
            label="Voice Commands"
            description="Hands-free control"
            enabled={false}
          />
          
          <AiFeatureItem 
            icon={<Bot className="h-4 w-4" />}
            label="AI Assistant"
            description="Stream helper"
            enabled={true}
          />
        </div>
      </CardContent>
    </Card>
  );
};

type AiFeatureItemProps = {
  icon: React.ReactNode;
  label: string;
  description: string;
  enabled: boolean;
  hasSlider?: boolean;
  sliderValue?: number;
};

const AiFeatureItem = ({ icon, label, description, enabled, hasSlider, sliderValue }: AiFeatureItemProps) => {
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
        <Switch checked={enabled} />
      </div>
      
      {hasSlider && enabled && (
        <div className="pl-6">
          <Slider
            defaultValue={[sliderValue || 50]}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};

export default AiFeatures;
