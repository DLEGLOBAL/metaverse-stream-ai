
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Headset,
  Home,
  Layers,
  LayoutGrid,
  Mic,
  Settings,
  Share2,
  Star,
  Users
} from 'lucide-react';

type SidebarProps = {
  collapsed: boolean;
  toggleSidebar: () => void;
};

const Sidebar = ({ collapsed, toggleSidebar }: SidebarProps) => {
  const iconSize = 20;
  const location = useLocation();
  
  return (
    <div className={`${collapsed ? 'w-16' : 'w-64'} h-screen bg-sidebar fixed left-0 top-0 transition-all duration-300 border-r border-sidebar-border flex flex-col z-50`}>
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center">
            <span className="text-xl font-bold text-meta-teal">Meta</span>
            <span className="text-xl font-bold text-white">Stream</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="ml-auto text-sidebar-foreground hover:text-meta-teal hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>
      
      <div className="p-2 flex-1 overflow-y-auto">
        <nav className="space-y-1">
          <SidebarItem 
            icon={<Home size={iconSize} />} 
            label="Dashboard" 
            to="/dashboard" 
            collapsed={collapsed} 
            active={location.pathname === '/dashboard'} 
          />
          <SidebarItem 
            icon={<Camera size={iconSize} />} 
            label="Live Studio" 
            to="/dashboard/studio" 
            collapsed={collapsed} 
            active={location.pathname === '/dashboard/studio'} 
          />
          <SidebarItem 
            icon={<Layers size={iconSize} />} 
            label="Scenes" 
            to="/dashboard/scenes" 
            collapsed={collapsed} 
            active={location.pathname === '/dashboard/scenes'} 
          />
          <SidebarItem 
            icon={<Mic size={iconSize} />} 
            label="Audio Mixer" 
            to="/dashboard/audio" 
            collapsed={collapsed} 
            active={location.pathname === '/dashboard/audio'} 
          />
          <SidebarItem 
            icon={<LayoutGrid size={iconSize} />} 
            label="Sources" 
            to="/dashboard/sources" 
            collapsed={collapsed}
            active={location.pathname === '/dashboard/sources'} 
          />
          <SidebarItem 
            icon={<Cpu size={iconSize} />} 
            label="AI Tools" 
            to="/dashboard/ai-tools" 
            collapsed={collapsed} 
            active={location.pathname === '/dashboard/ai-tools'} 
          />
          <SidebarItem 
            icon={<Headset size={iconSize} />} 
            label="VR Integration" 
            to="/dashboard/vr" 
            collapsed={collapsed} 
            active={location.pathname === '/dashboard/vr'} 
          />
          <SidebarItem 
            icon={<Share2 size={iconSize} />} 
            label="Streaming" 
            to="/dashboard/streaming" 
            collapsed={collapsed} 
            active={location.pathname === '/dashboard/streaming'} 
          />
          <SidebarItem 
            icon={<Users size={iconSize} />} 
            label="Community" 
            to="/dashboard/community" 
            collapsed={collapsed} 
            active={location.pathname === '/dashboard/community'} 
          />
          <SidebarItem 
            icon={<Star size={iconSize} />} 
            label="Creator Network" 
            to="/dashboard/creator-network" 
            collapsed={collapsed} 
            active={location.pathname === '/dashboard/creator-network'} 
          />
        </nav>
      </div>
      
      <div className="p-2 border-t border-sidebar-border">
        <SidebarItem 
          icon={<Settings size={iconSize} />} 
          label="Settings" 
          to="/dashboard/settings" 
          collapsed={collapsed} 
          active={location.pathname === '/dashboard/settings'} 
        />
      </div>
    </div>
  );
};

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
  collapsed: boolean;
  active: boolean;
};

const SidebarItem = ({ icon, label, to, collapsed, active }: SidebarItemProps) => {
  return (
    <Link 
      to={to} 
      className={`flex items-center p-2 rounded-md transition-colors group relative
        ${active 
          ? 'bg-sidebar-accent text-meta-teal' 
          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-meta-teal'
        }`}
    >
      <span className="flex items-center justify-center w-6 h-6">{icon}</span>
      {!collapsed && <span className="ml-3 truncate">{label}</span>}
      {collapsed && (
        <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-meta-dark-blue text-white text-sm invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-50">
          {label}
        </div>
      )}
    </Link>
  );
};

export default Sidebar;
