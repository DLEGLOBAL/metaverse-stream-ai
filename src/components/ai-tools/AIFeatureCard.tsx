
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Bot, Monitor, Camera, Mic } from 'lucide-react';

interface AIFeatureCardProps {
  feature: {
    id: number;
    name: string;
    description: string;
    enabled: boolean;
    hasSlider?: boolean;
    sliderValue?: number;
  };
  toggleAiFeature: (id: number) => void;
  updateAiFeatureSlider: (id: number, value: number) => void;
}

const AIFeatureCard: React.FC<AIFeatureCardProps> = ({ 
  feature, 
  toggleAiFeature, 
  updateAiFeatureSlider 
}) => {
  const renderIcon = () => {
    switch (feature.name) {
      case "AI Director":
        return <Monitor className="h-5 w-5 text-meta-teal" />;
      case "Smart Green Screen":
        return <Camera className="h-5 w-5 text-meta-teal" />;
      case "Voice Commands":
        return <Mic className="h-5 w-5 text-meta-teal" />;
      case "AI Assistant":
        return <Bot className="h-5 w-5 text-meta-teal" />;
      default:
        return <Bot className="h-5 w-5 text-meta-teal" />;
    }
  };

  return (
    <Card className={`glass-card transition-all ${feature.enabled ? 'border-meta-teal/30' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="bg-meta-teal/20 rounded-md p-2">
            {renderIcon()}
          </div>
          <Switch 
            checked={feature.enabled}
            onCheckedChange={() => toggleAiFeature(feature.id)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-medium text-white text-lg">{feature.name}</h3>
        <p className="text-gray-400 text-sm mt-1">{feature.description}</p>
        
        {feature.hasSlider && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Intensity</span>
              <span>{feature.sliderValue}%</span>
            </div>
            <input 
              type="range" 
              className="w-full accent-meta-teal"
              min="0"
              max="100"
              value={feature.sliderValue}
              onChange={(e) => updateAiFeatureSlider(feature.id, parseInt(e.target.value))}
              disabled={!feature.enabled}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIFeatureCard;
