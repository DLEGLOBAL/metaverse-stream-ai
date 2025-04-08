
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import PlatformCard from './PlatformCard';

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
          
          <div className="p-4 rounded-md border border-dashed border-gray-700 bg-transparent">
            <div className="flex items-center justify-center">
              <Button 
                variant="ghost" 
                className="border-meta-teal/30 hover:bg-meta-teal/10 text-white"
              >
                <Globe className="h-4 w-4 mr-2" /> Add Custom RTMP Destination
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformsList;
