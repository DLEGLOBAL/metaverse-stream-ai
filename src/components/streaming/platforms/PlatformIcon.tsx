
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface PlatformIconProps {
  icon: React.ElementType;
  connected: boolean;
  name: string;
}

const PlatformIcon: React.FC<PlatformIconProps> = ({ icon: Icon, connected, name }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`p-3 rounded-full ${connected ? 'bg-meta-teal/20' : 'bg-gray-700'} mr-3`}>
            <Icon className={`h-6 w-6 ${connected ? 'text-meta-teal' : 'text-gray-400'}`} />
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{name} {connected ? '(Connected)' : '(Not Connected)'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PlatformIcon;
