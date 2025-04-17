import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

interface ClipData {
  id: string;
  start: number;
  end: number;
  track: number;
}

interface VideoTimelineProps {
  currentTime: number;
  duration: number;
  zoomLevel: number;
  clips?: ClipData[];
  onSeek: (time: number) => void;
  onAddClip?: (track: number, start: number) => void;
  onRemoveClip?: (clipId: string) => void;
  onMoveClip?: (clipId: string, newStart: number, newTrack?: number) => void;
}

const VideoTimeline = ({ 
  currentTime, 
  duration, 
  zoomLevel = 100,
  clips = [],
  onSeek,
  onAddClip,
  onRemoveClip,
  onMoveClip
}: VideoTimelineProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggingClipId, setDraggingClipId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  
  const handleZoomIn = () => {
    // This would be handled by the parent component
  };
  
  const handleZoomOut = () => {
    // This would be handled by the parent component
  };
  
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = duration * clickPosition;
    onSeek(newTime);
  };
  
  const handleClipMouseDown = (e: React.MouseEvent, clipId: string) => {
    e.stopPropagation();
    setIsDragging(true);
    setDraggingClipId(clipId);
    
    const clip = clips.find(c => c.id === clipId);
    if (clip) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickPositionInClip = e.clientX - rect.left;
      setDragOffset(clickPositionInClip);
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !draggingClipId || !onMoveClip) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const timelineWidth = rect.width;
    const clip = clips.find(c => c.id === draggingClipId);
    
    if (clip) {
      const clipDuration = clip.end - clip.start;
      const pixelsPerSecond = timelineWidth / (duration * (zoomLevel / 100));
      const clipWidthInPixels = clipDuration * pixelsPerSecond;
      
      // Calculate new position accounting for drag offset
      const newPositionInPixels = e.clientX - rect.left - dragOffset;
      const newStartTime = (newPositionInPixels / timelineWidth) * duration * (zoomLevel / 100);
      
      // Ensure the clip stays within the timeline bounds
      const clampedStartTime = Math.max(0, Math.min(duration - clipDuration, newStartTime));
      
      onMoveClip(draggingClipId, clampedStartTime);
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingClipId(null);
  };
  
  const handleDoubleClickTrack = (e: React.MouseEvent<HTMLDivElement>, trackIndex: number) => {
    if (!onAddClip) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const clickTime = duration * clickPosition * (zoomLevel / 100);
    
    onAddClip(trackIndex, clickTime);
  };
  
  // Generate time markers based on duration and zoom
  const getTimeMarkers = () => {
    const markers = [];
    const adjustedDuration = duration * (zoomLevel / 100);
    const step = Math.max(1, Math.ceil(adjustedDuration / 20)); // Show at most 20 markers
    
    for (let i = 0; i <= adjustedDuration; i += step) {
      const minutes = Math.floor(i / 60);
      const seconds = Math.floor(i % 60);
      markers.push({
        time: i,
        label: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
        position: (i / adjustedDuration) * 100
      });
    }
    
    return markers;
  };
  
  const tracks = 3; // Number of tracks to display
  const timeMarkers = getTimeMarkers();
  
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium">Timeline</div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <Minus className="h-4 w-4" />
            </Button>
            <div className="text-xs">{zoomLevel}%</div>
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Time markers */}
        <div className="relative h-6 border-b border-gray-700 mb-2">
          {timeMarkers.map((marker, index) => (
            <div 
              key={index} 
              className="absolute bottom-0 text-xs text-gray-400"
              style={{ left: `${marker.position}%`, transform: 'translateX(-50%)' }}
            >
              <div className="h-2 w-0.5 bg-gray-700 mx-auto mb-1"></div>
              {marker.label}
            </div>
          ))}
        </div>
        
        {/* Tracks */}
        <div className="space-y-2" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
          {Array.from({ length: tracks }).map((_, trackIndex) => (
            <div 
              key={trackIndex}
              className="h-12 relative border border-gray-700 rounded-md bg-gray-800/40 hover:bg-gray-800/60 transition-colors"
              onDoubleClick={(e) => handleDoubleClickTrack(e, trackIndex)}
              onClick={handleTimelineClick}
            >
              {/* Track label */}
              <div className="absolute left-2 top-1 text-xs text-gray-400">
                Track {trackIndex + 1}
              </div>
              
              {/* Clips on this track */}
              {clips
                .filter(clip => clip.track === trackIndex)
                .map(clip => {
                  const startPercent = (clip.start / duration) * 100;
                  const widthPercent = ((clip.end - clip.start) / duration) * 100;
                  
                  return (
                    <div
                      key={clip.id}
                      className="absolute h-9 bottom-1 bg-meta-teal/60 border border-meta-teal rounded-sm flex items-center justify-center cursor-move"
                      style={{ 
                        left: `${startPercent}%`,
                        width: `${widthPercent}%`
                      }}
                      onMouseDown={(e) => handleClipMouseDown(e, clip.id)}
                    >
                      <div className="text-xs truncate text-white font-medium px-1">
                        {clip.id}
                      </div>
                    </div>
                  );
                })
              }
            </div>
          ))}
        </div>
        
        {/* Playhead */}
        <div className="relative mt-2">
          <div className="absolute top-[-152px] h-[152px] w-px bg-meta-purple z-10" style={{ left: `${(currentTime / duration) * 100}%` }}>
            <div className="w-3 h-3 bg-meta-purple rounded-full -ml-1.5 -mt-1.5"></div>
          </div>
        </div>
        
        {/* Playback scrubber */}
        <div className="mt-6">
          <Slider
            value={[currentTime]}
            min={0}
            max={duration}
            step={0.1}
            onValueChange={(values) => onSeek(values[0])}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoTimeline;
