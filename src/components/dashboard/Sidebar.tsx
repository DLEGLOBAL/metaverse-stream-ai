
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/theme';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getNavigationItems } from './navigation/navigationData';
import { NavigationItem } from './navigation/NavigationItem';
import { StatusIndicator } from './navigation/StatusIndicator';
import { NavigationLogo } from './navigation/NavigationLogo';

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
    // Check if the current path starts with the navigation item path
    // This ensures that sub-routes also highlight the parent menu item
    return location.pathname === path || 
           (path !== '/dashboard' && location.pathname.startsWith(path));
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
        <NavigationLogo 
          collapsed={collapsed} 
          theme={theme}
          toggleSidebar={toggleSidebar}
        />
        
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
