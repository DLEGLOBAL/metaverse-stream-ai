import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Mic, Volume2, RefreshCw, Speaker, CheckSquare } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const AudioSettingsPanel: React.FC = () => {
  const [audioSettings, setAudioSettings] = useState({
    volume: 75,
    monitorVolume: 50,
    noiseSuppression: true,
    echoCancellation: true,
    autoGainControl: false,
    highPassFilter: false,
    limiter: true,
    sampleRate: '48',
    bitDepth: '24',
    compressor: true,
    compressorThreshold: -20,
    normalization: false
  });
  
  const [devices, setDevices] = useState([
    { id: 'mic1', name: 'Blue Yeti Microphone', type: 'input', active: true },
    { id: 'mic2', name: 'Built-in Microphone', type: 'input', active: false },
    { id: 'speaker1', name: 'Desktop Speakers', type: 'output', active: true },
    { id: 'speaker2', name: 'Headphones', type: 'output', active: false }
  ]);
  
  const handleToggle = (setting: string) => {
    setAudioSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
    
    toast({
      title: 'Audio Setting Updated',
      description: `${setting.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} has been ${!audioSettings[setting as keyof typeof audioSettings] ? 'enabled' : 'disabled'}.`,
    });
  };
  
  const handleSliderChange = (setting: string, values: number[]) => {
    setAudioSettings(prev => ({
      ...prev,
      [setting]: values[0]
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setAudioSettings(prev => ({
      ...prev,
      [name]: value
    }));
    
    toast({
      title: 'Audio Setting Updated',
      description: `${name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} has been set to ${value}.`,
    });
  };
  
  const handleDeviceToggle = (id: string) => {
    setDevices(prev => 
      prev.map(device => {
        if (device.id === id) {
          return { ...device, active: true };
        } else if (device.type === devices.find(d => d.id === id)?.type) {
          return { ...device, active: false };
        }
        return device;
      })
    );
    
    const device = devices.find(d => d.id === id);
    if (device) {
      toast({
        title: 'Audio Device Updated',
        description: `${device.name} is now active.`,
      });
    }
  };
  
  const handleRefreshDevices = () => {
    toast({
      title: 'Refreshing Devices',
      description: 'Scanning for new audio devices...',
    });
    
    // Simulate device refresh
    setTimeout(() => {
      toast({
        title: 'Devices Refreshed',
        description: 'All available audio devices have been detected.',
      });
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Audio Devices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-medium">Available Devices</h3>
              <Button 
                size="sm" 
                variant="outline"
                className="flex items-center space-x-1"
                onClick={handleRefreshDevices}
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                <span>Refresh</span>
              </Button>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Input Devices</h4>
              <div className="space-y-2 mb-4">
                {devices.filter(d => d.type === 'input').map(device => (
                  <div 
                    key={device.id}
                    className={`p-3 rounded-md flex items-center justify-between ${
                      device.active 
                        ? 'bg-meta-teal/10 border border-meta-teal/30' 
                        : 'border border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center">
                      <Mic className={`h-4 w-4 mr-2 ${device.active ? 'text-meta-teal' : 'text-gray-400'}`} />
                      <span className={device.active ? 'text-white' : 'text-gray-400'}>{device.name}</span>
                    </div>
                    {device.active ? (
                      <CheckSquare className="h-4 w-4 text-meta-teal" />
                    ) : (
                      <Button 
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs"
                        onClick={() => handleDeviceToggle(device.id)}
                      >
                        Set Active
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              <h4 className="text-sm font-medium text-gray-300 mb-2">Output Devices</h4>
              <div className="space-y-2">
                {devices.filter(d => d.type === 'output').map(device => (
                  <div 
                    key={device.id}
                    className={`p-3 rounded-md flex items-center justify-between ${
                      device.active 
                        ? 'bg-meta-teal/10 border border-meta-teal/30' 
                        : 'border border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center">
                      <Speaker className={`h-4 w-4 mr-2 ${device.active ? 'text-meta-teal' : 'text-gray-400'}`} />
                      <span className={device.active ? 'text-white' : 'text-gray-400'}>{device.name}</span>
                    </div>
                    {device.active ? (
                      <CheckSquare className="h-4 w-4 text-meta-teal" />
                    ) : (
                      <Button 
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs"
                        onClick={() => handleDeviceToggle(device.id)}
                      >
                        Set Active
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Volume Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex items-center mb-2">
                <Mic className="h-4 w-4 mr-2 text-meta-teal" />
                <h3 className="text-base font-medium">Microphone Volume: {audioSettings.volume}%</h3>
              </div>
              <Slider 
                value={[audioSettings.volume]}
                max={100}
                step={1}
                onValueChange={(values) => handleSliderChange('volume', values)}
              />
              
              <div className="mt-2 h-6 bg-meta-dark-blue/50 rounded-md overflow-hidden">
                <div className="h-full bg-gradient-to-r from-meta-teal/50 to-meta-teal flex items-center">
                  <div className="flex space-x-0.5 px-1">
                    <div className="w-1 h-2 bg-white/50 rounded-sm"></div>
                    <div className="w-1 h-3 bg-white/50 rounded-sm"></div>
                    <div className="w-1 h-4 bg-white/60 rounded-sm"></div>
                    <div className="w-1 h-2 bg-white/50 rounded-sm"></div>
                    <div className="w-1 h-3 bg-white/50 rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <Speaker className="h-4 w-4 mr-2 text-meta-teal" />
                <h3 className="text-base font-medium">Monitor Volume: {audioSettings.monitorVolume}%</h3>
              </div>
              <Slider 
                value={[audioSettings.monitorVolume]}
                max={100}
                step={1}
                onValueChange={(values) => handleSliderChange('monitorVolume', values)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Audio Quality</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Sample Rate</label>
              <Select
                value={audioSettings.sampleRate}
                onValueChange={(value) => handleSelectChange('sampleRate', value)}
              >
                <SelectTrigger className="w-full bg-meta-dark-blue border border-meta-teal/30 text-white">
                  <SelectValue placeholder="Select sample rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="44.1">44.1 kHz (CD Quality)</SelectItem>
                  <SelectItem value="48">48 kHz (Standard)</SelectItem>
                  <SelectItem value="96">96 kHz (High Resolution)</SelectItem>
                  <SelectItem value="192">192 kHz (Studio)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Bit Depth</label>
              <Select
                value={audioSettings.bitDepth}
                onValueChange={(value) => handleSelectChange('bitDepth', value)}
              >
                <SelectTrigger className="w-full bg-meta-dark-blue border border-meta-teal/30 text-white">
                  <SelectValue placeholder="Select bit depth" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="16">16-bit</SelectItem>
                  <SelectItem value="24">24-bit</SelectItem>
                  <SelectItem value="32">32-bit float</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Audio Processing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">Noise Suppression</h3>
                <p className="text-xs text-gray-400">Remove background noise</p>
              </div>
              <Switch 
                checked={audioSettings.noiseSuppression}
                onCheckedChange={() => handleToggle('noiseSuppression')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">Echo Cancellation</h3>
                <p className="text-xs text-gray-400">Prevent audio echo</p>
              </div>
              <Switch 
                checked={audioSettings.echoCancellation}
                onCheckedChange={() => handleToggle('echoCancellation')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">Auto Gain Control</h3>
                <p className="text-xs text-gray-400">Adjust volume automatically</p>
              </div>
              <Switch 
                checked={audioSettings.autoGainControl}
                onCheckedChange={() => handleToggle('autoGainControl')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">High Pass Filter</h3>
                <p className="text-xs text-gray-400">Remove low frequency rumble</p>
              </div>
              <Switch 
                checked={audioSettings.highPassFilter}
                onCheckedChange={() => handleToggle('highPassFilter')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">Limiter</h3>
                <p className="text-xs text-gray-400">Prevent audio clipping</p>
              </div>
              <Switch 
                checked={audioSettings.limiter}
                onCheckedChange={() => handleToggle('limiter')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">Normalization</h3>
                <p className="text-xs text-gray-400">Maintain consistent volume</p>
              </div>
              <Switch 
                checked={audioSettings.normalization}
                onCheckedChange={() => handleToggle('normalization')}
              />
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-base font-medium">Compressor</h3>
                  <p className="text-xs text-gray-400">Dynamic range compression</p>
                </div>
                <Switch 
                  checked={audioSettings.compressor}
                  onCheckedChange={() => handleToggle('compressor')}
                />
              </div>
              
              {audioSettings.compressor && (
                <div className="space-y-1 pt-2">
                  <label className="text-sm text-gray-300">Threshold: {audioSettings.compressorThreshold} dB</label>
                  <Slider 
                    value={[audioSettings.compressorThreshold]}
                    min={-50}
                    max={0}
                    step={1}
                    onValueChange={(values) => handleSliderChange('compressorThreshold', values)}
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AudioSettingsPanel;
