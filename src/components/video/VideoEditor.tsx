
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { toast } from '@/hooks/use-toast';
import VideoPreview from './VideoPreview';
import VideoTimeline from './VideoTimeline';
import VideoMultitrackAudio from './VideoMultitrackAudio';
import VideoEditorTools from './VideoEditorTools';
import VideoMediaSidebar from './VideoMediaSidebar';

const VideoEditor = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(120); // Duration in seconds
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState('multitrack');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [editHistory, setEditHistory] = useState<string[]>(['Initial state']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [clipData, setClipData] = useState<{id: string, start: number, end: number, track: number}[]>([
    {id: 'clip-1', start: 0, end: 30, track: 0},
    {id: 'clip-2', start: 35, end: 65, track: 0},
    {id: 'clip-3', start: 5, end: 25, track: 1},
  ]);
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleSeek = (time: number) => {
    setCurrentTime(time);
  };
  
  const handleFrameStep = (direction: 'forward' | 'backward') => {
    // Assuming 30fps, one frame is 1/30 of a second
    const frameTime = 1/30;
    if (direction === 'forward') {
      setCurrentTime(Math.min(currentTime + frameTime, duration));
    } else {
      setCurrentTime(Math.max(currentTime - frameTime, 0));
    }
    
    toast({
      title: `Stepped ${direction}`,
      description: `Moved ${direction} by one frame.`,
    });
  };
  
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  const handleZoomChange = (value: number[]) => {
    setZoomLevel(value[0]);
  };
  
  const addHistoryPoint = (action: string) => {
    // Remove any future history if we're not at the latest point
    const newHistory = editHistory.slice(0, historyIndex + 1);
    newHistory.push(action);
    setEditHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    
    toast({
      title: "Action recorded",
      description: action,
    });
  };
  
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      toast({
        title: "Undo",
        description: `Undid: ${editHistory[historyIndex]}`,
      });
    }
  };
  
  const handleRedo = () => {
    if (historyIndex < editHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      toast({
        title: "Redo",
        description: `Redid: ${editHistory[historyIndex + 1]}`,
      });
    }
  };
  
  const handleSetMarker = () => {
    addHistoryPoint("Set marker");
  };
  
  const handleJumpToHistory = (index: number) => {
    setHistoryIndex(index);
    toast({
      title: "Jumped to historical state",
      description: `Applied: ${editHistory[index]}`,
    });
  };
  
  const handleAddClip = (track: number, start: number) => {
    const newClipId = `clip-${Date.now()}`;
    const newClip = {
      id: newClipId,
      start: start,
      end: start + 20,
      track: track
    };
    
    setClipData([...clipData, newClip]);
    addHistoryPoint(`Added clip to track ${track}`);
  };
  
  const handleRemoveClip = (clipId: string) => {
    const clipToRemove = clipData.find(clip => clip.id === clipId);
    if (clipToRemove) {
      setClipData(clipData.filter(clip => clip.id !== clipId));
      addHistoryPoint(`Removed clip from track ${clipToRemove.track}`);
    }
  };
  
  const handleMoveClip = (clipId: string, newStart: number, newTrack?: number) => {
    setClipData(clipData.map(clip => {
      if (clip.id === clipId) {
        const clipDuration = clip.end - clip.start;
        const updatedClip = {
          ...clip,
          start: newStart,
          end: newStart + clipDuration,
        };
        
        if (newTrack !== undefined) {
          updatedClip.track = newTrack;
        }
        
        return updatedClip;
      }
      return clip;
    }));
    
    addHistoryPoint(`Moved clip ${clipId}`);
  };
  
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prevTime => {
          const newTime = prevTime + 0.1;
          if (newTime >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return newTime;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying, duration]);
  
  return (
    <div className="flex flex-col gap-6">
      {/* Video Preview */}
      <Card className="w-full">
        <VideoPreview 
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          volume={volume}
          isMuted={isMuted}
          isFullscreen={isFullscreen}
          onPlayPause={handlePlayPause}
          onSeek={handleSeek}
          onFrameStep={handleFrameStep}
          onVolumeChange={handleVolumeChange}
          onMuteToggle={handleMuteToggle}
          onFullscreenToggle={toggleFullscreen}
          onSetMarker={handleSetMarker}
        />
      </Card>
      
      {/* Multitrack Audio Waveform */}
      <VideoMultitrackAudio 
        currentTime={currentTime} 
        duration={duration} 
      />
      
      {/* Timeline */}
      <VideoTimeline 
        currentTime={currentTime}
        duration={duration}
        zoomLevel={zoomLevel}
        clips={clipData}
        onSeek={handleSeek}
        onAddClip={handleAddClip}
        onRemoveClip={handleRemoveClip}
        onMoveClip={handleMoveClip}
      />
      
      {/* Resizable Editor Layout */}
      <ResizablePanelGroup direction="horizontal" className="min-h-[600px]">
        {/* Editor Tools */}
        <ResizablePanel defaultSize={70}>
          <Card className="h-full">
            <VideoEditorTools 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              currentTime={currentTime}
              duration={duration}
              historyIndex={historyIndex}
              editHistory={editHistory}
              onUndo={handleUndo}
              onRedo={handleRedo}
              onAddHistory={addHistoryPoint}
              onAddClip={(track) => handleAddClip(track, currentTime)}
              onRemoveClip={handleRemoveClip}
            />
          </Card>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Right Sidebar */}
        <ResizablePanel defaultSize={30}>
          <Card className="h-full">
            <VideoMediaSidebar 
              editHistory={editHistory}
              historyIndex={historyIndex}
              onJumpToHistory={handleJumpToHistory}
              onAddHistory={addHistoryPoint}
            />
          </Card>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default VideoEditor;
