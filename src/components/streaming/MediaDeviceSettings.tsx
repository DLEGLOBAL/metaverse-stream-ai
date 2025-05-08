
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, Camera, Mic, Monitor, Settings } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { getAvailableMediaDevices, checkMediaAccess } from '@/contexts/streaming/mediaStreamUtils';
import { toast } from '@/hooks/use-toast';
import PlatformErrorHandling from './PlatformErrorHandling';

interface MediaDeviceSettingsProps {
  initialTab?: 'camera' | 'microphone' | 'display';
}

const MediaDeviceSettings: React.FC<MediaDeviceSettingsProps> = ({ initialTab = 'camera' }) => {
  const [activeTab, setActiveTab] = useState<'camera' | 'microphone' | 'display'>(initialTab);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState<{camera: boolean, microphone: boolean}>({ camera: false, microphone: false });
  const [selectedDevices, setSelectedDevices] = useState<{camera: string, microphone: string}>({ camera: '', microphone: '' });
  
  // Load devices on component mount
  useEffect(() => {
    loadDevices();
    checkPermissions();
  }, []);
  
  const checkPermissions = async () => {
    const access = await checkMediaAccess();
    setPermissions(access);
  };
  
  const loadDevices = async () => {
    setLoading(true);
    try {
      const deviceList = await getAvailableMediaDevices();
      setDevices(deviceList);
      
      // Set default devices if available
      const defaultCamera = deviceList.find(d => d.kind === 'videoinput')?.deviceId;
      const defaultMic = deviceList.find(d => d.kind === 'audioinput')?.deviceId;
      
      setSelectedDevices({
        camera: defaultCamera || '',
        microphone: defaultMic || ''
      });
    } catch (error) {
      console.error('Error loading devices:', error);
      toast({
        title: 'Device Detection Error',
        description: 'Could not detect media devices. Please check your browser permissions.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleTabChange = (tab: 'camera' | 'microphone' | 'display') => {
    setActiveTab(tab);
  };
  
  const handleDeviceChange = (type: 'camera' | 'microphone', deviceId: string) => {
    setSelectedDevices(prev => ({
      ...prev,
      [type]: deviceId
    }));
  };
  
  const handleOpenBrowserSettings = () => {
    // Create a help message with instructions for different browsers
    const message = `
To enable camera and microphone permissions:

Chrome: Click the camera icon in the address bar → Site Settings
Firefox: Click the lock icon in the address bar → Permissions
Safari: Safari menu → Preferences → Websites → Camera/Microphone
Edge: Click the lock icon in the address bar → Site permissions
    `.trim();
    
    toast({
      title: 'Browser Permissions',
      description: message,
    });
  };
  
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">Media Device Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Button
              variant={activeTab === 'camera' ? 'default' : 'outline'}
              className={activeTab === 'camera' ? 'bg-meta-teal/20' : 'border-meta-teal/30'}
              onClick={() => handleTabChange('camera')}
            >
              <Camera className="h-4 w-4 mr-2" /> Camera
            </Button>
            <Button
              variant={activeTab === 'microphone' ? 'default' : 'outline'}
              className={activeTab === 'microphone' ? 'bg-meta-teal/20' : 'border-meta-teal/30'}
              onClick={() => handleTabChange('microphone')}
            >
              <Mic className="h-4 w-4 mr-2" /> Microphone
            </Button>
            <Button
              variant={activeTab === 'display' ? 'default' : 'outline'}
              className={activeTab === 'display' ? 'bg-meta-teal/20' : 'border-meta-teal/30'}
              onClick={() => handleTabChange('display')}
            >
              <Monitor className="h-4 w-4 mr-2" /> Screen Share
            </Button>
          </div>
          
          {!permissions.camera && activeTab === 'camera' && (
            <PlatformErrorHandling
              errorType="camera"
              errorMessage="Camera access is not granted. Please check your browser settings."
              onRetry={checkPermissions}
            />
          )}
          
          {!permissions.microphone && activeTab === 'microphone' && (
            <PlatformErrorHandling
              errorType="microphone"
              errorMessage="Microphone access is not granted. Please check your browser settings."
              onRetry={checkPermissions}
            />
          )}
          
          {activeTab === 'camera' && permissions.camera && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Select Camera</label>
                <div className="flex space-x-2">
                  <Select
                    value={selectedDevices.camera}
                    onValueChange={(value) => handleDeviceChange('camera', value)}
                    disabled={loading || devices.filter(d => d.kind === 'videoinput').length === 0}
                  >
                    <SelectTrigger className="w-full bg-meta-dark-blue border border-meta-teal/30 text-white">
                      <SelectValue placeholder="Select camera" />
                    </SelectTrigger>
                    <SelectContent>
                      {devices.filter(device => device.kind === 'videoinput').map(device => (
                        <SelectItem key={device.deviceId} value={device.deviceId}>
                          {device.label || `Camera ${device.deviceId.slice(0, 5)}...`}
                        </SelectItem>
                      ))}
                      {devices.filter(device => device.kind === 'videoinput').length === 0 && (
                        <SelectItem value="none" disabled>No cameras detected</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <Button 
                    variant="outline" 
                    className="border-meta-teal/30 hover:bg-meta-teal/10"
                    disabled={loading}
                    onClick={loadDevices}
                  >
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Camera Resolution</label>
                <RadioGroup defaultValue="720p" className="grid grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="480p" id="r1" />
                    <Label htmlFor="r1">480p</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="720p" id="r2" />
                    <Label htmlFor="r2">720p (HD)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1080p" id="r3" />
                    <Label htmlFor="r3">1080p (Full HD)</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}
          
          {activeTab === 'microphone' && permissions.microphone && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Select Microphone</label>
                <div className="flex space-x-2">
                  <Select
                    value={selectedDevices.microphone}
                    onValueChange={(value) => handleDeviceChange('microphone', value)}
                    disabled={loading || devices.filter(d => d.kind === 'audioinput').length === 0}
                  >
                    <SelectTrigger className="w-full bg-meta-dark-blue border border-meta-teal/30 text-white">
                      <SelectValue placeholder="Select microphone" />
                    </SelectTrigger>
                    <SelectContent>
                      {devices.filter(device => device.kind === 'audioinput').map(device => (
                        <SelectItem key={device.deviceId} value={device.deviceId}>
                          {device.label || `Microphone ${device.deviceId.slice(0, 5)}...`}
                        </SelectItem>
                      ))}
                      {devices.filter(device => device.kind === 'audioinput').length === 0 && (
                        <SelectItem value="none" disabled>No microphones detected</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <Button 
                    variant="outline" 
                    className="border-meta-teal/30 hover:bg-meta-teal/10"
                    disabled={loading}
                    onClick={loadDevices}
                  >
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Audio Processing</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="echoCancellation" className="rounded bg-meta-dark-blue border-meta-teal/30" defaultChecked />
                    <label htmlFor="echoCancellation" className="text-sm">Echo Cancellation</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="noiseSuppression" className="rounded bg-meta-dark-blue border-meta-teal/30" defaultChecked />
                    <label htmlFor="noiseSuppression" className="text-sm">Noise Suppression</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="autoGainControl" className="rounded bg-meta-dark-blue border-meta-teal/30" defaultChecked />
                    <label htmlFor="autoGainControl" className="text-sm">Auto Gain Control</label>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'display' && (
            <div>
              <p className="text-gray-300 mb-4">Screen sharing options are controlled by your browser when you start sharing. You'll be able to choose which screen, window, or tab to share when you begin.</p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="includeAudio" className="rounded bg-meta-dark-blue border-meta-teal/30" />
                  <label htmlFor="includeAudio" className="text-sm">Include system audio when sharing (Chrome only)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="optimizeVideo" className="rounded bg-meta-dark-blue border-meta-teal/30" defaultChecked />
                  <label htmlFor="optimizeVideo" className="text-sm">Optimize video quality</label>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-4 flex justify-between">
            <Button variant="outline" className="border-meta-teal/30 hover:bg-meta-teal/10" onClick={handleOpenBrowserSettings}>
              <Settings className="h-4 w-4 mr-2" /> Browser Settings
            </Button>
            
            <Button className="bg-button-gradient text-meta-dark-blue hover:brightness-110">
              Apply Settings
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaDeviceSettings;
