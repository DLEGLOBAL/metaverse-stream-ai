
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Circle, WifiOff } from 'lucide-react';

interface StreamStatusCardProps {
  streamStatus: 'live' | 'offline' | 'recording';
  activeStreamPlatforms: number;
  onStartStream: () => void;
  onStopStream: () => void;
}

const StreamStatusCard: React.FC<StreamStatusCardProps> = ({
  streamStatus,
  activeStreamPlatforms,
  onStartStream,
  onStopStream
}) => {
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">Stream Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-meta-dark-blue p-4 rounded-md border border-meta-teal/20">
          <div className="flex items-center mb-3">
            {streamStatus === 'live' ? (
              <>
                <div className="h-3 w-3 rounded-full mr-2 bg-red-500 animate-pulse"></div>
                <span className="text-white font-medium uppercase">LIVE</span>
              </>
            ) : streamStatus === 'recording' ? (
              <>
                <Circle className="h-4 w-4 mr-2 text-yellow-500 fill-yellow-500 animate-pulse" />
                <span className="text-white font-medium uppercase">RECORDING</span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4 mr-2 text-meta-teal" />
                <span className="text-white font-medium uppercase">OFFLINE</span>
              </>
            )}
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Uptime:</span>
              <span className="text-white">
                {streamStatus !== 'offline' ? '00:00:00' : '--:--:--'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Active Platforms:</span>
              <span className="text-white">
                {activeStreamPlatforms}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Viewers:</span>
              <span className="text-white">0</span>
            </div>
          </div>
          
          <div className="mt-4">
            {streamStatus !== 'offline' ? (
              <Button 
                variant="outline" 
                className="w-full border-red-500/30 hover:bg-red-500/10 text-red-400"
                onClick={onStopStream}
              >
                {streamStatus === 'live' ? 'End Stream' : 'Stop Recording'}
              </Button>
            ) : (
              <Button 
                className="w-full bg-button-gradient text-meta-dark-blue hover:brightness-110"
                onClick={onStartStream}
              >
                <Play className="h-4 w-4 mr-2" /> Start Streaming
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreamStatusCard;
