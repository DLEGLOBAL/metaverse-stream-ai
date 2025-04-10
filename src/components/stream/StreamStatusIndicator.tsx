
import React from 'react';

interface StreamStatusIndicatorProps {
  streamStatus: 'live' | 'offline' | 'recording';
}

const StreamStatusIndicator: React.FC<StreamStatusIndicatorProps> = ({ streamStatus }) => {
  return (
    <div className="flex items-center">
      {streamStatus === 'live' ? (
        <>
          <div className="h-2 w-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
          <span className="text-xs text-red-500">Live</span>
        </>
      ) : streamStatus === 'recording' ? (
        <>
          <div className="h-2 w-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
          <span className="text-xs text-red-500">Recording</span>
        </>
      ) : (
        <>
          <div className="h-2 w-2 bg-meta-teal rounded-full mr-2 animate-pulse"></div>
          <span className="text-xs text-meta-teal">Offline</span>
        </>
      )}
    </div>
  );
};

export default StreamStatusIndicator;
