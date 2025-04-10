import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Camera, Video, RefreshCw, CheckSquare } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const VideoSettings: React.FC = () => {
  const [videoSettings, setVideoSettings] = useState({
    resolution: '1080p',
    framerate: '60',
    bitrate: 6000,
    keyframeInterval: 2,
    encoder: 'nvenc',
    lowLatencyMode: true,
    dynamicBitrate: true,
    noiseReduction: true,
    colorCorrection: false,
    autoFocus: true
  });
  
  const [devices, setDevices] = useState([
    { id: 'cam1', name: 'Logitech C922 Pro', type: 'camera', active: true },
    { id: 'cam2', name: 'Webcam HD 720p', type: 'camera', active: false },
    { id: 'display1', name: 'Main Display', type: 'display', active: false }
  ]);
  
  const handleToggle = (setting: string) => {
    setVideoSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
    
    toast({
      title: 'Video Setting Updated',
      description: `${setting.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} has been ${!videoSettings[setting as keyof typeof videoSettings] ? 'enabled' : 'disabled'}.`,
    });
  };
  
  const handleBitrateChange = (values: number[]) => {
    setVideoSettings(prev => ({
      ...prev,
      bitrate: values[0]
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setVideoSettings(prev => ({
      ...prev,
      [name]: value
    }));
    
    toast({
      title: 'Video Setting Updated',
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
        title: 'Video Device Updated',
        description: `${device.name} is now active.`,
      });
    }
  };
  
  const handleRefreshDevices = () => {
    toast({
      title: 'Refreshing Devices',
      description: 'Scanning for new video devices...',
    });
    
    // Simulate device refresh
    setTimeout(() => {
      toast({
        title: 'Devices Refreshed',
        description: 'All available video devices have been detected.',
      });
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Video Devices</CardTitle>
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
            
            <div className="space-y-2">
              {devices.map(device => (
                <div 
                  key={device.id}
                  className={`p-3 rounded-md flex items-center justify-between ${
                    device.active 
                      ? 'bg-meta-teal/10 border border-meta-teal/30' 
                      : 'border border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center">
                    <Camera className={`h-4 w-4 mr-2 ${device.active ? 'text-meta-teal' : 'text-gray-400'}`} />
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
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Video Quality</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Resolution</label>
              <Select
                value={videoSettings.resolution}
                onValueChange={(value) => handleSelectChange('resolution', value)}
              >
                <SelectTrigger className="w-full bg-meta-dark-blue border border-meta-teal/30 text-white">
                  <SelectValue placeholder="Select resolution" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="720p">720p (HD)</SelectItem>
                  <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                  <SelectItem value="1440p">1440p (QHD)</SelectItem>
                  <SelectItem value="2160p">2160p (4K UHD)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Framerate</label>
              <Select
                value={videoSettings.framerate}
                onValueChange={(value) => handleSelectChange('framerate', value)}
              >
                <SelectTrigger className="w-full bg-meta-dark-blue border border-meta-teal/30 text-white">
                  <SelectValue placeholder="Select framerate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24">24 FPS (Cinematic)</SelectItem>
                  <SelectItem value="30">30 FPS (Standard)</SelectItem>
                  <SelectItem value="60">60 FPS (Smooth)</SelectItem>
                  <SelectItem value="120">120 FPS (High Speed)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Encoder</label>
              <Select
                value={videoSettings.encoder}
                onValueChange={(value) => handleSelectChange('encoder', value)}
              >
                <SelectTrigger className="w-full bg-meta-dark-blue border border-meta-teal/30 text-white">
                  <SelectValue placeholder="Select encoder" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="x264">x264 (Software)</SelectItem>
                  <SelectItem value="nvenc">NVENC (NVIDIA)</SelectItem>
                  <SelectItem value="quicksync">QuickSync (Intel)</SelectItem>
                  <SelectItem value="amf">AMF (AMD)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Keyframe Interval</label>
              <Select
                value={videoSettings.keyframeInterval.toString()}
                onValueChange={(value) => handleSelectChange('keyframeInterval', value)}
              >
                <SelectTrigger className="w-full bg-meta-dark-blue border border-meta-teal/30 text-white">
                  <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 second</SelectItem>
                  <SelectItem value="2">2 seconds</SelectItem>
                  <SelectItem value="3">3 seconds</SelectItem>
                  <SelectItem value="5">5 seconds</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">Bitrate: {videoSettings.bitrate} kbps</label>
              <div className="flex space-x-3">
                <Slider
                  value={[videoSettings.bitrate]}
                  min={1000}
                  max={12000}
                  step={500}
                  onValueChange={handleBitrateChange}
                  className="flex-1"
                />
                <div className="bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white text-sm w-28 text-center">
                  {videoSettings.bitrate} kbps
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Advanced Video Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">Low Latency Mode</h3>
                <p className="text-xs text-gray-400">Prioritize reduced delay over quality</p>
              </div>
              <Switch 
                checked={videoSettings.lowLatencyMode}
                onCheckedChange={() => handleToggle('lowLatencyMode')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">Dynamic Bitrate</h3>
                <p className="text-xs text-gray-400">Adjust bitrate based on connection</p>
              </div>
              <Switch 
                checked={videoSettings.dynamicBitrate}
                onCheckedChange={() => handleToggle('dynamicBitrate')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">Noise Reduction</h3>
                <p className="text-xs text-gray-400">Reduce video noise in low light</p>
              </div>
              <Switch 
                checked={videoSettings.noiseReduction}
                onCheckedChange={() => handleToggle('noiseReduction')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">Color Correction</h3>
                <p className="text-xs text-gray-400">Auto-adjust white balance and color</p>
              </div>
              <Switch 
                checked={videoSettings.colorCorrection}
                onCheckedChange={() => handleToggle('colorCorrection')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">Auto Focus</h3>
                <p className="text-xs text-gray-400">Automatically adjust camera focus</p>
              </div>
              <Switch 
                checked={videoSettings.autoFocus}
                onCheckedChange={() => handleToggle('autoFocus')}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoSettings;
