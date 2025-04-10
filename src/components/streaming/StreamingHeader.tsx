
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Clock } from 'lucide-react';
import CountdownTimer from '@/components/stream/CountdownTimer';

interface StreamingHeaderProps {
  streamStatus: 'live' | 'offline' | 'recording';
  startStream: () => void;
  stopStream: () => void;
}

const StreamingHeader: React.FC<StreamingHeaderProps> = ({
  streamStatus,
  startStream,
  stopStream
}) => {
  const [startTime, setStartTime] = useState<number>(Date.now());
  
  // Reset timer when stream status changes to active
  useEffect(() => {
    if (streamStatus === 'live' || streamStatus === 'recording') {
      setStartTime(Date.now());
    }
  }, [streamStatus]);
  
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-white dark:text-white">Streaming</h1>
        <p className="text-gray-400 mt-1">Manage your stream destinations and settings</p>
      </div>
      {streamStatus === 'live' ? (
        <div className="flex items-center space-x-3">
          <CountdownTimer 
            isActive={true} 
            startTime={startTime} 
            className="text-sm text-meta-teal bg-meta-teal/10 px-3 py-1 rounded-md" 
          />
          <Button 
            variant="outline" 
            className="border-red-500/30 hover:bg-red-500/10 text-red-400"
            onClick={stopStream}
          >
            Stop Stream
          </Button>
        </div>
      ) : streamStatus === 'recording' ? (
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <div className="h-2 w-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm text-yellow-400">Recording</span>
          </div>
          <CountdownTimer 
            isActive={true} 
            startTime={startTime} 
            className="text-sm text-meta-teal bg-meta-teal/10 px-3 py-1 rounded-md" 
          />
          <Button 
            variant="outline" 
            className="border-red-500/30 hover:bg-red-500/10 text-red-400"
            onClick={stopStream}
          >
            Stop Recording
          </Button>
        </div>
      ) : (
        <Button 
          className="bg-button-gradient text-meta-dark-blue hover:brightness-110"
          onClick={startStream}
        >
          <Play className="h-4 w-4 mr-2" /> Go Live
        </Button>
      )}
    </div>
  );
};

export default StreamingHeader;
