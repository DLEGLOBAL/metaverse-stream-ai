
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Sun, Droplet, Sparkles, Palette, Wand2, Sliders, RotateCw, LayoutGrid } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface VideoEffectsProps {
  onAddHistory?: (action: string) => void;
}

const VideoEffects = ({ onAddHistory }: VideoEffectsProps) => {
  const [activePreset, setActivePreset] = useState<string | null>(null);
  
  const colorAdjustments = {
    brightness: 50,
    contrast: 50,
    saturation: 50,
    temperature: 50,
    tint: 50,
    highlights: 50,
    shadows: 50,
    sharpness: 50
  };
  
  const [adjustments, setAdjustments] = useState(colorAdjustments);
  
  const handleSliderChange = (property: keyof typeof colorAdjustments, values: number[]) => {
    setAdjustments(prev => ({ ...prev, [property]: values[0] }));
    
    if (onAddHistory) {
      onAddHistory(`Adjusted ${property} to ${values[0]}%`);
    }
  };
  
  const handleApplyEffect = (effect: string) => {
    toast({
      title: `${effect} Applied`,
      description: `The ${effect.toLowerCase()} effect has been applied to your video.`,
    });
    
    if (onAddHistory) {
      onAddHistory(`Applied ${effect} effect`);
    }
  };
  
  const handleApplyPreset = (preset: string) => {
    setActivePreset(preset);
    
    // Update adjustment values based on preset
    const presetAdjustments = {
      warm: { temperature: 65, tint: 45, saturation: 55 },
      cool: { temperature: 35, tint: 55, saturation: 45 },
      vibrant: { saturation: 70, contrast: 60, highlights: 55 },
      muted: { saturation: 30, contrast: 40, highlights: 45 },
      cinematic: { contrast: 60, highlights: 40, shadows: 60, temperature: 45 }
    };
    
    const presetName = preset.toLowerCase() as keyof typeof presetAdjustments;
    
    if (presetAdjustments[presetName]) {
      setAdjustments(prev => ({ 
        ...prev, 
        ...presetAdjustments[presetName]
      }));
    }
    
    toast({
      title: `${preset} Preset Applied`,
      description: `The ${preset.toLowerCase()} color preset has been applied.`,
    });
    
    if (onAddHistory) {
      onAddHistory(`Applied ${preset} color preset`);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Sun className="h-4 w-4" />
            Color Presets
          </h3>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setAdjustments(colorAdjustments);
              setActivePreset(null);
              
              if (onAddHistory) {
                onAddHistory("Reset all color adjustments");
              }
              
              toast({
                title: "Reset Adjustments",
                description: "All color adjustments have been reset to default.",
              });
            }}
          >
            Reset
          </Button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {["Normal", "Warm", "Cool", "Vibrant", "Muted", "Cinematic"].map(preset => (
            <Button 
              key={preset}
              variant={activePreset === preset ? "default" : "outline"} 
              size="sm"
              className={activePreset === preset ? "bg-meta-purple text-white" : ""}
              onClick={() => handleApplyPreset(preset)}
            >
              {preset}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Sliders className="h-4 w-4" />
          Color Adjustments
        </h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Brightness</label>
            <Slider 
              value={[adjustments.brightness]} 
              min={0} 
              max={100} 
              step={1} 
              onValueChange={(values) => handleSliderChange('brightness', values)}
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Contrast</label>
            <Slider 
              value={[adjustments.contrast]} 
              min={0} 
              max={100} 
              step={1}
              onValueChange={(values) => handleSliderChange('contrast', values)}
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Saturation</label>
            <Slider 
              value={[adjustments.saturation]} 
              min={0} 
              max={100} 
              step={1}
              onValueChange={(values) => handleSliderChange('saturation', values)}
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Temperature</label>
            <Slider 
              value={[adjustments.temperature]} 
              min={0} 
              max={100} 
              step={1}
              onValueChange={(values) => handleSliderChange('temperature', values)}
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Tint</label>
            <Slider 
              value={[adjustments.tint]} 
              min={0} 
              max={100} 
              step={1}
              onValueChange={(values) => handleSliderChange('tint', values)}
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Highlights</label>
            <Slider 
              value={[adjustments.highlights]} 
              min={0} 
              max={100} 
              step={1}
              onValueChange={(values) => handleSliderChange('highlights', values)}
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Shadows</label>
            <Slider 
              value={[adjustments.shadows]} 
              min={0} 
              max={100} 
              step={1}
              onValueChange={(values) => handleSliderChange('shadows', values)}
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Sharpness</label>
            <Slider 
              value={[adjustments.sharpness]} 
              min={0} 
              max={100} 
              step={1}
              onValueChange={(values) => handleSliderChange('sharpness', values)}
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          Visual Effects
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <Button variant="outline" size="sm" onClick={() => handleApplyEffect('Blur')}>
            <Droplet className="h-3 w-3 mr-1" />
            Blur
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleApplyEffect('Sharpen')}>
            <Wand2 className="h-3 w-3 mr-1" />
            Sharpen
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleApplyEffect('Vignette')}>
            <Palette className="h-3 w-3 mr-1" />
            Vignette
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleApplyEffect('Grain')}>
            <Sparkles className="h-3 w-3 mr-1" />
            Grain
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleApplyEffect('Black & White')}>
            <Sun className="h-3 w-3 mr-1" />
            B&W
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleApplyEffect('Sepia')}>
            <Palette className="h-3 w-3 mr-1" />
            Sepia
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleApplyEffect('Tilt Shift')}>
            <RotateCw className="h-3 w-3 mr-1" />
            Tilt Shift
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleApplyEffect('Lens Flare')}>
            <Sun className="h-3 w-3 mr-1" />
            Lens Flare
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleApplyEffect('Glitch')}>
            <LayoutGrid className="h-3 w-3 mr-1" />
            Glitch
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Wand2 className="h-4 w-4" />
          AI Enhancements
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            className="border-meta-teal/30 text-meta-teal hover:bg-meta-teal/10"
            onClick={() => handleApplyEffect('AI Enhance')}
          >
            <Wand2 className="h-4 w-4 mr-1" />
            AI Enhance Video
          </Button>
          <Button 
            variant="outline" 
            className="border-meta-teal/30 text-meta-teal hover:bg-meta-teal/10"
            onClick={() => handleApplyEffect('AI Audio Cleanup')}
          >
            <Wand2 className="h-4 w-4 mr-1" />
            AI Enhance Audio
          </Button>
          <Button 
            variant="outline" 
            className="border-meta-teal/30 text-meta-teal hover:bg-meta-teal/10"
            onClick={() => handleApplyEffect('AI Noise Reduction')}
          >
            <Wand2 className="h-4 w-4 mr-1" />
            AI Noise Reduction
          </Button>
          <Button 
            variant="outline" 
            className="border-meta-teal/30 text-meta-teal hover:bg-meta-teal/10"
            onClick={() => handleApplyEffect('AI Color Correction')}
          >
            <Wand2 className="h-4 w-4 mr-1" />
            AI Color Correction
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoEffects;
