
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ThemeToggleProps {
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  showLabels = false, 
  size = 'md',
  className = ''
}) => {
  const { theme, toggleTheme } = useTheme();
  
  const iconSize = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }[size];
  
  const iconClasses = {
    light: `${iconSize} text-yellow-400`,
    dark: `${iconSize} text-meta-teal`
  };
  
  return (
    <TooltipProvider>
      <div className={`flex items-center space-x-2 ${className}`}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Sun className={theme === 'light' ? iconClasses.light : `${iconSize} text-gray-500`} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Light mode</p>
          </TooltipContent>
        </Tooltip>
        
        {showLabels && <span className="text-sm">Light</span>}
        
        <Switch 
          checked={theme === 'dark'}
          onCheckedChange={toggleTheme}
          className={`${
            theme === 'dark' 
              ? 'bg-meta-teal/80' 
              : 'bg-yellow-400/80'
          }`}
        />
        
        {showLabels && <span className="text-sm">Dark</span>}
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Moon className={theme === 'dark' ? iconClasses.dark : `${iconSize} text-gray-500`} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Dark mode</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
