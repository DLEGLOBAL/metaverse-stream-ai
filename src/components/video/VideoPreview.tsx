
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Clock,
  Film
} from 'lucide-react';

interface VideoPreviewProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onFrameStep: (direction: 'forward' | 'backward') => void;
  onVolumeChange: (value: number[]) => void;
  onMuteToggle: () => void;
  onFullscreenToggle: () => void;
  onSetMarker: () => void;
}

const VideoPreview = ({
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  isFullscreen,
  onPlayPause,
  onSeek,
  onFrameStep,
  onVolumeChange,
  onMuteToggle,
  onFullscreenToggle,
  onSetMarker
}: VideoPreviewProps) => {
  const previewRef = useRef<HTMLDivElement>(null);
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 100);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle>Preview</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onSetMarker}>
              <Clock className="h-4 w-4 mr-1" />
              Set Marker
            </Button>
            <Button variant="outline" size="sm" onClick={onFullscreenToggle}>
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div ref={previewRef} className="relative aspect-video bg-black/90 rounded-md overflow-hidden mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-500 flex flex-col items-center gap-2">
              <Film size={48} />
              <span>Multi-Track Preview</span>
            </div>
          </div>
          
          {/* Video overlay controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center justify-between mb-2 text-gray-300">
              <span className="w-24 text-center">{formatTime(currentTime)}</span>
              <div className="flex-1 mx-2">
                <Slider 
                  value={[currentTime]} 
                  min={0} 
                  max={duration} 
                  step={0.01}
                  onValueChange={(value) => onSeek(value[0])} 
                  className="w-full" 
                />
              </div>
              <span className="w-24 text-center">{formatTime(duration)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="text-white"
                  onClick={() => onFrameStep('backward')}
                >
                  <ChevronLeft size={18} />
                </Button>
                <Button size="icon" variant="ghost" className="text-white">
                  <SkipBack size={18} />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="text-white h-10 w-10 rounded-full bg-meta-teal/20"
                  onClick={onPlayPause}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </Button>
                <Button size="icon" variant="ghost" className="text-white">
                  <SkipForward size={18} />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="text-white"
                  onClick={() => onFrameStep('forward')}
                >
                  <ChevronRight size={18} />
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="text-white"
                  onClick={onMuteToggle}
                >
                  {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </Button>
                <div className="w-24">
                  <Slider 
                    value={[isMuted ? 0 : volume]} 
                    min={0} 
                    max={100} 
                    step={1}
                    onValueChange={onVolumeChange} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default VideoPreview;
