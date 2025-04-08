
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, MemoryStick, Terminal, Upload } from 'lucide-react';

const StatsPanel = () => {
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
            value="6000 kbps"
            status="good"
          />
          <StatItem 
            icon={<Cpu className="h-4 w-4" />}
            label="CPU Usage"
            value="32%"
            status="good"
          />
          <StatItem 
            icon={<MemoryStick className="h-4 w-4" />}
            label="RAM Usage"
            value="3.2 GB"
            status="good"
          />
          <StatItem 
            icon={<Terminal className="h-4 w-4" />}
            label="GPU Encoding"
            value="NVENC"
            status="good"
          />
        </div>
      </CardContent>
    </Card>
  );
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
