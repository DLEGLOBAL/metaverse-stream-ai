
import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Sun, Droplet, Sparkles, Palette, Wand2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const VideoEffects = () => {
  const handleApplyEffect = (effect: string) => {
    toast({
      title: `${effect} Applied`,
      description: `The ${effect.toLowerCase()} effect has been applied to your video.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Sun className="h-4 w-4" />
          Color Adjustments
        </h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Brightness</label>
            <Slider value={[50]} min={0} max={100} step={1} />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Contrast</label>
            <Slider value={[50]} min={0} max={100} step={1} />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Saturation</label>
            <Slider value={[50]} min={0} max={100} step={1} />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Temperature</label>
            <Slider value={[50]} min={0} max={100} step={1} />
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
        </div>
      </div>
    </div>
  );
};

export default VideoEffects;
