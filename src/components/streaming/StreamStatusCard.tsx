
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Circle, WifiOff, Clock } from 'lucide-react';

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
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  
  // Reset and start timer when stream status changes
  useEffect(() => {
    if (streamStatus !== 'offline') {
      // Reset start time
      setStartTime(Date.now());
      setElapsedTime(0);
      
      // Start interval for counter
      const intervalId = setInterval(() => {
        const currentTime = Date.now();
        const elapsed = Math.floor((currentTime - startTime) / 1000);
        setElapsedTime(elapsed);
      }, 1000);
      
      // Cleanup interval on unmount or when inactive
      return () => clearInterval(intervalId);
    }
  }, [streamStatus]);
  
  // Format seconds to HH:MM:SS
  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');
  };
  
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
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Uptime:</span>
              {streamStatus !== 'offline' ? (
                <span className="text-white flex items-center">
                  <Clock className="h-3 w-3 mr-1 text-meta-teal" />
                  {formatTime(elapsedTime)}
                </span>
              ) : (
                <span className="text-white">--:--:--</span>
              )}
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
