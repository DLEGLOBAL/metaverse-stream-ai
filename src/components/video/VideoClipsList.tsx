
import React from 'react';
import { Button } from '@/components/ui/button';
import { Scissors, Plus, Trash2, MoveHorizontal, Film } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const VideoClipsList = () => {
  const handleAddClip = () => {
    toast({
      title: "Feature Coming Soon",
      description: "This functionality will be implemented in the next update.",
    });
  };
  
  const handleSplitClip = () => {
    toast({
      title: "Clip Split",
      description: "The clip has been split at the current playhead position.",
    });
  };
  
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
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Timeline Clips</h3>
        <div className="space-y-2">
          {['Main Clip', 'Background Music', 'Overlay Effect'].map((clip, index) => (
            <div key={index} className="flex items-center gap-3 p-3 border border-gray-700 rounded-md hover:bg-gray-900/50">
              <div className="flex-shrink-0 h-10 w-10 bg-meta-dark-blue flex items-center justify-center rounded">
                <Film className="h-5 w-5 text-meta-teal" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <h4 className="text-sm font-medium truncate">{clip}</h4>
                  <div className="text-xs text-gray-400">00:12:30</div>
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
                  <Button variant="outline" size="sm" className="h-7 text-xs text-red-500 hover:text-red-400 hover:border-red-800">
                    <Trash2 className="h-3 w-3 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoClipsList;
