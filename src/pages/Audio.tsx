
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, Speaker, Volume2, VolumeX, Music, Radio, Headphones, Plus } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

const Audio = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const audioSources = [
    { id: 1, name: 'Microphone', type: 'input', icon: Mic, level: 75, muted: false },
    { id: 2, name: 'System Audio', type: 'input', icon: Speaker, level: 90, muted: false },
    { id: 3, name: 'Music', type: 'input', icon: Music, level: 50, muted: false },
    { id: 4, name: 'Stream Output', type: 'output', icon: Radio, level: 100, muted: false },
    { id: 5, name: 'Headphones', type: 'output', icon: Headphones, level: 80, muted: false }
  ];
  
  const [levels, setLevels] = useState(
    audioSources.reduce((acc, source) => {
      acc[source.id] = source.level;
      return acc;
    }, {} as Record<number, number>)
  );
  
  const [muted, setMuted] = useState(
    audioSources.reduce((acc, source) => {
      acc[source.id] = source.muted;
      return acc;
    }, {} as Record<number, boolean>)
  );
  
  const handleLevelChange = (id: number, value: number[]) => {
    setLevels(prev => ({ ...prev, [id]: value[0] }));
  };
  
  const handleMuteToggle = (id: number) => {
    setMuted(prev => ({ ...prev, [id]: !prev[id] }));
    
    const source = audioSources.find(s => s.id === id);
    if (source) {
      toast({
        title: muted[id] ? "Unmuted" : "Muted",
        description: `${source.name} has been ${muted[id] ? "unmuted" : "muted"}`,
      });
    }
  };
  
  const handleAddSource = () => {
    toast({
      title: "Coming Soon",
      description: "Adding new audio sources will be available in the next update",
    });
  };

  return (
    <div className="min-h-screen bg-meta-slate">
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Header sidebarCollapsed={sidebarCollapsed} />
      
      <main className={`pt-20 px-4 pb-4 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Audio Mixer</h1>
          <Button 
            className="bg-button-gradient text-meta-dark-blue hover:brightness-110"
            onClick={handleAddSource}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Source
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Inputs */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Input Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {audioSources.filter(source => source.type === 'input').map((source) => (
                  <div key={source.id} className="p-4 border border-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <source.icon className="h-5 w-5 text-meta-teal mr-2" />
                        <span className="font-medium text-white">{source.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 w-8 p-0 ${muted[source.id] ? 'text-red-400' : 'text-gray-300'}`}
                        onClick={() => handleMuteToggle(source.id)}
                      >
                        {muted[source.id] ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Slider
                        value={[levels[source.id]]}
                        min={0}
                        max={100}
                        step={1}
                        className={`flex-1 ${muted[source.id] ? 'opacity-50' : ''}`}
                        onValueChange={(value) => handleLevelChange(source.id, value)}
                      />
                      <span className="text-sm text-gray-300 w-8 text-right">
                        {levels[source.id]}%
                      </span>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-gray-400 mb-1 block">Noise Suppression</label>
                        <div className="flex items-center">
                          <Switch id={`noise-${source.id}`} />
                          <label htmlFor={`noise-${source.id}`} className="ml-2 text-sm text-gray-300">
                            Enable
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 mb-1 block">Echo Cancellation</label>
                        <div className="flex items-center">
                          <Switch id={`echo-${source.id}`} />
                          <label htmlFor={`echo-${source.id}`} className="ml-2 text-sm text-gray-300">
                            Enable
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Outputs */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Output Destinations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {audioSources.filter(source => source.type === 'output').map((source) => (
                  <div key={source.id} className="p-4 border border-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <source.icon className="h-5 w-5 text-meta-teal mr-2" />
                        <span className="font-medium text-white">{source.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 w-8 p-0 ${muted[source.id] ? 'text-red-400' : 'text-gray-300'}`}
                        onClick={() => handleMuteToggle(source.id)}
                      >
                        {muted[source.id] ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Slider
                        value={[levels[source.id]]}
                        min={0}
                        max={100}
                        step={1}
                        className={`flex-1 ${muted[source.id] ? 'opacity-50' : ''}`}
                        onValueChange={(value) => handleLevelChange(source.id, value)}
                      />
                      <span className="text-sm text-gray-300 w-8 text-right">
                        {levels[source.id]}%
                      </span>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-gray-400 mb-1 block">Limiter</label>
                        <div className="flex items-center">
                          <Switch id={`limiter-${source.id}`} defaultChecked />
                          <label htmlFor={`limiter-${source.id}`} className="ml-2 text-sm text-gray-300">
                            Enable
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 mb-1 block">Compressor</label>
                        <div className="flex items-center">
                          <Switch id={`compressor-${source.id}`} defaultChecked />
                          <label htmlFor={`compressor-${source.id}`} className="ml-2 text-sm text-gray-300">
                            Enable
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Master Controls */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Master Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="border-meta-teal/30 hover:bg-meta-teal/10 text-white">
                  <Headphones className="h-4 w-4 mr-2" /> Monitoring
                </Button>
                <Button variant="outline" className="border-meta-teal/30 hover:bg-meta-teal/10 text-white">
                  <Music className="h-4 w-4 mr-2" /> Add Background Music
                </Button>
                <Button variant="outline" className="border-meta-teal/30 hover:bg-meta-teal/10 text-white">
                  <Mic className="h-4 w-4 mr-2" /> Voice Changer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Audio;
