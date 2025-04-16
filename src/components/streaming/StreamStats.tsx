
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, Activity, HardDrive, Zap, Users, Video } from 'lucide-react';
import { Stats } from '@/contexts/types';

interface StreamStatsProps {
  stats: Stats;
  streamStatus: 'live' | 'offline' | 'recording';
}

const StreamStats: React.FC<StreamStatsProps> = ({ stats, streamStatus }) => {
  // Only show this component when streaming is live
  if (streamStatus !== 'live') return null;

  return (
    <Card className="glass-card mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">Stream Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-3 rounded-md bg-meta-dark-blue border border-meta-teal/20">
            <div className="flex items-center mb-1">
              <Activity className="h-4 w-4 text-meta-teal mr-2" />
              <span className="text-xs text-gray-400">Bitrate</span>
            </div>
            <span className="text-white text-sm font-medium">{stats.bitrate}</span>
          </div>
          
          <div className="p-3 rounded-md bg-meta-dark-blue border border-meta-teal/20">
            <div className="flex items-center mb-1">
              <Cpu className="h-4 w-4 text-meta-teal mr-2" />
              <span className="text-xs text-gray-400">CPU Usage</span>
            </div>
            <span className="text-white text-sm font-medium">{stats.cpuUsage}</span>
          </div>
          
          <div className="p-3 rounded-md bg-meta-dark-blue border border-meta-teal/20">
            <div className="flex items-center mb-1">
              <HardDrive className="h-4 w-4 text-meta-teal mr-2" />
              <span className="text-xs text-gray-400">RAM Usage</span>
            </div>
            <span className="text-white text-sm font-medium">{stats.ramUsage}</span>
          </div>
          
          <div className="p-3 rounded-md bg-meta-dark-blue border border-meta-teal/20">
            <div className="flex items-center mb-1">
              <Video className="h-4 w-4 text-meta-teal mr-2" />
              <span className="text-xs text-gray-400">Resolution</span>
            </div>
            <span className="text-white text-sm font-medium">
              {stats.resolution || '720p'} @ {stats.frameRate || '30fps'}
            </span>
          </div>
          
          <div className="p-3 rounded-md bg-meta-dark-blue border border-meta-teal/20">
            <div className="flex items-center mb-1">
              <Zap className="h-4 w-4 text-meta-teal mr-2" />
              <span className="text-xs text-gray-400">Encoder</span>
            </div>
            <span className="text-white text-sm font-medium">{stats.gpuEncoding}</span>
          </div>
          
          <div className="p-3 rounded-md bg-meta-dark-blue border border-meta-teal/20">
            <div className="flex items-center mb-1">
              <Users className="h-4 w-4 text-meta-teal mr-2" />
              <span className="text-xs text-gray-400">Viewers</span>
            </div>
            <span className="text-white text-sm font-medium">{stats.viewers || '0'}</span>
          </div>
        </div>
        
        {stats.activeDestinations && stats.activeDestinations.length > 0 && (
          <div className="mt-4 p-3 rounded-md bg-meta-dark-blue border border-meta-teal/20">
            <p className="text-xs text-gray-400 mb-1">Active Destinations</p>
            <div className="flex flex-wrap gap-2">
              {stats.activeDestinations.map(platform => (
                <span 
                  key={platform} 
                  className="text-xs font-medium px-2 py-1 rounded-full bg-meta-teal/20 text-meta-teal"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className={`mt-4 p-3 rounded-md border ${
          stats.status === 'good' 
            ? 'bg-green-500/10 border-green-500/30 text-green-400' 
            : stats.status === 'warning'
            ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
            : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
          <p className="font-medium">
            Stream Health: {
              stats.status === 'good' 
                ? 'Excellent' 
                : stats.status === 'warning'
                ? 'Fair - Some issues detected'
                : 'Poor - Stream may be unstable'
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreamStats;
