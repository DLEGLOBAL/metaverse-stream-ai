
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
  const [duration, setDuration] = useState(120); // Example duration in seconds
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState('multitrack');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [editHistory, setEditHistory] = useState<string[]>(['Initial state']);
  const [historyIndex, setHistoryIndex] = useState(0);
  
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
  
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
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
        onSeek={handleSeek}
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
