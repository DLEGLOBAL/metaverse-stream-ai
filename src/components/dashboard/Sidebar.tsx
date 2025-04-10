
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, Layers, Radio, Bot, Settings, Video, Users, Network, Headphones, VrHeadset, Home, DollarSign, Palette, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/theme';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

interface NavigationItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const Sidebar = ({ collapsed, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  const navigation: NavigationItem[] = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Layers size={20} />, label: 'Scenes', path: '/dashboard/scenes' },
    { icon: <Camera size={20} />, label: 'Sources', path: '/dashboard/sources' },
    { icon: <Radio size={20} />, label: 'Streaming', path: '/dashboard/streaming' },
    { icon: <Bot size={20} />, label: 'AI Tools', path: '/dashboard/ai-tools' },
    { icon: <Video size={20} />, label: 'Video Editing', path: '/dashboard/video-editing' },
    { icon: <Headphones size={20} />, label: 'Audio', path: '/dashboard/audio' },
    { icon: <VrHeadset size={20} />, label: 'VR Integration', path: '/dashboard/vr' },
    { icon: <Users size={20} />, label: 'Community', path: '/dashboard/community' },
    { icon: <Network size={20} />, label: 'Creator Network', path: '/dashboard/creator-network' },
    { icon: <Palette size={20} />, label: 'Branding', path: '/dashboard/branding' },
    { icon: <BarChart size={20} />, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: <DollarSign size={20} />, label: 'Pricing', path: '/dashboard/pricing' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/dashboard/settings' },
  ];
  
  if (!isMounted) {
    return null; // Prevent hydration issues
  }
  
  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-30 transition-all duration-300 ease-in-out",
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
              src="/placeholder.svg" 
              alt="MetaStream Logo" 
              className="h-8 w-8"
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
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navigation.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg transition-colors",
                    isCurrentPath(item.path) 
                      ? "bg-meta-teal text-meta-dark-blue" 
                      : theme === 'dark'
                        ? "text-gray-300 hover:bg-meta-slate/40 hover:text-white"
                        : "text-gray-700 hover:bg-gray-100",
                    collapsed ? "justify-center" : ""
                  )}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span 
                    className={cn(
                      "ml-3 transition-opacity duration-200",
                      collapsed ? "hidden opacity-0" : "block opacity-100"
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4">
          <div 
            className={cn(
              "p-3 rounded-lg", 
              theme === 'dark' 
                ? "bg-meta-purple/20 border border-meta-purple/20" 
                : "bg-meta-teal/10 border border-meta-teal/20"
            )}
          >
            <div className={cn(
              "flex items-center", 
              collapsed ? "justify-center" : "justify-between"
            )}>
              <span className={cn(
                "flex items-center",
                collapsed ? "hidden" : "flex"
              )}>
                <span className={theme === 'dark' ? "text-meta-purple" : "text-meta-teal"}>
                  {theme === 'dark' ? "Pro" : "Free"}
                </span>
                <span className="bg-gray-300/20 h-4 w-px mx-2"></span>
                <span className={theme === 'dark' ? "text-gray-300" : "text-gray-500"}>
                  2 TB Used
                </span>
              </span>
              <Button 
                size="icon" 
                variant="ghost"
                className={theme === 'dark' ? "text-meta-purple hover:text-white hover:bg-meta-purple/20" : "text-meta-teal hover:text-meta-dark-blue hover:bg-meta-teal/20"}
              >
                <Settings size={collapsed ? 18 : 16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
