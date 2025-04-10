
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { 
  Play, Pause, SkipBack, SkipForward, 
  Scissors, Plus, Download, 
  Volume2, VolumeX, 
  Sun, Image, Type, Layers,
  Undo, Redo,
  Film, ChevronLeft, ChevronRight,
  Maximize2, Minimize2, Clock,
  Crop
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import VideoTimeline from './VideoTimeline';
import VideoClipsList from './VideoClipsList';
import VideoEffects from './VideoEffects';
import VideoKeyframes from './VideoKeyframes';
import VideoAudioWaveform from './VideoAudioWaveform';
import VideoTransitions from './VideoTransitions';
import VideoHistory from './VideoHistory';

const VideoEditor = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(120); // Example duration in seconds
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState('clips');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [editHistory, setEditHistory] = useState<string[]>(['Initial state']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 100);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };
  
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
    if (!isFullscreen) {
      if (previewRef.current?.requestFullscreen) {
        previewRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    
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
  
  const handleExport = () => {
    addHistoryPoint("Exported video");
    
    toast({
      title: "Exporting Video",
      description: "Your video is being prepared for export. This may take a few minutes.",
    });
    
    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your video has been successfully exported.",
      });
    }, 3000);
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
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle>Preview</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => addHistoryPoint("Set marker")}>
                <Clock className="h-4 w-4 mr-1" />
                Set Marker
              </Button>
              <Button variant="outline" size="sm" onClick={toggleFullscreen}>
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
                <span>Video Preview</span>
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
                    onValueChange={(value) => handleSeek(value[0])} 
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
                    onClick={() => handleFrameStep('backward')}
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
                    onClick={handlePlayPause}
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
                    onClick={() => handleFrameStep('forward')}
                  >
                    <ChevronRight size={18} />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="text-white"
                    onClick={handleMuteToggle}
                  >
                    {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </Button>
                  <div className="w-24">
                    <Slider 
                      value={[isMuted ? 0 : volume]} 
                      min={0} 
                      max={100} 
                      step={1}
                      onValueChange={handleVolumeChange} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Timeline and Audio Waveform */}
      <div className="space-y-2">
        <VideoAudioWaveform currentTime={currentTime} duration={duration} />
        <VideoTimeline 
          currentTime={currentTime}
          duration={duration}
          zoomLevel={zoomLevel}
          onSeek={handleSeek}
        />
      </div>
      
      {/* Resizable Editor Layout */}
      <ResizablePanelGroup direction="horizontal" className="min-h-[600px]">
        {/* Editor Tools */}
        <ResizablePanel defaultSize={70}>
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Editor Tools</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleUndo}
                    disabled={historyIndex === 0}
                  >
                    <Undo className="h-4 w-4 mr-1" />
                    Undo
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleRedo}
                    disabled={historyIndex === editHistory.length - 1}
                  >
                    <Redo className="h-4 w-4 mr-1" />
                    Redo
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[calc(100%-69px)] overflow-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-6 mb-4">
                  <TabsTrigger value="clips">Clips</TabsTrigger>
                  <TabsTrigger value="effects">Effects</TabsTrigger>
                  <TabsTrigger value="keyframes">Keyframes</TabsTrigger>
                  <TabsTrigger value="text">Text</TabsTrigger>
                  <TabsTrigger value="transitions">Transitions</TabsTrigger>
                  <TabsTrigger value="export">Export</TabsTrigger>
                </TabsList>
                
                <TabsContent value="clips" className="h-full">
                  <VideoClipsList onAddHistory={addHistoryPoint} />
                </TabsContent>
                
                <TabsContent value="effects" className="h-full">
                  <VideoEffects onAddHistory={addHistoryPoint} />
                </TabsContent>
                
                <TabsContent value="keyframes" className="h-full">
                  <VideoKeyframes 
                    currentTime={currentTime} 
                    duration={duration}
                    onAddHistory={addHistoryPoint}
                  />
                </TabsContent>
                
                <TabsContent value="text" className="h-full">
                  <div className="space-y-4">
                    <div className="grid gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Add Text</label>
                        <div className="flex gap-2">
                          <Input placeholder="Enter text" />
                          <Button onClick={() => addHistoryPoint("Added text overlay")}>
                            <Type className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Font Style</label>
                        <div className="grid grid-cols-4 gap-2">
                          <Button variant="outline" size="sm" onClick={() => addHistoryPoint("Changed text to Regular")}>Regular</Button>
                          <Button variant="outline" size="sm" onClick={() => addHistoryPoint("Changed text to Bold")}>Bold</Button>
                          <Button variant="outline" size="sm" onClick={() => addHistoryPoint("Changed text to Italic")}>Italic</Button>
                          <Button variant="outline" size="sm" onClick={() => addHistoryPoint("Changed text to Outlined")}>Outlined</Button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Text Animation</label>
                        <div className="grid grid-cols-3 gap-2">
                          <Button variant="outline" size="sm" onClick={() => addHistoryPoint("Added Fade-In animation")}>Fade In</Button>
                          <Button variant="outline" size="sm" onClick={() => addHistoryPoint("Added Slide-In animation")}>Slide In</Button>
                          <Button variant="outline" size="sm" onClick={() => addHistoryPoint("Added Type animation")}>Type</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="transitions" className="h-full">
                  <VideoTransitions onAddHistory={addHistoryPoint} />
                </TabsContent>
                
                <TabsContent value="export" className="h-full">
                  <div className="space-y-4">
                    <div className="grid gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Export Settings</label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-gray-400 block mb-1">Format</label>
                            <select 
                              className="w-full p-2 rounded-md border border-gray-700 bg-black/50"
                              onChange={() => addHistoryPoint("Changed export format")}
                            >
                              <option>MP4 (H.264)</option>
                              <option>WebM</option>
                              <option>MOV</option>
                              <option>MP4 (H.265/HEVC)</option>
                              <option>GIF</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-gray-400 block mb-1">Quality</label>
                            <select 
                              className="w-full p-2 rounded-md border border-gray-700 bg-black/50"
                              onChange={() => addHistoryPoint("Changed export quality")}
                            >
                              <option>Ultra HD (4K)</option>
                              <option>High (1080p)</option>
                              <option>Medium (720p)</option>
                              <option>Low (480p)</option>
                              <option>Web Optimized</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Advanced Settings</label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-gray-400 block mb-1">Bitrate</label>
                            <select className="w-full p-2 rounded-md border border-gray-700 bg-black/50">
                              <option>High (20 Mbps)</option>
                              <option>Medium (10 Mbps)</option>
                              <option>Low (5 Mbps)</option>
                              <option>Custom</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-gray-400 block mb-1">Frame Rate</label>
                            <select className="w-full p-2 rounded-md border border-gray-700 bg-black/50">
                              <option>Original</option>
                              <option>60 fps</option>
                              <option>30 fps</option>
                              <option>24 fps</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      <Button className="bg-meta-teal text-meta-dark-blue hover:bg-meta-teal/90" onClick={handleExport}>
                        <Download className="h-4 w-4 mr-2" />
                        Export Video
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Right Sidebar */}
        <ResizablePanel defaultSize={30}>
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle>Media & History</CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-69px)] overflow-auto">
              <Tabs defaultValue="history">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="recordings">Recordings</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="recordings" className="h-full">
                  <div className="space-y-3">
                    {[1, 2, 3].map((index) => (
                      <div key={index} className="border border-gray-700 rounded-md p-3 flex gap-3 hover:bg-gray-900/50">
                        <div className="aspect-video w-24 bg-gray-800 rounded-sm flex items-center justify-center text-gray-500">
                          <Film size={16} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">Stream Recording {index}</h4>
                          <p className="text-xs text-gray-400">01:2{index}:00 • {index} days ago</p>
                          <div className="flex gap-1 mt-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-7 text-xs"
                              onClick={() => addHistoryPoint(`Added Stream Recording ${index}`)}
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Add
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-7 text-xs"
                              onClick={() => addHistoryPoint(`Previewed Stream Recording ${index}`)}
                            >
                              <Play className="h-3 w-3 mr-1" />
                              Preview
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="history" className="h-full">
                  <VideoHistory 
                    history={editHistory}
                    currentIndex={historyIndex}
                    onJumpTo={(index) => {
                      setHistoryIndex(index);
                      toast({
                        title: "Jumped to historical state",
                        description: `Applied: ${editHistory[index]}`,
                      });
                    }}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default VideoEditor;
