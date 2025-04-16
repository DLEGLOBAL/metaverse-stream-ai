
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface PlatformInfoProps {
  name: string;
  connected: boolean;
}

const PlatformInfo: React.FC<PlatformInfoProps> = ({ name, connected }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <p className="font-medium text-white">{name}</p>
        {connected ? (
          <Badge variant="outline" className="ml-2 bg-green-500/20 text-green-400 border-green-500/30">
            Connected
          </Badge>
        ) : (
          <Badge variant="outline" className="ml-2 bg-gray-700 text-gray-400 border-gray-600">
            Not connected
          </Badge>
        )}
      </div>
      <p className="text-xs text-gray-400 mt-1">
        {connected ? 'Ready to stream' : 'Configure in settings'}
      </p>
    </div>
  );
};

export default PlatformInfo;
