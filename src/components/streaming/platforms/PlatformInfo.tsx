
import React from 'react';

interface PlatformInfoProps {
  name: string;
  connected: boolean;
}

const PlatformInfo: React.FC<PlatformInfoProps> = ({ name, connected }) => {
  return (
    <div>
      <p className="font-medium text-white">{name}</p>
      <p className="text-xs text-gray-400">
        {connected ? 'Connected' : 'Not connected'}
      </p>
    </div>
  );
};

export default PlatformInfo;
