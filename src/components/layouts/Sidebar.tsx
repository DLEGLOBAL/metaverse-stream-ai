
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/theme';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Home, Settings, Video, Mic, Radio, Paintbrush, Users, GitBranch, Glasses, LineChart } from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'Scenes', path: '/dashboard/scenes', icon: LineChart },
  { name: 'Sources', path: '/dashboard/sources', icon: Video },
  { name: 'Streaming', path: '/dashboard/streaming', icon: Radio },
  { name: 'AI Tools', path: '/dashboard/ai-tools', icon: GitBranch },
  { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  { name: 'Studio', path: '/dashboard/studio', icon: Video },
  { name: 'Community', path: '/dashboard/community', icon: Users },
  { name: 'Creator Network', path: '/dashboard/creator-network', icon: Users },
  { name: 'VR Integration', path: '/dashboard/vr', icon: Glasses },
  { name: 'Audio', path: '/dashboard/audio', icon: Mic },
  { name: 'Video Editing', path: '/dashboard/video-editing', icon: Video },
  { name: 'Branding', path: '/dashboard/branding', icon: Paintbrush },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();
  const { user } = useAuth();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside className={`fixed inset-y-0 left-0 z-30 transition-all duration-300 ease-in-out ${collapsed ? 'w-16' : 'w-64'} bg-meta-dark-blue border-r border-meta-slate/10`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4 border-b border-meta-slate/10">
          {!collapsed && (
            <img 
              src="/lovable-uploads/d9e95c26-442b-4d04-b224-4cf3e84ae483.png" 
              alt="MetaStream Logo" 
              className="h-16 w-auto rounded-xl shadow-lg hover:shadow-xl brightness-125 contrast-150 transform transition-transform hover:scale-105"
            />
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="text-meta-teal hover:text-white hover:bg-meta-slate/20"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>

        <ScrollArea className="flex-1 py-4">
          <nav className="px-2 space-y-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path || 
                              (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-meta-teal/20 text-meta-teal' 
                      : 'text-gray-300 hover:bg-meta-slate/20 hover:text-white'
                  } ${collapsed ? 'justify-center' : ''}`}
                >
                  <item.icon size={collapsed ? 20 : 18} />
                  {!collapsed && <span className="ml-3">{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        <div className="p-3 border-t border-meta-slate/10">
          <div className={`flex ${collapsed ? 'justify-center' : 'items-center'}`}>
            <div className="w-8 h-8 rounded-full bg-meta-teal/20 flex items-center justify-center text-meta-teal">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            {!collapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user?.email || 'User'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
