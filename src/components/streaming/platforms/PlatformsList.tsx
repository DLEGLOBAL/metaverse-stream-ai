
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PlatformCard from './PlatformCard';
import AddCustomRTMP from './AddCustomRTMP';

interface PlatformsListProps {
  platforms: {
    id: number;
    name: string;
    icon: React.ElementType;
    connected: boolean;
    enabled: boolean;
  }[];
  platformStates: Record<number, boolean>;
  onPlatformToggle: (id: number) => void;
  onConnectPlatform: (id: number) => void;
}

const PlatformsList: React.FC<PlatformsListProps> = ({
  platforms,
  platformStates,
  onPlatformToggle,
  onConnectPlatform
}) => {
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">Platforms</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {platforms.map((platform) => (
            <PlatformCard
              key={platform.id}
              platform={platform}
              enabled={platformStates[platform.id]}
              onToggle={onPlatformToggle}
              onConnect={onConnectPlatform}
            />
          ))}
          
          <AddCustomRTMP />
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformsList;
