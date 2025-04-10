
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Search, ZoomIn, ZoomOut } from 'lucide-react';

interface VideoTimelineProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

const VideoTimeline = ({ currentTime, duration, onSeek }: VideoTimelineProps) => {
  const [zoom, setZoom] = useState(100);
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const handleZoomChange = (value: number[]) => {
    setZoom(value[0]);
  };
  
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <Slider
              value={[zoom]}
              min={50}
              max={200}
              step={10}
              onValueChange={handleZoomChange}
            />
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-xs w-10 text-center">{zoom}%</span>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="h-24 border border-gray-700 rounded-md relative overflow-hidden bg-black/30 mt-2">
          {/* Timeline ruler */}
          <div className="absolute top-0 left-0 right-0 h-6 border-b border-gray-700 flex">
            {Array.from({ length: Math.ceil(duration / 10) }).map((_, index) => (
              <div key={index} className="flex-1 flex">
                <div className="border-r border-gray-700 h-2 w-px"></div>
                <div className="absolute text-[10px] text-gray-400" style={{ left: `${(index * 10 / duration) * 100}%` }}>
                  {formatTime(index * 10)}
                </div>
              </div>
            ))}
          </div>
          
          {/* Playhead */}
          <div 
            className="absolute top-0 bottom-0 w-px bg-meta-teal z-10" 
            style={{ left: `${(currentTime / duration) * 100}%` }}
          >
            <div className="w-3 h-3 bg-meta-teal rounded-full relative left-[-6px]"></div>
          </div>
          
          {/* Clip regions - example */}
          <div className="absolute top-6 h-12 left-[5%] w-[30%] bg-meta-teal/30 border border-meta-teal/60 rounded">
            <div className="text-[10px] p-1 text-white">Main Clip</div>
          </div>
          <div className="absolute top-6 h-12 left-[40%] w-[15%] bg-meta-purple/30 border border-meta-purple/60 rounded">
            <div className="text-[10px] p-1 text-white">Overlay</div>
          </div>
          <div className="absolute top-6 h-12 left-[65%] w-[20%] bg-meta-cyan/30 border border-meta-cyan/60 rounded">
            <div className="text-[10px] p-1 text-white">Music</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoTimeline;
