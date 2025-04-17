
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavigationLogoProps {
  collapsed: boolean;
  theme: string;
  toggleSidebar?: () => void;
}

export const NavigationLogo = ({
  collapsed,
  theme,
  toggleSidebar
}: NavigationLogoProps) => {
  return <div className="flex items-center justify-between h-20 px-4">
      <div className={cn("flex items-center overflow-hidden transition-all duration-300", collapsed ? "w-12" : "w-full")}>
        <img 
          src="/lovable-uploads/d9e95c26-442b-4d04-b224-4cf3e84ae483.png" 
          alt="MetaStream Logo" 
          className={cn(
            "transition-all duration-300 object-contain", 
            collapsed ? "h-10 w-10" : "h-16 w-auto",
            "rounded-lg shadow-sm hover:shadow-md",
            theme === 'dark' ? 'brightness-110 contrast-125' : 'brightness-90 contrast-125'
          )} 
        />
        <span className={cn("ml-3 font-bold text-xl whitespace-nowrap transition-opacity duration-200", collapsed ? "opacity-0" : "opacity-100", theme === 'dark' ? 'text-white' : 'text-meta-dark-blue')}></span>
      </div>
      {!collapsed && <Button variant="ghost" size="icon" onClick={toggleSidebar} className={collapsed ? "hidden" : ""}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
          </svg>
        </Button>}
    </div>;
};

export default NavigationLogo;
