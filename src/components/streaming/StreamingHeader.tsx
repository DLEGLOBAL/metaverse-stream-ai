
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

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
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-white dark:text-white">Streaming</h1>
        <p className="text-gray-400 mt-1">Manage your stream destinations and settings</p>
      </div>
      {streamStatus === 'live' ? (
        <Button 
          variant="outline" 
          className="border-red-500/30 hover:bg-red-500/10 text-red-400"
          onClick={stopStream}
        >
          Stop Stream
        </Button>
      ) : streamStatus === 'recording' ? (
        <div className="flex items-center">
          <div className="mr-2 flex items-center">
            <div className="h-2 w-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm text-red-400">Recording in progress</span>
          </div>
          <Button 
            variant="outline" 
            className="border-red-500/30 hover:bg-red-500/10 text-red-400"
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
