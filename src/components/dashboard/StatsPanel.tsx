
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, MemoryStick, Terminal, Upload } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

const StatsPanel = () => {
  const { stats, streamStatus } = useAppContext();
  
  return (
    <Card className="h-full glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">System Stats</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-4">
          <StatItem 
            icon={<Upload className="h-4 w-4" />}
            label="Bitrate"
            value={stats.bitrate}
            status={stats.status}
          />
          <StatItem 
            icon={<Cpu className="h-4 w-4" />}
            label="CPU Usage"
            value={stats.cpuUsage}
            status={stats.status}
          />
          <StatItem 
            icon={<MemoryStick className="h-4 w-4" />}
            label="RAM Usage"
            value={stats.ramUsage}
            status={stats.status}
          />
          <StatItem 
            icon={<Terminal className="h-4 w-4" />}
            label="GPU Encoding"
            value={stats.gpuEncoding}
            status={stats.status}
          />
          
          {streamStatus === 'live' && (
            <div className="mt-4 pt-2 border-t border-meta-teal/20">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-meta-teal animate-pulse rounded-full mr-2"></div>
                <span className="text-meta-teal text-sm">Live: {formatUptime()}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to format uptime (for demo purposes, just shows a random uptime)
const formatUptime = () => {
  const minutes = Math.floor(Math.random() * 60);
  const seconds = Math.floor(Math.random() * 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

type StatItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  status: 'good' | 'warning' | 'error';
};

const StatItem = ({ icon, label, value, status }: StatItemProps) => {
  const statusColors = {
    good: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="text-meta-teal mr-2">{icon}</div>
        <span className="text-gray-300">{label}</span>
      </div>
      <div className="flex items-center">
        <span className="text-white mr-2">{value}</span>
        <div className={`h-2 w-2 rounded-full ${statusColors[status]}`}></div>
      </div>
    </div>
  );
};

export default StatsPanel;
