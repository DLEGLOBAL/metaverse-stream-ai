
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { PlusCircle, Circle, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';

interface VideoKeyframesProps {
  currentTime: number;
  duration: number;
  onAddHistory?: (action: string) => void;
}

interface Keyframe {
  id: string;
  time: number;
  property: string;
  value: number;
}

const VideoKeyframes = ({ currentTime, duration, onAddHistory }: VideoKeyframesProps) => {
  const [keyframes, setKeyframes] = useState<Keyframe[]>([
    { id: '1', time: 10, property: 'opacity', value: 100 },
    { id: '2', time: 30, property: 'opacity', value: 0 },
    { id: '3', time: 50, property: 'scale', value: 120 },
    { id: '4', time: 70, property: 'rotation', value: 45 },
  ]);
  
  const [expandedProperty, setExpandedProperty] = useState<string | null>('opacity');
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const addKeyframe = (property: string) => {
    const newKeyframe: Keyframe = {
      id: Date.now().toString(),
      time: currentTime,
      property,
      value: property === 'opacity' ? 100 : 
             property === 'scale' ? 100 : 
             property === 'rotation' ? 0 : 0
    };
    
    setKeyframes([...keyframes, newKeyframe]);
    
    if (onAddHistory) {
      onAddHistory(`Added ${property} keyframe at ${formatTime(currentTime)}`);
    }
  };
  
  const removeKeyframe = (id: string) => {
    const keyframeToRemove = keyframes.find(k => k.id === id);
    setKeyframes(keyframes.filter(k => k.id !== id));
    
    if (keyframeToRemove && onAddHistory) {
      onAddHistory(`Removed ${keyframeToRemove.property} keyframe at ${formatTime(keyframeToRemove.time)}`);
    }
  };
  
  const updateKeyframeValue = (id: string, newValue: number) => {
    setKeyframes(keyframes.map(k => 
      k.id === id ? { ...k, value: newValue } : k
    ));
    
    const keyframe = keyframes.find(k => k.id === id);
    if (keyframe && onAddHistory) {
      onAddHistory(`Updated ${keyframe.property} keyframe at ${formatTime(keyframe.time)}`);
    }
  };
  
  const toggleProperty = (property: string) => {
    setExpandedProperty(expandedProperty === property ? null : property);
  };
  
  const propertiesToShow = [
    { id: 'opacity', label: 'Opacity', unit: '%', min: 0, max: 100 },
    { id: 'scale', label: 'Scale', unit: '%', min: 0, max: 200 },
    { id: 'rotation', label: 'Rotation', unit: '°', min: -180, max: 180 },
    { id: 'position-x', label: 'Position X', unit: 'px', min: -500, max: 500 },
    { id: 'position-y', label: 'Position Y', unit: 'px', min: -500, max: 500 },
  ];
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Animation Keyframes</h3>
        <div className="text-xs font-medium text-gray-400">Current Time: {formatTime(currentTime)}</div>
      </div>
      
      <div className="space-y-2">
        {propertiesToShow.map((property) => (
          <div key={property.id} className="border border-gray-700 rounded-md overflow-hidden">
            <div 
              className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-800"
              onClick={() => toggleProperty(property.id)}
            >
              <div className="flex items-center gap-2">
                {expandedProperty === property.id ? 
                  <ChevronUp className="h-4 w-4" /> : 
                  <ChevronDown className="h-4 w-4" />
                }
                <span>{property.label}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  addKeyframe(property.id);
                }}
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Add Keyframe
              </Button>
            </div>
            
            {expandedProperty === property.id && (
              <div className="p-3 border-t border-gray-700 bg-gray-900/50">
                <div className="h-8 relative w-full bg-gray-800 rounded-sm mb-2">
                  {/* Timeline visualization */}
                  <div className="absolute top-0 bottom-0 w-px bg-yellow-500" style={{ left: `${(currentTime / duration) * 100}%` }}></div>
                  
                  {/* Keyframe markers */}
                  {keyframes
                    .filter(k => k.property === property.id)
                    .map(keyframe => (
                      <div 
                        key={keyframe.id}
                        className="absolute top-0 transform -translate-x-1/2 cursor-pointer"
                        style={{ left: `${(keyframe.time / duration) * 100}%` }}
                        title={`${property.label}: ${keyframe.value}${property.unit} at ${formatTime(keyframe.time)}`}
                      >
                        <Circle 
                          fill="#D946EF" 
                          className="h-4 w-4 text-meta-purple" 
                        />
                      </div>
                    ))
                  }
                </div>
                
                <div className="space-y-2 mt-3">
                  {keyframes
                    .filter(k => k.property === property.id)
                    .map(keyframe => (
                      <div key={keyframe.id} className="flex items-center gap-2">
                        <div className="text-xs w-16">{formatTime(keyframe.time)}</div>
                        <div className="flex-1">
                          <Slider 
                            value={[keyframe.value]} 
                            min={property.min} 
                            max={property.max} 
                            step={1}
                            onValueChange={(value) => updateKeyframeValue(keyframe.id, value[0])}
                          />
                        </div>
                        <div className="text-xs w-12">{keyframe.value}{property.unit}</div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeKeyframe(keyframe.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))
                  }
                  
                  {keyframes.filter(k => k.property === property.id).length === 0 && (
                    <div className="text-xs text-gray-400 text-center py-2">
                      No keyframes added. Click "Add Keyframe" to create one at the current time.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoKeyframes;
