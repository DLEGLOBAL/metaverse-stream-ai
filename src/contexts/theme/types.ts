
export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  ThemeToggle: React.FC;
  setTheme: (theme: Theme) => void;
  applyTheme: (theme: Theme) => void;
}
