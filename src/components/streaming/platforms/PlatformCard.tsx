
import React from 'react';
import PlatformIcon from './PlatformIcon';
import PlatformInfo from './PlatformInfo';
import PlatformActions from './PlatformActions';
import PlatformStats from './PlatformStats';

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
  return (
    <div className="p-4 rounded-md border border-gray-700 bg-meta-dark-blue/50">
      <div className="flex items-center">
        <PlatformIcon icon={platform.icon} connected={platform.connected} />
        <PlatformInfo name={platform.name} connected={platform.connected} />
        <PlatformActions 
          platformId={platform.id}
          connected={platform.connected}
          enabled={enabled}
          onToggle={onToggle}
          onConnect={onConnect}
        />
      </div>
      
      <PlatformStats connected={platform.connected} enabled={enabled} />
    </div>
  );
};

export default PlatformCard;
