
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Search, ZoomIn, ZoomOut, Clock, Flag, Plus, Layers } from 'lucide-react';

interface Track {
  id: string;
  name: string;
  type: 'video' | 'audio' | 'effect';
  color: string;
  clips: {
    id: string;
    start: number;
    end: number;
    name: string;
  }[];
}

interface VideoTimelineProps {
  currentTime: number;
  duration: number;
  zoomLevel?: number;
  onSeek: (time: number) => void;
  onAddTrack?: (type: 'video' | 'audio' | 'effect') => void;
}

const VideoTimeline = ({ currentTime, duration, zoomLevel = 100, onSeek, onAddTrack }: VideoTimelineProps) => {
  const [markers, setMarkers] = useState<{time: number, label: string}[]>([
    { time: 15, label: 'Intro' },
    { time: 45, label: 'Main Point' },
    { time: 75, label: 'Conclusion' }
  ]);
  
  const [tracks, setTracks] = useState<Track[]>([
    {
      id: '1',
      name: 'Main Video',
      type: 'video',
      color: 'bg-meta-teal/30 border-meta-teal/60',
      clips: [{ id: '1', start: 5, end: 35, name: 'Main Clip' }]
    },
    {
      id: '2',
      name: 'Overlay',
      type: 'video',
      color: 'bg-meta-purple/30 border-meta-purple/60',
      clips: [{ id: '2', start: 40, end: 55, name: 'Overlay' }]
    },
    {
      id: '3',
      name: 'Background Music',
      type: 'audio',
      color: 'bg-meta-cyan/30 border-meta-cyan/60',
      clips: [{ id: '3', start: 0, end: 60, name: 'Music' }]
    },
    {
      id: '4',
      name: 'Voice Over',
      type: 'audio',
      color: 'bg-yellow-500/30 border-yellow-500/60',
      clips: [{ id: '4', start: 25, end: 45, name: 'VO' }]
    }
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

  const handleAddTrack = (type: 'video' | 'audio' | 'effect') => {
    if (onAddTrack) {
      onAddTrack(type);
    } else {
      // Local state handling if no callback provided
      const newTrack: Track = {
        id: `track-${tracks.length + 1}`,
        name: type === 'audio' ? `Audio Track ${tracks.filter(t => t.type === 'audio').length + 1}` : 
              type === 'effect' ? `Effect Track ${tracks.filter(t => t.type === 'effect').length + 1}` :
              `Video Track ${tracks.filter(t => t.type === 'video').length + 1}`,
        type,
        color: type === 'audio' ? 'bg-meta-cyan/30 border-meta-cyan/60' : 
               type === 'effect' ? 'bg-yellow-500/30 border-yellow-500/60' :
               'bg-meta-teal/30 border-meta-teal/60',
        clips: []
      };
      setTracks([...tracks, newTrack]);
    }
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
        
        <div className="h-auto border border-gray-700 rounded-md relative overflow-hidden bg-black/30 mt-2">
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
            className="absolute top-0 bottom-0 w-px bg-meta-teal z-30" 
            style={{ left: `${((currentTime - visibleStart) / (visibleEnd - visibleStart)) * 100}%` }}
          >
            <div className="w-3 h-3 bg-meta-teal rounded-full relative left-[-6px]"></div>
          </div>
          
          {/* Track headers */}
          <div className="absolute top-8 left-0 bottom-0 w-32 bg-gray-900/80 border-r border-gray-700 z-20 flex flex-col">
            {tracks.map((track, index) => (
              <div key={track.id} className="h-12 border-b border-gray-700 flex items-center px-2 text-xs">
                {track.type === 'audio' ? (
                  <div className="h-5 w-5 rounded-full bg-meta-cyan/30 border border-meta-cyan/60 flex items-center justify-center mr-2">
                    A
                  </div>
                ) : track.type === 'effect' ? (
                  <div className="h-5 w-5 rounded-full bg-yellow-500/30 border border-yellow-500/60 flex items-center justify-center mr-2">
                    E
                  </div>
                ) : (
                  <div className="h-5 w-5 rounded-full bg-meta-teal/30 border border-meta-teal/60 flex items-center justify-center mr-2">
                    V
                  </div>
                )}
                <span className="truncate">{track.name}</span>
              </div>
            ))}
            <div className="mt-2 px-2 flex flex-col gap-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-xs w-full"
                onClick={() => handleAddTrack('video')}
              >
                <Plus className="h-3 w-3 mr-1" />
                Video Track
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-xs w-full"
                onClick={() => handleAddTrack('audio')}
              >
                <Plus className="h-3 w-3 mr-1" />
                Audio Track
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-xs w-full"
                onClick={() => handleAddTrack('effect')}
              >
                <Plus className="h-3 w-3 mr-1" />
                Effect Track
              </Button>
            </div>
          </div>
          
          {/* Tracks and clips */}
          <div className="absolute top-8 left-32 right-0 bottom-0 overflow-x-hidden">
            {tracks.map((track, trackIndex) => (
              <div key={track.id} className="h-12 border-b border-gray-700 relative">
                {track.clips.map((clip, clipIndex) => {
                  if (clip.start >= visibleStart && clip.start <= visibleEnd || 
                      clip.end >= visibleStart && clip.end <= visibleEnd || 
                      clip.start <= visibleStart && clip.end >= visibleEnd) {
                    
                    const clipStartPos = Math.max(0, ((clip.start - visibleStart) / (visibleEnd - visibleStart)) * 100);
                    const clipEndPos = Math.min(100, ((clip.end - visibleStart) / (visibleEnd - visibleStart)) * 100);
                    const clipWidth = clipEndPos - clipStartPos;
                    
                    return (
                      <div 
                        key={clip.id} 
                        className={`absolute h-10 ${track.color} border rounded top-1 cursor-pointer`}
                        style={{ 
                          left: `${clipStartPos}%`, 
                          width: `${clipWidth}%`
                        }}
                      >
                        <div className="text-[10px] p-1 text-white truncate">{clip.name}</div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoTimeline;
