
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Scissors, Plus, Trash2, MoveHorizontal, Film, Volume2, Crop, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface VideoClipsListProps {
  onAddHistory?: (action: string) => void;
}

const VideoClipsList = ({ onAddHistory }: VideoClipsListProps) => {
  const [expandedClip, setExpandedClip] = useState<number | null>(0);
  
  const handleAddClip = () => {
    toast({
      title: "Media Added",
      description: "New media has been added to your timeline.",
    });
    
    if (onAddHistory) {
      onAddHistory("Added new media");
    }
  };
  
  const handleSplitClip = () => {
    toast({
      title: "Clip Split",
      description: "The clip has been split at the current playhead position.",
    });
    
    if (onAddHistory) {
      onAddHistory("Split clip at playhead");
    }
  };
  
  const handleRemoveClip = (clipName: string) => {
    toast({
      title: "Clip Removed",
      description: `"${clipName}" has been removed from the timeline.`,
    });
    
    if (onAddHistory) {
      onAddHistory(`Removed "${clipName}" clip`);
    }
  };
  
  const handleCropClip = (clipName: string) => {
    toast({
      title: "Crop Tool Opened",
      description: `Crop tool opened for "${clipName}".`,
    });
    
    if (onAddHistory) {
      onAddHistory(`Started cropping "${clipName}" clip`);
    }
  };
  
  const toggleClipExpanded = (index: number) => {
    setExpandedClip(expandedClip === index ? null : index);
  };
  
  const clips = [
    { 
      name: 'Main Clip', 
      duration: '00:12:30', 
      type: 'video',
      properties: {
        resolution: '1920x1080',
        frameRate: '30fps',
        codec: 'H.264',
        audioTracks: 2
      }
    },
    { 
      name: 'Background Music', 
      duration: '00:03:45', 
      type: 'audio',
      properties: {
        sampleRate: '48kHz',
        channels: 'Stereo',
        codec: 'AAC',
        volume: '70%'
      }
    },
    { 
      name: 'Overlay Effect', 
      duration: '00:05:10', 
      type: 'effect',
      properties: {
        type: 'Visual Effect',
        opacity: '80%',
        blendMode: 'Screen',
        position: 'Top Right'
      }
    }
  ];
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button onClick={handleSplitClip}>
          <Scissors className="h-4 w-4 mr-1" />
          Split Clip
        </Button>
        <Button variant="outline" onClick={handleAddClip}>
          <Plus className="h-4 w-4 mr-1" />
          Add Media
        </Button>
        <Button variant="outline">
          <Trash2 className="h-4 w-4 mr-1" />
          Remove
        </Button>
        <Button variant="outline">
          <Crop className="h-4 w-4 mr-1" />
          Crop
        </Button>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Timeline Clips</h3>
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
          {clips.map((clip, index) => (
            <div 
              key={index} 
              className="border border-gray-700 rounded-md hover:bg-gray-900/50 overflow-hidden transition-all duration-200"
            >
              <div 
                className="flex items-center gap-3 p-3 cursor-pointer"
                onClick={() => toggleClipExpanded(index)}
              >
                <div className="flex-shrink-0 h-10 w-10 bg-meta-dark-blue flex items-center justify-center rounded">
                  {clip.type === 'audio' ? (
                    <Volume2 className="h-5 w-5 text-meta-purple" />
                  ) : clip.type === 'effect' ? (
                    <Plus className="h-5 w-5 text-meta-cyan" />
                  ) : (
                    <Film className="h-5 w-5 text-meta-teal" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium truncate">{clip.name}</h4>
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                      {clip.duration}
                      {expandedClip === index ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-1">
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      <MoveHorizontal className="h-3 w-3 mr-1" />
                      Move
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      <Scissors className="h-3 w-3 mr-1" />
                      Split
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 text-xs text-red-500 hover:text-red-400 hover:border-red-800"
                      onClick={() => handleRemoveClip(clip.name)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
              
              {expandedClip === index && (
                <div className="bg-gray-800/60 p-3 border-t border-gray-700">
                  <h5 className="text-xs font-medium mb-2">Properties</h5>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {Object.entries(clip.properties).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-xs text-gray-400">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        <span className="text-xs">{value}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-3 flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs h-7 w-full"
                      onClick={() => handleCropClip(clip.name)}
                    >
                      <Crop className="h-3 w-3 mr-1" />
                      Edit/Crop
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs h-7 w-full"
                      onClick={() => {
                        toast({
                          title: "Properties Opened",
                          description: `Advanced properties opened for "${clip.name}".`,
                        });
                        
                        if (onAddHistory) {
                          onAddHistory(`Opened advanced properties for "${clip.name}"`);
                        }
                      }}
                    >
                      Advanced
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoClipsList;
