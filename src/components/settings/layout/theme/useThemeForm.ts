
import { useForm } from 'react-hook-form';

const defaultValues = {
  name: '',
  description: '',
  isDark: true,
  background: '#1a2b4b',
  foreground: '#f8fafc',
  primary: '#0CFFE1',
  secondary: '#2d3748',
  accent: '#0CFFE1',
  muted: '#4a5568',
  border: '#2d3748',
};

export const useThemeForm = () => {
  return useForm({ defaultValues });
};
