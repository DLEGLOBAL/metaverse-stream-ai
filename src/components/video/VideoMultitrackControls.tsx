
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Scissors, 
  Plus, 
  Trash2, 
  MoveHorizontal, 
  Film, 
  Volume2, 
  Layers,
  Music,
  ImagePlus,
  Type,
  Wand2
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface VideoMultitrackControlsProps {
  onAddHistory?: (action: string) => void;
  onAddClip?: (track: number) => void;
}

const VideoMultitrackControls = ({ onAddHistory, onAddClip }: VideoMultitrackControlsProps) => {
  const handleAddTrack = (trackType: string, trackIndex = 0) => {
    if (onAddClip) {
      onAddClip(trackIndex);
    }
    
    toast({
      title: `${trackType} Track Added`,
      description: `A new ${trackType.toLowerCase()} track has been added to your timeline.`,
    });
    
    if (onAddHistory) {
      onAddHistory(`Added new ${trackType.toLowerCase()} track`);
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
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Track Controls</h3>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleSplitClip}>
            <Scissors className="h-4 w-4 mr-1" />
            Split Clip
          </Button>
          <Button variant="outline" onClick={() => handleAddTrack('Video', 0)}>
            <Film className="h-4 w-4 mr-1" />
            Add Video
          </Button>
          <Button variant="outline" onClick={() => handleAddTrack('Audio', 1)}>
            <Music className="h-4 w-4 mr-1" />
            Add Audio
          </Button>
          <Button variant="outline" onClick={() => handleAddTrack('Text', 2)}>
            <Type className="h-4 w-4 mr-1" />
            Add Text
          </Button>
          <Button variant="outline" onClick={() => handleAddTrack('Image', 2)}>
            <ImagePlus className="h-4 w-4 mr-1" />
            Add Image
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Selected Clip</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => onAddHistory && onAddHistory("Moved clip")}>
            <MoveHorizontal className="h-4 w-4 mr-1" />
            Move
          </Button>
          <Button variant="outline" onClick={() => onAddHistory && onAddHistory("Applied effect")}>
            <Wand2 className="h-4 w-4 mr-1" />
            Effects
          </Button>
          <Button variant="outline" onClick={() => onAddHistory && onAddHistory("Adjusted volume")}>
            <Volume2 className="h-4 w-4 mr-1" />
            Volume
          </Button>
          <Button variant="outline" className="text-red-500 hover:text-red-400 hover:border-red-800" onClick={() => onAddHistory && onAddHistory("Removed clip")}>
            <Trash2 className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      </div>
      
      <div className="p-3 border border-gray-700 rounded-md bg-gray-900/50">
        <h3 className="text-sm font-medium mb-2">Timeline Structure</h3>
        <div className="text-xs text-gray-400">
          <div className="flex items-center mb-1">
            <Layers className="h-3 w-3 mr-1" />
            <span>Multiple tracks can be layered for complex compositions</span>
          </div>
          <div className="flex items-center mb-1">
            <Film className="h-3 w-3 mr-1" />
            <span>Video tracks appear visually from top to bottom</span>
          </div>
          <div className="flex items-center">
            <Volume2 className="h-3 w-3 mr-1" />
            <span>Audio tracks are mixed together automatically</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoMultitrackControls;
