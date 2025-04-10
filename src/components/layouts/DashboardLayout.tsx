
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/theme';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { ScrollArea } from '@/components/ui/scroll-area';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { theme } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [layoutSettings, setLayoutSettings] = useState({
    sidebarWidth: 64,
    contentWidth: 95,
    compactMode: false,
    denseLayout: false,
    fullWidthLayout: true
  });
  
  // Load layout settings from localStorage
  useEffect(() => {
    const savedLayout = localStorage.getItem('metastream-layout');
    if (savedLayout) {
      try {
        const parsedLayout = JSON.parse(savedLayout);
        setLayoutSettings(prev => ({
          ...prev,
          ...parsedLayout
        }));
      } catch (e) {
        console.error('Error parsing layout settings:', e);
      }
    }
  }, []);
  
  // Calculate content class based on settings
  const getContentClass = () => {
    const classes = ['transition-all duration-300'];
    
    // Sidebar width adjustment
    classes.push(sidebarCollapsed ? 'ml-16' : 'ml-64');
    
    // Content width
    if (layoutSettings.fullWidthLayout) {
      classes.push('px-4');
    } else {
      classes.push('px-4 container mx-auto');
    }
    
    // Spacing
    if (layoutSettings.compactMode) {
      classes.push('py-2');
    } else {
      classes.push('py-4');
    }
    
    // Density
    if (layoutSettings.denseLayout) {
      classes.push('space-y-2');
    } else {
      classes.push('space-y-6');
    }
    
    return classes.join(' ');
  };
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-meta-slate dark:bg-meta-dark-blue/90' : 'bg-[#f0f9ff] light:bg-light-gradient'}`}>
      <Sidebar 
        collapsed={sidebarCollapsed} 
        toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <Header sidebarCollapsed={sidebarCollapsed} />
      
      <main className={`pt-20 pb-4 ${getContentClass()} h-[calc(100vh-2rem)] overflow-hidden`}>
        <ScrollArea className="h-full touch-auto">
          <div className="pr-4">
            {children}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default DashboardLayout;
