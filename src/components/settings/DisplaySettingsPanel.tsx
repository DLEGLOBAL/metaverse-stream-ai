
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Monitor, Zap, Moon, Sparkles, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import DisplayTab from './layout/DisplayTab';
import AccessibilityTab from './layout/AccessibilityTab';

const DisplaySettingsPanel: React.FC = () => {
  const [displaySettings, setDisplaySettings] = useState({
    theme: 'dark',
    uiScale: 100,
    frameRate: '60',
    vsync: true,
    lowPowerMode: false,
    darkModeStart: '19:00',
    darkModeEnd: '07:00',
    autoDarkMode: true,
    animations: true,
    transparencyEffects: true,
    hardwareAcceleration: true
  });
  
  const [layoutSettings, setLayoutSettings] = useState({
    fontScale: 100,
    reducedAnimations: false,
    contrastMode: false,
    systemFont: false
  });
  
  const handleToggle = (setting: string) => {
    setDisplaySettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
    
    toast({
      title: 'Display Setting Updated',
      description: `${setting.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} has been ${!displaySettings[setting as keyof typeof displaySettings] ? 'enabled' : 'disabled'}.`,
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setDisplaySettings(prev => ({
      ...prev,
      [name]: value
    }));
    
    toast({
      title: 'Display Setting Updated',
      description: `${name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} has been set to ${value}.`,
    });
  };
  
  const handleSliderChange = (setting: string, value: number[]) => {
    setDisplaySettings(prev => ({
      ...prev,
      [setting]: value[0]
    }));
  };
  
  const handleLayoutSliderChange = (setting: string, value: number[]) => {
    setLayoutSettings(prev => ({
      ...prev,
      [setting]: value[0]
    }));
    
    toast({
      title: 'Display Setting Updated',
      description: `${setting.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} has been updated.`,
    });
  };
  
  const handleLayoutToggleChange = (setting: string, value: boolean) => {
    setLayoutSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    toast({
      title: 'Display Setting Updated',
      description: `${setting.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} has been ${value ? 'enabled' : 'disabled'}.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Theme Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Theme Mode</label>
              <Select
                value={displaySettings.theme}
                onValueChange={(value) => handleSelectChange('theme', value)}
              >
                <SelectTrigger className="w-full bg-meta-dark-blue border border-meta-teal/30 text-white">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dark">Dark (Default)</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="system">Match System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-meta-teal" />
                  <h3 className="text-base font-medium">Automatic Dark Mode</h3>
                </div>
                <p className="text-xs text-gray-400">Switch to dark mode based on time of day</p>
              </div>
              <Switch 
                checked={displaySettings.autoDarkMode}
                onCheckedChange={() => handleToggle('autoDarkMode')}
              />
            </div>
            
            {displaySettings.autoDarkMode && (
              <div className="grid grid-cols-2 gap-4 pl-6 pt-2">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Dark Mode Start</label>
                  <input
                    type="time"
                    value={displaySettings.darkModeStart}
                    onChange={(e) => handleSelectChange('darkModeStart', e.target.value)}
                    className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Dark Mode End</label>
                  <input
                    type="time"
                    value={displaySettings.darkModeEnd}
                    onChange={(e) => handleSelectChange('darkModeEnd', e.target.value)}
                    className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white"
                  />
                </div>
              </div>
            )}
            
            <div>
              <div className="flex items-center mb-1">
                <Monitor className="h-4 w-4 mr-2 text-meta-teal" />
                <h3 className="text-sm font-medium">UI Scale: {displaySettings.uiScale}%</h3>
              </div>
              <Slider 
                value={[displaySettings.uiScale]}
                min={75}
                max={150}
                step={5}
                onValueChange={(values) => handleSliderChange('uiScale', values)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Performance Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Frame Rate Limit</label>
              <Select
                value={displaySettings.frameRate}
                onValueChange={(value) => handleSelectChange('frameRate', value)}
              >
                <SelectTrigger className="w-full bg-meta-dark-blue border border-meta-teal/30 text-white">
                  <SelectValue placeholder="Select frame rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 FPS</SelectItem>
                  <SelectItem value="60">60 FPS</SelectItem>
                  <SelectItem value="120">120 FPS</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-meta-teal" />
                  <h3 className="text-base font-medium">Hardware Acceleration</h3>
                </div>
                <p className="text-xs text-gray-400">Use GPU for rendering (recommended)</p>
              </div>
              <Switch 
                checked={displaySettings.hardwareAcceleration}
                onCheckedChange={() => handleToggle('hardwareAcceleration')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <Moon className="h-4 w-4 text-meta-teal" />
                  <h3 className="text-base font-medium">Low Power Mode</h3>
                </div>
                <p className="text-xs text-gray-400">Reduce animations and effects to save battery</p>
              </div>
              <Switch 
                checked={displaySettings.lowPowerMode}
                onCheckedChange={() => handleToggle('lowPowerMode')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">VSync</h3>
                <p className="text-xs text-gray-400">Synchronize with monitor refresh rate</p>
              </div>
              <Switch 
                checked={displaySettings.vsync}
                onCheckedChange={() => handleToggle('vsync')}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Visual Effects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 text-meta-teal" />
                  <h3 className="text-base font-medium">Animations</h3>
                </div>
                <p className="text-xs text-gray-400">Enable UI animations and transitions</p>
              </div>
              <Switch 
                checked={displaySettings.animations}
                onCheckedChange={() => handleToggle('animations')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">Transparency Effects</h3>
                <p className="text-xs text-gray-400">Enable glass and blur effects</p>
              </div>
              <Switch 
                checked={displaySettings.transparencyEffects}
                onCheckedChange={() => handleToggle('transparencyEffects')}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Font Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <DisplayTab
            layoutSettings={layoutSettings}
            handleSliderChange={handleLayoutSliderChange}
            handleToggleChange={handleLayoutToggleChange}
          />
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Accessibility</CardTitle>
        </CardHeader>
        <CardContent>
          <AccessibilityTab
            layoutSettings={layoutSettings}
            handleToggleChange={handleLayoutToggleChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DisplaySettingsPanel;
