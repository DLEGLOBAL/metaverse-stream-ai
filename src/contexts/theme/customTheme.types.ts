
export interface CustomTheme {
  id: string;
  name: string;
  description?: string;
  colors: ThemeColors;
  isDark: boolean;
}

export interface ThemeColors {
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  accent: string;
  muted: string;
  border: string;
}

export interface CustomThemeContextType {
  customThemes: CustomTheme[];
  activeCustomThemeId: string | null;
  addCustomTheme: (theme: Omit<CustomTheme, 'id'>) => void;
  updateCustomTheme: (id: string, theme: Partial<CustomTheme>) => void;
  deleteCustomTheme: (id: string) => void;
  applyCustomTheme: (id: string) => void;
  resetToDefaultTheme: () => void;
}
