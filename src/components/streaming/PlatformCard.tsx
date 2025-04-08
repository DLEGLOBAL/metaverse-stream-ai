
import React from 'react';
import { ChevronRight, TrendingUp, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface PlatformProps {
  platform: {
    id: number;
    name: string;
    icon: React.ElementType;
    connected: boolean;
    enabled: boolean;
  };
  enabled: boolean;
  onToggle: (id: number) => void;
  onConnect: (id: number) => void;
}

const PlatformCard: React.FC<PlatformProps> = ({ 
  platform, 
  enabled, 
  onToggle, 
  onConnect 
}) => {
  const Icon = platform.icon;
  
  return (
    <div className="p-4 rounded-md border border-gray-700 bg-meta-dark-blue/50">
      <div className="flex items-center">
        <div className={`p-2 rounded-full ${platform.connected ? 'bg-meta-teal/20' : 'bg-gray-700'} mr-3`}>
          <Icon className={`h-5 w-5 ${platform.connected ? 'text-meta-teal' : 'text-gray-400'}`} />
        </div>
        
        <div>
          <p className="font-medium text-white">{platform.name}</p>
          <p className="text-xs text-gray-400">
            {platform.connected ? 'Connected' : 'Not connected'}
          </p>
        </div>
        
        <div className="ml-auto flex items-center space-x-2">
          {platform.connected ? (
            <div className="flex items-center mr-2">
              <span className="text-sm text-gray-300 mr-3">Stream to this platform</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={enabled}
                  onChange={() => onToggle(platform.id)}
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-meta-teal"></div>
              </label>
            </div>
          ) : (
            <Button 
              size="sm" 
              variant="outline"
              className="border-meta-teal/30 hover:bg-meta-teal/10 text-white"
              onClick={() => onConnect(platform.id)}
            >
              Connect
            </Button>
          )}
          {platform.connected && (
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      {platform.connected && enabled && (
        <div className="mt-3 pt-3 border-t border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 text-meta-teal mr-2" />
            <span className="text-sm text-gray-300">Quality: 1080p/60fps</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-meta-teal mr-2" />
            <span className="text-sm text-gray-300">Uptime: 0:00:00</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 text-meta-teal mr-2" />
            <span className="text-sm text-gray-300">Viewers: 0</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatformCard;
