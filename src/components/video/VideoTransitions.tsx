
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Shuffle, Wand2, ArrowRightLeft, Loader, RotateCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface VideoTransitionsProps {
  onAddHistory?: (action: string) => void;
}

const VideoTransitions = ({ onAddHistory }: VideoTransitionsProps) => {
  const [selectedTransition, setSelectedTransition] = useState<string | null>(null);
  
  const handleApplyTransition = (transition: string) => {
    setSelectedTransition(transition);
    
    toast({
      title: `${transition} Applied`,
      description: `The ${transition.toLowerCase()} transition has been applied between clips.`,
    });
    
    if (onAddHistory) {
      onAddHistory(`Applied ${transition} transition`);
    }
  };
  
  const transitionCategories = [
    {
      name: 'Basic Transitions',
      transitions: [
        { id: 'cut', name: 'Cut', icon: <ArrowRightLeft className="h-4 w-4" /> },
        { id: 'crossfade', name: 'Crossfade', icon: <Shuffle className="h-4 w-4" /> },
        { id: 'fade-to-black', name: 'Fade to Black', icon: <Loader className="h-4 w-4" /> },
        { id: 'fade-to-white', name: 'Fade to White', icon: <Loader className="h-4 w-4" /> },
      ]
    },
    {
      name: 'Motion Transitions',
      transitions: [
        { id: 'push-left', name: 'Push Left', icon: <ArrowRightLeft className="h-4 w-4" /> },
        { id: 'push-right', name: 'Push Right', icon: <ArrowRightLeft className="h-4 w-4" /> },
        { id: 'push-up', name: 'Push Up', icon: <ArrowRightLeft className="h-4 w-4" /> },
        { id: 'push-down', name: 'Push Down', icon: <ArrowRightLeft className="h-4 w-4" /> },
        { id: 'wipe-left', name: 'Wipe Left', icon: <ArrowRightLeft className="h-4 w-4" /> },
        { id: 'wipe-right', name: 'Wipe Right', icon: <ArrowRightLeft className="h-4 w-4" /> },
      ]
    },
    {
      name: 'Fancy Transitions',
      transitions: [
        { id: 'zoom-in', name: 'Zoom In', icon: <Wand2 className="h-4 w-4" /> },
        { id: 'zoom-out', name: 'Zoom Out', icon: <Wand2 className="h-4 w-4" /> },
        { id: 'rotate', name: 'Rotate', icon: <RotateCcw className="h-4 w-4" /> },
        { id: 'dissolve', name: 'Dissolve', icon: <Wand2 className="h-4 w-4" /> },
      ]
    },
    {
      name: 'AI Transitions',
      transitions: [
        { id: 'ai-smart-transition', name: 'AI Smart Transition', icon: <Wand2 className="h-4 w-4" /> },
        { id: 'ai-content-aware', name: 'Content Aware', icon: <Wand2 className="h-4 w-4" /> },
      ]
    }
  ];
  
  const calculateDuration = (value: number[]) => {
    // Convert to seconds with one decimal place
    return value[0] / 10;
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Transitions</h3>
        {selectedTransition && (
          <div className="text-xs font-medium text-meta-teal">
            {transitionCategories.flatMap(cat => cat.transitions).find(t => t.id === selectedTransition)?.name} selected
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        {transitionCategories.map((category) => (
          <div key={category.name} className="space-y-2">
            <h4 className="text-xs font-medium text-gray-400">{category.name}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {category.transitions.map((transition) => (
                <Button
                  key={transition.id}
                  variant={selectedTransition === transition.id ? "default" : "outline"}
                  size="sm"
                  className={selectedTransition === transition.id ? "bg-meta-teal text-black" : ""}
                  onClick={() => handleApplyTransition(transition.name)}
                >
                  {transition.icon}
                  <span className="ml-1">{transition.name}</span>
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {selectedTransition && (
        <div className="mt-4 p-3 border border-gray-700 rounded-md">
          <h4 className="text-sm font-medium mb-2">Transition Settings</h4>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Duration</label>
              <select 
                className="w-full p-2 rounded-md border border-gray-700 bg-black/50"
                onChange={() => {
                  if (onAddHistory) {
                    onAddHistory(`Changed transition duration`);
                  }
                }}
              >
                <option>0.5 seconds</option>
                <option>1.0 seconds</option>
                <option>1.5 seconds</option>
                <option>2.0 seconds</option>
                <option>Custom</option>
              </select>
            </div>
            
            <div>
              <label className="text-xs text-gray-400 block mb-1">Easing</label>
              <select 
                className="w-full p-2 rounded-md border border-gray-700 bg-black/50"
                onChange={() => {
                  if (onAddHistory) {
                    onAddHistory(`Changed transition easing`);
                  }
                }}
              >
                <option>Linear</option>
                <option>Ease In</option>
                <option>Ease Out</option>
                <option>Ease In-Out</option>
                <option>Bounce</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoTransitions;
