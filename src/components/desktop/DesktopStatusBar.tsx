
import React from 'react';
import { useDesktop } from '@/contexts/DesktopContext';
import { Cpu, Database, Activity, Wifi } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { useTheme } from '@/contexts/theme';

interface DesktopStatusBarProps {
  className?: string;
}

const DesktopStatusBar = ({ className = '' }: DesktopStatusBarProps) => {
  const { isDesktop, platform, version } = useDesktop();
  const { streamStatus } = useAppContext();
  const { theme } = useTheme();
  
  if (!isDesktop) {
    return null;
  }
  
  return (
    <div className={`fixed bottom-0 left-0 right-0 h-6 flex items-center justify-between px-2 text-xs ${
      theme === 'dark' ? 'bg-meta-dark-blue/90 border-t border-meta-teal/20' : 'bg-gray-100/90 border-t border-gray-200'
    } z-50 ${className}`}>
      <div className="flex items-center space-x-3">
        <div className="flex items-center">
          <Cpu className="h-3 w-3 mr-1 text-meta-teal" />
          <span>{platform}</span>
        </div>
        
        <div className="flex items-center">
          <Database className="h-3 w-3 mr-1 text-meta-teal" />
          <span>v{version.app}</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        {streamStatus === 'live' && (
          <div className="flex items-center">
            <Activity className="h-3 w-3 mr-1 text-red-500" />
            <span className="text-red-500">LIVE</span>
          </div>
        )}
        
        <div className="flex items-center">
          <Wifi className="h-3 w-3 mr-1 text-meta-teal" />
          <span>Connected</span>
        </div>
      </div>
    </div>
  );
};

export default DesktopStatusBar;
