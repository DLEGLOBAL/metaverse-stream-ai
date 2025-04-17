
import React, { createContext, useContext, useEffect } from 'react';
import { CustomTheme, CustomThemeContextType } from './customTheme.types';
import { useTheme } from './ThemeContext';
import { useCustomThemeState } from './hooks/useCustomThemeState';
import { applyThemeToDOM, clearCustomTheme } from './utils/themeApplier';
import { toast } from "@/hooks/use-toast";

const CustomThemeContext = createContext<CustomThemeContextType | undefined>(undefined);

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, setTheme } = useTheme();
  const {
    customThemes,
    activeCustomThemeId,
    setActiveCustomThemeId,
    addCustomTheme,
    updateCustomTheme,
    deleteCustomTheme,
  } = useCustomThemeState();

  // Apply CSS variables when active custom theme changes
  useEffect(() => {
    if (activeCustomThemeId) {
      const activeTheme = customThemes.find(t => t.id === activeCustomThemeId);
      if (activeTheme) {
        console.log('Applying custom theme:', activeTheme.name);
        applyThemeToDOM(activeTheme);
        // Update the theme context to match dark/light mode
        setTheme(activeTheme.isDark ? 'dark' : 'light');
      }
    } else {
      console.log('No active custom theme, reverting to default theme system');
      clearCustomTheme();
      // Let the default theme system take over
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, [activeCustomThemeId, customThemes, setTheme]);

  const applyCustomTheme = (id: string) => {
    const themeToApply = customThemes.find(t => t.id === id);
    if (themeToApply) {
      console.log('User requested to apply theme:', themeToApply.name);
      setActiveCustomThemeId(id);
      
      toast({
        title: "Theme Applied",
        description: `The "${themeToApply.name}" theme has been applied.`,
      });
    }
  };

  const resetToDefaultTheme = () => {
    console.log('Resetting to default theme');
    setActiveCustomThemeId(null);
    clearCustomTheme();
    
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
