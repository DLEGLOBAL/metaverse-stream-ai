
import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { LayoutSettings, LayoutSettingKey } from './types';

const DEFAULT_LAYOUT_SETTINGS: LayoutSettings = {
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
};

export const useLayoutSettings = () => {
  const [layoutSettings, setLayoutSettings] = useState<LayoutSettings>(() => {
    // Try to load from localStorage first
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('metastream-layout');
      if (savedSettings) {
        try {
          return JSON.parse(savedSettings) as LayoutSettings;
        } catch (e) {
          console.error('Failed to parse layout settings from localStorage');
        }
      }
    }
    return DEFAULT_LAYOUT_SETTINGS;
  });
  
  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('metastream-layout', JSON.stringify(layoutSettings));
  }, [layoutSettings]);
  
  const handleSliderChange = (setting: LayoutSettingKey, value: number[]) => {
    setLayoutSettings(prev => ({
      ...prev,
      [setting]: value[0]
    }));
    
    // Show toast
    toast({
      title: "Layout Updated",
      description: `${setting.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} has been updated.`,
    });
  };
  
  const handleToggleChange = (setting: LayoutSettingKey, value: boolean) => {
    setLayoutSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    // Show toast
    toast({
      title: "Layout Updated",
      description: `${setting.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} has been ${value ? 'enabled' : 'disabled'}.`,
    });
  };
  
  return {
    layoutSettings,
    handleSliderChange,
    handleToggleChange
  };
};
