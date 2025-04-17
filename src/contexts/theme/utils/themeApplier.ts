
import { CustomTheme } from '../customTheme.types';
import { hexToHSL } from './colorUtils';

export const applyThemeToDOM = (theme: CustomTheme) => {
  const root = document.documentElement;
  const colors = theme.colors;

  // Apply each color as CSS variables with fallback values
  root.style.setProperty('--background', hexToHSL(colors.background) || '#1a2b4b');
  root.style.setProperty('--foreground', hexToHSL(colors.foreground) || '#f8fafc');
  root.style.setProperty('--primary', hexToHSL(colors.primary) || '#0CFFE1');
  root.style.setProperty('--secondary', hexToHSL(colors.secondary) || '#2d3748');
  root.style.setProperty('--accent', hexToHSL(colors.accent) || '#0CFFE1');
  root.style.setProperty('--muted', hexToHSL(colors.muted) || '#4a5568');
  root.style.setProperty('--border', hexToHSL(colors.border) || '#2d3748');

  // Add data attributes to detect theme changes
  root.setAttribute('data-custom-theme', theme.id);
  root.setAttribute('data-theme-mode', theme.isDark ? 'dark' : 'light');
  
  console.log('Theme applied:', theme.name, theme.id, 'isDark:', theme.isDark);
};

export const clearCustomTheme = () => {
  const root = document.documentElement;
  
  // Remove theme-related attributes
  root.removeAttribute('data-custom-theme');
  root.removeAttribute('data-theme-mode');
  
  // Reset CSS variables to their default values
  root.style.removeProperty('--background');
  root.style.removeProperty('--foreground');
  root.style.removeProperty('--primary');
  root.style.removeProperty('--secondary');
  root.style.removeProperty('--accent');
  root.style.removeProperty('--muted');
  root.style.removeProperty('--border');
  
  console.log('Custom theme cleared');
};
