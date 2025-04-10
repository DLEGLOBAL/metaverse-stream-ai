
import React, { createContext, useContext } from 'react';
import { useThemeToggle } from './useThemeToggle';
import { Theme, ThemeContextType } from './types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ 
  children: React.ReactNode,
  defaultTheme?: Theme
}> = ({ 
  children, 
  defaultTheme,
}) => {
  const { theme, setTheme, toggleTheme, applyTheme } = useThemeToggle(defaultTheme);

  const themeContextValue: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
    applyTheme,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
