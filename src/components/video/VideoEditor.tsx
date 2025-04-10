
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Play, Pause, SkipBack, SkipForward, 
  Scissors, Plus, Download, 
  Volume2, VolumeX, 
  Sun, Image, Type, Layers,
  Undo, Redo,
  Film
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import VideoTimeline from './VideoTimeline';
import VideoClipsList from './VideoClipsList';
import VideoEffects from './VideoEffects';

const VideoEditor = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(120); // Example duration in seconds
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState('clips');
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleSeek = (time: number) => {
    setCurrentTime(time);
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
  
  const handleExport = () => {
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
  
  return (
    <div className="flex flex-col gap-6">
      {/* Video Preview */}
      <Card className="w-full">
        <CardHeader className="pb-4">
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video bg-black/90 rounded-md overflow-hidden mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-gray-500 flex flex-col items-center gap-2">
                <Film size={48} />
                <span>Video Preview</span>
              </div>
            </div>
            
            {/* Video overlay controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center gap-2 mb-2 text-gray-300">
                <span>{formatTime(currentTime)}</span>
                <div className="flex-1">
                  <Slider 
                    value={[currentTime]} 
                    min={0} 
                    max={duration} 
                    step={0.1}
                    onValueChange={(value) => handleSeek(value[0])} 
                    className="w-full" 
                  />
                </div>
                <span>{formatTime(duration)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
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
      
      {/* Timeline */}
      <VideoTimeline 
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
      />
      
      {/* Editor Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Editor Tools</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Undo className="h-4 w-4 mr-1" />
                    Undo
                  </Button>
                  <Button variant="outline" size="sm">
                    <Redo className="h-4 w-4 mr-1" />
                    Redo
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="clips">Clips</TabsTrigger>
                  <TabsTrigger value="effects">Effects</TabsTrigger>
                  <TabsTrigger value="text">Text</TabsTrigger>
                  <TabsTrigger value="export">Export</TabsTrigger>
                </TabsList>
                
                <TabsContent value="clips">
                  <VideoClipsList />
                </TabsContent>
                
                <TabsContent value="effects">
                  <VideoEffects />
                </TabsContent>
                
                <TabsContent value="text">
                  <div className="space-y-4">
                    <div className="grid gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Add Text</label>
                        <div className="flex gap-2">
                          <Input placeholder="Enter text" />
                          <Button>
                            <Type className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Font Style</label>
                        <div className="grid grid-cols-4 gap-2">
                          <Button variant="outline" size="sm">Regular</Button>
                          <Button variant="outline" size="sm">Bold</Button>
                          <Button variant="outline" size="sm">Italic</Button>
                          <Button variant="outline" size="sm">Outlined</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="export">
                  <div className="space-y-4">
                    <div className="grid gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Export Settings</label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-gray-400 block mb-1">Format</label>
                            <select className="w-full p-2 rounded-md border border-gray-700 bg-black/50">
                              <option>MP4 (H.264)</option>
                              <option>WebM</option>
                              <option>MOV</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-gray-400 block mb-1">Quality</label>
                            <select className="w-full p-2 rounded-md border border-gray-700 bg-black/50">
                              <option>High (1080p)</option>
                              <option>Medium (720p)</option>
                              <option>Low (480p)</option>
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
        </div>
        
        <div>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Stream Recordings</CardTitle>
            </CardHeader>
            <CardContent>
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
                        <Button size="sm" variant="outline" className="h-7 text-xs">
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideoEditor;
