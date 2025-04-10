
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CustomTheme, CustomThemeContextType } from './customTheme.types';
import { useTheme } from './ThemeContext';
import { toast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';

const defaultDarkTheme: CustomTheme = {
  id: 'default-dark',
  name: 'Default Dark',
  description: 'The default dark theme',
  colors: {
    background: '#1a2b4b',
    foreground: '#f8fafc',
    primary: '#0CFFE1',
    secondary: '#2d3748',
    accent: '#0CFFE1',
    muted: '#4a5568',
    border: '#2d3748',
  },
  isDark: true
};

const defaultLightTheme: CustomTheme = {
  id: 'default-light',
  name: 'Default Light',
  description: 'The default light theme',
  colors: {
    background: '#f8fafc',
    foreground: '#1a2b4b',
    primary: '#0CFFE1',
    secondary: '#e2e8f0',
    accent: '#0CFFE1',
    muted: '#cbd5e0',
    border: '#e2e8f0',
  },
  isDark: false
};

const CustomThemeContext = createContext<CustomThemeContextType | undefined>(undefined);

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, setTheme } = useTheme();
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

  // Apply CSS variables when active custom theme changes
  useEffect(() => {
    if (activeCustomThemeId) {
      const activeTheme = customThemes.find(t => t.id === activeCustomThemeId);
      if (activeTheme) {
        applyThemeToDOM(activeTheme);
        // Also update the theme context to match dark/light mode
        setTheme(activeTheme.isDark ? 'dark' : 'light');
      }
    }
  }, [activeCustomThemeId, customThemes, setTheme]);

  const applyThemeToDOM = (theme: CustomTheme) => {
    const root = document.documentElement;
    const colors = theme.colors;

    // Convert hex to hsl for CSS variables
    const hexToHSL = (hex: string) => {
      // Convert hex to rgb
      let r = 0, g = 0, b = 0;
      if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
      } else if (hex.length === 7) {
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
      }

      // Convert rgb to hsl
      r /= 255;
      g /= 255;
      b /= 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }

      h = Math.round(h * 360);
      s = Math.round(s * 100);
      l = Math.round(l * 100);

      return `${h} ${s}% ${l}%`;
    };

    // Apply each color as a CSS variable
    root.style.setProperty('--background', hexToHSL(colors.background));
    root.style.setProperty('--foreground', hexToHSL(colors.foreground));
    root.style.setProperty('--primary', hexToHSL(colors.primary));
    root.style.setProperty('--secondary', hexToHSL(colors.secondary));
    root.style.setProperty('--accent', hexToHSL(colors.accent));
    root.style.setProperty('--muted', hexToHSL(colors.muted));
    root.style.setProperty('--border', hexToHSL(colors.border));
  };

  const addCustomTheme = (theme: Omit<CustomTheme, 'id'>) => {
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
    // Don't allow deleting default themes
    if (id === 'default-dark' || id === 'default-light') {
      toast({
        title: "Cannot Delete Default Theme",
        description: "The default themes cannot be deleted.",
        variant: "destructive",
      });
      return;
    }
    
    // Reset to default theme if the active theme is being deleted
    if (activeCustomThemeId === id) {
      resetToDefaultTheme();
    }
    
    setCustomThemes(prev => prev.filter(theme => theme.id !== id));
    
    toast({
      title: "Theme Deleted",
      description: "Your custom theme has been deleted.",
    });
  };

  const applyCustomTheme = (id: string) => {
    const themeToApply = customThemes.find(t => t.id === id);
    if (themeToApply) {
      setActiveCustomThemeId(id);
      
      toast({
        title: "Theme Applied",
        description: `The "${themeToApply.name}" theme has been applied.`,
      });
    }
  };

  const resetToDefaultTheme = () => {
    setActiveCustomThemeId(null);
    
    // Apply default theme through the theme context
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
    
    toast({
      title: "Default Theme Applied",
      description: "Reset to default theme.",
    });
  };

  return (
    <CustomThemeContext.Provider
      value={{
        customThemes,
        activeCustomThemeId,
        addCustomTheme,
        updateCustomTheme,
        deleteCustomTheme,
        applyCustomTheme,
        resetToDefaultTheme,
      }}
    >
      {children}
    </CustomThemeContext.Provider>
  );
};

export const useCustomTheme = (): CustomThemeContextType => {
  const context = useContext(CustomThemeContext);
  if (!context) {
    throw new Error('useCustomTheme must be used within a CustomThemeProvider');
  }
  return context;
};
