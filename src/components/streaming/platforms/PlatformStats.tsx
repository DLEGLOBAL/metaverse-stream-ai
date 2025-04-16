
import React from 'react';
import { TrendingUp, Clock, Users } from 'lucide-react';

interface PlatformStatsProps {
  connected: boolean;
  enabled: boolean;
}

const PlatformStats: React.FC<PlatformStatsProps> = ({ connected, enabled }) => {
  if (!connected || !enabled) {
    return null;
  }

  return (
    <div className="mt-3 pt-3 border-t border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-2">
      <div className="flex items-center">
        <TrendingUp className="h-4 w-4 text-meta-teal mr-2" />
        <span className="text-sm text-gray-300">Quality: 1080p/60fps</span>
      </div>
      <div className="flex items-center">
        <Clock className="h-4 w-4 text-meta-teal mr-2" />
        <span className="text-sm text-gray-300">Uptime: 0:00:00</span>
      </div>
      <div className="flex items-center">
        <Users className="h-4 w-4 text-meta-teal mr-2" />
        <span className="text-sm text-gray-300">Viewers: 0</span>
      </div>
    </div>
  );
};

export default PlatformStats;
