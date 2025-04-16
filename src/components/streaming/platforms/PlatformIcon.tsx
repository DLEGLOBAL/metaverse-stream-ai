
import React from 'react';

interface PlatformIconProps {
  icon: React.ElementType;
  connected: boolean;
}

const PlatformIcon: React.FC<PlatformIconProps> = ({ icon: Icon, connected }) => {
  return (
    <div className={`p-2 rounded-full ${connected ? 'bg-meta-teal/20' : 'bg-gray-700'} mr-3`}>
      <Icon className={`h-5 w-5 ${connected ? 'text-meta-teal' : 'text-gray-400'}`} />
    </div>
  );
};

export default PlatformIcon;
