
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/contexts/theme';
import { useTheme } from '@/contexts/theme';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { 
  Palette, Layout, Monitor, Maximize2, 
  Layers, MousePointer, 
  PanelLeft, PanelRight, MonitorSmartphone
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface LayoutSettings {
  sidebarWidth: number;
  contentWidth: number;
  fontScale: number;
  reducedAnimations: boolean;
  contrastMode: boolean;
  alwaysShowLabels: boolean;
  compactMode: boolean;
  denseLayout: boolean;
  fullWidthLayout: boolean;
  systemFont: boolean;
}

const LayoutCustomization = () => {
  const { theme } = useTheme();
  const [layoutSettings, setLayoutSettings] = useState<LayoutSettings>({
    sidebarWidth: 64,
    contentWidth: 80,
    fontScale: 100,
    reducedAnimations: false,
    contrastMode: false,
    alwaysShowLabels: true,
    compactMode: false,
    denseLayout: false,
    fullWidthLayout: false,
    systemFont: false
  });
  
  const handleSliderChange = (setting: keyof LayoutSettings, value: number[]) => {
    setLayoutSettings(prev => ({
      ...prev,
      [setting]: value[0]
    }));
    
    // Save to local storage
    localStorage.setItem('metastream-layout', JSON.stringify({
      ...layoutSettings,
      [setting]: value[0]
    }));
    
    // Show toast
    toast({
      title: "Layout Updated",
      description: `${setting.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} has been updated.`,
    });
  };
  
  const handleToggleChange = (setting: keyof LayoutSettings, value: boolean) => {
    setLayoutSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    // Save to local storage
    localStorage.setItem('metastream-layout', JSON.stringify({
      ...layoutSettings,
      [setting]: value
    }));
    
    // Show toast
    toast({
      title: "Layout Updated",
      description: `${setting.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} has been ${value ? 'enabled' : 'disabled'}.`,
    });
  };
  
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-white dark:text-white">Layout Customization</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="theme">
          <TabsList className="mb-4 bg-meta-dark-blue/50 dark:bg-meta-dark-blue/80">
            <TabsTrigger value="theme" className="data-[state=active]:bg-meta-teal/20 data-[state=active]:text-meta-teal">
              <Palette className="h-4 w-4 mr-2" />
              Theme
            </TabsTrigger>
            <TabsTrigger value="layout" className="data-[state=active]:bg-meta-teal/20 data-[state=active]:text-meta-teal">
              <Layout className="h-4 w-4 mr-2" />
              Layout
            </TabsTrigger>
            <TabsTrigger value="display" className="data-[state=active]:bg-meta-teal/20 data-[state=active]:text-meta-teal">
              <Monitor className="h-4 w-4 mr-2" />
              Display
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="data-[state=active]:bg-meta-teal/20 data-[state=active]:text-meta-teal">
              <Maximize2 className="h-4 w-4 mr-2" />
              Accessibility
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="theme" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-lg font-medium">Color Theme</h3>
                <p className="text-sm text-gray-400">
                  Switch between light and dark themes for comfortable viewing
                </p>
              </div>
              <ThemeToggle showLabels size="md" />
            </div>
            
            <div className="space-y-4 pt-4 border-t border-gray-700">
              <h3 className="text-lg font-medium">Color Customization</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-1 block">
                    Accent Color
                  </label>
                  <div className="flex space-x-2">
                    {['#0CFFE1', '#9b87f5', '#f87171', '#4ade80', '#f59e0b'].map(color => (
                      <button
                        key={color}
                        onClick={() => toast({
                          title: "Feature Coming Soon",
                          description: "Custom accent colors will be available in an upcoming update."
                        })}
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-1 block">
                    Sidebar Style
                  </label>
                  <select className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white">
                    <option>Solid</option>
                    <option>Transparent</option>
                    <option>Glassmorphism</option>
                  </select>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="layout" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Sidebar Width</h3>
              <div className="flex items-center space-x-4">
                <PanelLeft className="text-gray-400 h-5 w-5" />
                <Slider
                  value={[layoutSettings.sidebarWidth]}
                  min={48}
                  max={96}
                  step={4}
                  onValueChange={(value) => handleSliderChange('sidebarWidth', value)}
                  className="flex-1"
                />
                <PanelRight className="text-gray-400 h-5 w-5" />
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Sidebar width: {layoutSettings.sidebarWidth}px
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Content Width</h3>
              <div className="flex items-center space-x-4">
                <MonitorSmartphone className="text-gray-400 h-5 w-5" />
                <Slider
                  value={[layoutSettings.contentWidth]}
                  min={60}
                  max={100}
                  step={5}
                  onValueChange={(value) => handleSliderChange('contentWidth', value)}
                  className="flex-1"
                />
                <Maximize2 className="text-gray-400 h-5 w-5" />
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Content width: {layoutSettings.contentWidth}%
              </div>
            </div>
            
            <div className="space-y-3 pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-base font-medium">Always Show Labels</h3>
                  <p className="text-xs text-gray-400">Show text labels alongside icons in the UI</p>
                </div>
                <Switch 
                  checked={layoutSettings.alwaysShowLabels}
                  onCheckedChange={(checked) => handleToggleChange('alwaysShowLabels', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-base font-medium">Compact Mode</h3>
                  <p className="text-xs text-gray-400">Reduce spacing between UI elements</p>
                </div>
                <Switch 
                  checked={layoutSettings.compactMode}
                  onCheckedChange={(checked) => handleToggleChange('compactMode', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-base font-medium">Dense Layout</h3>
                  <p className="text-xs text-gray-400">Show more content in the same space</p>
                </div>
                <Switch 
                  checked={layoutSettings.denseLayout}
                  onCheckedChange={(checked) => handleToggleChange('denseLayout', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-base font-medium">Full Width Layout</h3>
                  <p className="text-xs text-gray-400">Expand content to fill the entire screen</p>
                </div>
                <Switch 
                  checked={layoutSettings.fullWidthLayout}
                  onCheckedChange={(checked) => handleToggleChange('fullWidthLayout', checked)}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="display" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Font Size</h3>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-400">A</span>
                <Slider
                  value={[layoutSettings.fontScale]}
                  min={75}
                  max={150}
                  step={5}
                  onValueChange={(value) => handleSliderChange('fontScale', value)}
                  className="flex-1"
                />
                <span className="text-xl text-gray-400">A</span>
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Font scale: {layoutSettings.fontScale}%
              </div>
            </div>
            
            <div className="space-y-3 pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-base font-medium">System Font</h3>
                  <p className="text-xs text-gray-400">Use your system's default font</p>
                </div>
                <Switch 
                  checked={layoutSettings.systemFont}
                  onCheckedChange={(checked) => handleToggleChange('systemFont', checked)}
                />
              </div>
              
              <div className="pt-4">
                <h3 className="text-base font-medium mb-2">Font Preview</h3>
                <div className="bg-meta-dark-blue/30 p-4 rounded-md">
                  <p className="mb-2" style={{ fontSize: `${layoutSettings.fontScale}%` }}>
                    This is how your text will appear
                  </p>
                  <p className="text-sm text-gray-400" style={{ fontSize: `${layoutSettings.fontScale * 0.875 / 100}rem` }}>
                    Smaller text like this will also be adjusted
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="accessibility" className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-base font-medium">Reduced Animations</h3>
                  <p className="text-xs text-gray-400">Minimize motion for a more comfortable experience</p>
                </div>
                <Switch 
                  checked={layoutSettings.reducedAnimations}
                  onCheckedChange={(checked) => handleToggleChange('reducedAnimations', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-base font-medium">High Contrast Mode</h3>
                  <p className="text-xs text-gray-400">Increase contrast for better visibility</p>
                </div>
                <Switch 
                  checked={layoutSettings.contrastMode}
                  onCheckedChange={(checked) => handleToggleChange('contrastMode', checked)}
                />
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-700">
              <h3 className="text-lg font-medium mb-4">Preview Cursor Size</h3>
              <div className="flex items-center space-x-4">
                <MousePointer className="text-gray-400 h-4 w-4" />
                <Slider
                  defaultValue={[100]}
                  min={75}
                  max={200}
                  step={25}
                  onValueChange={(value) => toast({
                    title: "Feature Coming Soon",
                    description: "Custom cursor size will be available in an upcoming update."
                  })}
                  className="flex-1"
                />
                <MousePointer className="text-gray-400 h-6 w-6" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LayoutCustomization;
