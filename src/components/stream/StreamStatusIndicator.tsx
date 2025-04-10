
import React from 'react';
import { Circle, Radio, WifiOff } from 'lucide-react';

interface StreamStatusIndicatorProps {
  streamStatus: 'live' | 'offline' | 'recording';
}

const StreamStatusIndicator: React.FC<StreamStatusIndicatorProps> = ({ streamStatus }) => {
  return (
    <div className="flex items-center">
      {streamStatus === 'live' ? (
        <>
          <div className="h-2 w-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
          <span className="text-xs font-semibold text-red-500 uppercase">Live</span>
        </>
      ) : streamStatus === 'recording' ? (
        <>
          <div className="flex items-center justify-center mr-2 text-yellow-500 animate-pulse">
            <Circle className="h-3 w-3 fill-yellow-500" />
          </div>
          <span className="text-xs font-semibold text-yellow-500 uppercase">Recording</span>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center mr-2 text-meta-teal">
            <WifiOff className="h-3 w-3" />
          </div>
          <span className="text-xs font-semibold text-meta-teal uppercase">Offline</span>
        </>
      )}
    </div>
  );
};

export default StreamStatusIndicator;
