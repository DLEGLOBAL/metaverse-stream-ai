
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Layout, Monitor, Maximize2 } from 'lucide-react';
import { useLayoutSettings } from './layout/useLayoutSettings';

// Import tab components
import ThemeTab from './layout/ThemeTab';
import LayoutTab from './layout/LayoutTab';
import DisplayTab from './layout/DisplayTab';
import AccessibilityTab from './layout/AccessibilityTab';

const LayoutCustomization = () => {
  const { layoutSettings, handleSliderChange, handleToggleChange } = useLayoutSettings();
  
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
          
          <TabsContent value="theme">
            <ThemeTab />
          </TabsContent>
          
          <TabsContent value="layout">
            <LayoutTab 
              layoutSettings={layoutSettings}
              handleSliderChange={handleSliderChange}
              handleToggleChange={handleToggleChange}
            />
          </TabsContent>
          
          <TabsContent value="display">
            <DisplayTab 
              layoutSettings={layoutSettings}
              handleSliderChange={handleSliderChange}
              handleToggleChange={handleToggleChange}
            />
          </TabsContent>
          
          <TabsContent value="accessibility">
            <AccessibilityTab 
              layoutSettings={layoutSettings}
              handleToggleChange={handleToggleChange}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LayoutCustomization;
