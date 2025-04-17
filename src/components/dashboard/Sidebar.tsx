
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/theme';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getNavigationItems } from './navigation/navigationData';
import { NavigationItem } from './navigation/NavigationItem';
import { StatusIndicator } from './navigation/StatusIndicator';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ collapsed, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  if (!isMounted) {
    return null; // Prevent hydration issues
  }
  
  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };
  
  const navigationItems = getNavigationItems();
  
  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-30 transition-all duration-300 ease-in-out overflow-hidden",
        collapsed ? "w-16" : "w-64",
        theme === 'dark' ? 
          'bg-meta-dark-blue border-r border-meta-slate/10' : 
          'bg-white/95 border-r border-gray-200/80 shadow-sm'
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-20 px-4">
          <div className={cn(
            "flex items-center overflow-hidden transition-all duration-300", 
            collapsed ? "w-8" : "w-full"
          )}>
            <img 
              src="/lovable-uploads/d9e95c26-442b-4d04-b224-4cf3e84ae483.png" 
              alt="MetaStream Logo" 
              className="h-8 w-auto"
            />
            <span className={cn(
              "ml-2 font-bold text-lg whitespace-nowrap transition-opacity duration-200",
              collapsed ? "opacity-0" : "opacity-100",
              theme === 'dark' ? 'text-white' : 'text-meta-dark-blue'
            )}>
              MetaStream
            </span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className={collapsed ? "hidden" : ""}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </Button>
        </div>
        
        <nav className="flex-1 overflow-hidden py-4">
          <ScrollArea className="h-full px-2 touch-auto">
            <ul className="space-y-1">
              {navigationItems.map((item) => (
                <NavigationItem 
                  key={item.path}
                  item={item}
                  isCurrentPath={isCurrentPath(item.path)}
                  collapsed={collapsed}
                  theme={theme}
                />
              ))}
            </ul>
          </ScrollArea>
        </nav>
        
        <StatusIndicator collapsed={collapsed} theme={theme} />
      </div>
    </aside>
  );
};

export default Sidebar;
