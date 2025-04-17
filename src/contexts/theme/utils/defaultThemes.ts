
import { CustomTheme } from '../customTheme.types';

export const defaultDarkTheme: CustomTheme = {
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

export const defaultLightTheme: CustomTheme = {
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
