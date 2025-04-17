
import { CustomTheme } from '../customTheme.types';
import { hexToHSL } from './colorUtils';

export const applyThemeToDOM = (theme: CustomTheme) => {
  const root = document.documentElement;
  const colors = theme.colors;

  // Apply each color as a CSS variable
  root.style.setProperty('--background', hexToHSL(colors.background));
  root.style.setProperty('--foreground', hexToHSL(colors.foreground));
  root.style.setProperty('--primary', hexToHSL(colors.primary));
  root.style.setProperty('--secondary', hexToHSL(colors.secondary));
  root.style.setProperty('--accent', hexToHSL(colors.accent));
  root.style.setProperty('--muted', hexToHSL(colors.muted));
  root.style.setProperty('--border', hexToHSL(colors.border));
  
  // Add a data-theme attribute to detect that a custom theme is applied
  root.setAttribute('data-custom-theme', theme.id);
  
  console.log('Theme applied:', theme.name, theme.id);
};

// Function to clear custom theme CSS variables
export const clearCustomTheme = () => {
  const root = document.documentElement;
  
  // Remove the data-theme attribute
  root.removeAttribute('data-custom-theme');
  
  console.log('Custom theme cleared');
};
