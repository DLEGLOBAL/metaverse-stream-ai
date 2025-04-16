
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface PlatformActionsProps {
  platformId: number;
  connected: boolean;
  enabled: boolean;
  onToggle: (id: number) => void;
  onConnect: (id: number) => void;
}

const PlatformActions: React.FC<PlatformActionsProps> = ({
  platformId,
  connected,
  enabled,
  onToggle,
  onConnect,
}) => {
  return (
    <div className="ml-auto flex items-center space-x-2">
      {connected ? (
        <div className="flex items-center mr-2">
          <span className="text-sm text-gray-300 mr-3">Stream to this platform</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={enabled}
              onChange={() => onToggle(platformId)}
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-meta-teal"></div>
          </label>
        </div>
      ) : (
        <Button 
          size="sm" 
          variant="outline"
          className="border-meta-teal/30 hover:bg-meta-teal/10 text-white"
          onClick={() => onConnect(platformId)}
        >
          Connect
        </Button>
      )}
      {connected && (
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default PlatformActions;
