
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CustomTheme } from '../customTheme.types';
import { defaultDarkTheme, defaultLightTheme } from '../utils/defaultThemes';
import { toast } from '@/hooks/use-toast';

export const useCustomThemeState = () => {
  const [customThemes, setCustomThemes] = useState<CustomTheme[]>([defaultDarkTheme, defaultLightTheme]);
  const [activeCustomThemeId, setActiveCustomThemeId] = useState<string | null>(null);

  // Load custom themes from localStorage
  useEffect(() => {
    const savedThemes = localStorage.getItem('metastream-custom-themes');
    const savedActiveThemeId = localStorage.getItem('metastream-active-custom-theme');

    if (savedThemes) {
      try {
        setCustomThemes(JSON.parse(savedThemes));
      } catch (e) {
        console.error('Failed to parse custom themes from localStorage');
      }
    }

    if (savedActiveThemeId) {
      setActiveCustomThemeId(savedActiveThemeId);
    }
  }, []);

  // Save custom themes to localStorage
  useEffect(() => {
    localStorage.setItem('metastream-custom-themes', JSON.stringify(customThemes));
  }, [customThemes]);

  // Save active theme id to localStorage
  useEffect(() => {
    if (activeCustomThemeId) {
      localStorage.setItem('metastream-active-custom-theme', activeCustomThemeId);
    } else {
      localStorage.removeItem('metastream-active-custom-theme');
    }
  }, [activeCustomThemeId]);

  const addCustomTheme = (theme: Omit<CustomTheme, 'id'>): string => {
    const newTheme: CustomTheme = {
      ...theme,
      id: uuidv4()
    };
    
    setCustomThemes(prev => [...prev, newTheme]);
    toast({
      title: "Theme Created",
      description: `Your new theme "${newTheme.name}" has been created.`,
    });
    
    return newTheme.id;
  };

  const updateCustomTheme = (id: string, updates: Partial<CustomTheme>) => {
    setCustomThemes(prev => 
      prev.map(theme => 
        theme.id === id ? { ...theme, ...updates } : theme
      )
    );
    
    toast({
      title: "Theme Updated",
      description: "Your custom theme has been updated.",
    });
  };

  const deleteCustomTheme = (id: string) => {
    if (id === 'default-dark' || id === 'default-light') {
      toast({
        title: "Cannot Delete Default Theme",
        description: "The default themes cannot be deleted.",
        variant: "destructive",
      });
      return;
    }
    
    if (activeCustomThemeId === id) {
      setActiveCustomThemeId(null);
    }
    
    setCustomThemes(prev => prev.filter(theme => theme.id !== id));
    
    toast({
      title: "Theme Deleted",
      description: "Your custom theme has been deleted.",
    });
  };

  return {
    customThemes,
    activeCustomThemeId,
    setActiveCustomThemeId,
    addCustomTheme,
    updateCustomTheme,
    deleteCustomTheme,
  };
};
