
import React from 'react';
import { TrendingUp, Clock, Users, Wifi, Server } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PlatformStatsProps {
  connected: boolean;
  enabled: boolean;
  stats?: {
    quality?: string;
    uptime?: string;
    viewers?: number;
    bitrate?: number;
    health?: number;
  };
}

const PlatformStats: React.FC<PlatformStatsProps> = ({ 
  connected, 
  enabled, 
  stats = {
    quality: '1080p/60fps',
    uptime: '0:00:00',
    viewers: 0,
    bitrate: 6000,
    health: 100
  }
}) => {
  if (!connected || !enabled) {
    return null;
  }

  // Determine the health status color
  const getHealthColor = (health: number) => {
    if (health > 80) return 'bg-green-500';
    if (health > 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="mt-3 pt-3 border-t border-gray-700 space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center">
          <TrendingUp className="h-4 w-4 text-meta-teal mr-2" />
          <span className="text-sm text-gray-300">Quality: {stats.quality}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-meta-teal mr-2" />
          <span className="text-sm text-gray-300">Uptime: {stats.uptime}</span>
        </div>
        <div className="flex items-center">
          <Users className="h-4 w-4 text-meta-teal mr-2" />
          <span className="text-sm text-gray-300">Viewers: {stats.viewers}</span>
        </div>
        <div className="flex items-center">
          <Wifi className="h-4 w-4 text-meta-teal mr-2" />
          <span className="text-sm text-gray-300">Bitrate: {stats.bitrate} kbps</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Server className="h-4 w-4 text-meta-teal mr-2" />
            <span className="text-sm text-gray-300">Stream Health</span>
          </div>
          <span className="text-xs text-gray-400">{stats.health}%</span>
        </div>
        <Progress 
          value={stats.health} 
          className="h-1.5 bg-gray-700" 
          // Use a custom styled indicator via className
          style={{ 
            '--progress-indicator-color': getHealthColor(stats.health || 0)
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
};

export default PlatformStats;
