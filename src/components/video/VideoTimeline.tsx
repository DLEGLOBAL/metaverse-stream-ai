
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Search, ZoomIn, ZoomOut, Clock, Flag } from 'lucide-react';

interface VideoTimelineProps {
  currentTime: number;
  duration: number;
  zoomLevel?: number;
  onSeek: (time: number) => void;
}

const VideoTimeline = ({ currentTime, duration, zoomLevel = 100, onSeek }: VideoTimelineProps) => {
  const [markers, setMarkers] = useState<{time: number, label: string}[]>([
    { time: 15, label: 'Intro' },
    { time: 45, label: 'Main Point' },
    { time: 75, label: 'Conclusion' }
  ]);
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Calculate visible range based on zoom level
  const visibleDuration = duration * (100 / zoomLevel);
  const visibleStart = Math.max(0, currentTime - visibleDuration / 2);
  const visibleEnd = Math.min(duration, visibleStart + visibleDuration);
  
  const addMarker = () => {
    const newMarker = { 
      time: currentTime, 
      label: `Marker ${markers.length + 1}` 
    };
    setMarkers([...markers, newMarker]);
  };
  
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-2">
          <Button variant="outline" size="sm" onClick={addMarker}>
            <Flag className="h-4 w-4 mr-1" />
            Add Marker
          </Button>
          <div className="flex-1">
            <Slider
              value={[zoomLevel || 100]}
              min={50}
              max={500}
              step={10}
            />
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-xs w-12 text-center">{zoomLevel || 100}%</span>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="h-28 border border-gray-700 rounded-md relative overflow-hidden bg-black/30 mt-2">
          {/* Timeline ruler */}
          <div className="absolute top-0 left-0 right-0 h-6 border-b border-gray-700 flex">
            {Array.from({ length: Math.ceil(duration / 5) }).map((_, index) => {
              const timePosition = index * 5;
              // Only show if within visible range
              if (timePosition >= visibleStart && timePosition <= visibleEnd) {
                const positionPercent = ((timePosition - visibleStart) / (visibleEnd - visibleStart)) * 100;
                
                return (
                  <div key={index} className="absolute flex flex-col items-center" style={{ left: `${positionPercent}%` }}>
                    <div className="h-2 w-px bg-gray-700"></div>
                    <div className="text-[10px] text-gray-400">
                      {formatTime(timePosition)}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
          
          {/* Markers */}
          {markers.map((marker, index) => {
            // Only show if within visible range
            if (marker.time >= visibleStart && marker.time <= visibleEnd) {
              const positionPercent = ((marker.time - visibleStart) / (visibleEnd - visibleStart)) * 100;
              
              return (
                <div
                  key={index}
                  className="absolute top-6 h-4 transform -translate-x-1/2 z-20"
                  style={{ left: `${positionPercent}%` }}
                >
                  <Flag className="h-4 w-4 text-meta-purple" />
                  <div className="absolute text-[9px] text-meta-purple whitespace-nowrap transform -translate-x-1/2" style={{ top: '16px', left: '50%' }}>
                    {marker.label}
                  </div>
                </div>
              );
            }
            return null;
          })}
          
          {/* Playhead */}
          <div 
            className="absolute top-0 bottom-0 w-px bg-meta-teal z-10" 
            style={{ left: `${((currentTime - visibleStart) / (visibleEnd - visibleStart)) * 100}%` }}
          >
            <div className="w-3 h-3 bg-meta-teal rounded-full relative left-[-6px]"></div>
          </div>
          
          {/* Clip regions - example */}
          <div className="absolute top-8 h-12 left-[5%] w-[30%] bg-meta-teal/30 border border-meta-teal/60 rounded">
            <div className="text-[10px] p-1 text-white">Main Clip</div>
          </div>
          <div className="absolute top-8 h-12 left-[40%] w-[15%] bg-meta-purple/30 border border-meta-purple/60 rounded">
            <div className="text-[10px] p-1 text-white">Overlay</div>
          </div>
          <div className="absolute top-8 h-12 left-[65%] w-[20%] bg-meta-cyan/30 border border-meta-cyan/60 rounded">
            <div className="text-[10px] p-1 text-white">Music</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoTimeline;
