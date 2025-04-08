
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import PlatformCard from './PlatformCard';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

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
          
          <Sheet>
            <SheetTrigger asChild>
              <div className="p-4 rounded-md border border-dashed border-gray-700 bg-transparent cursor-pointer">
                <div className="flex items-center justify-center">
                  <Button 
                    variant="ghost" 
                    className="border-meta-teal/30 hover:bg-meta-teal/10 text-white"
                  >
                    <Globe className="h-4 w-4 mr-2" /> Add Custom RTMP Destination
                  </Button>
                </div>
              </div>
            </SheetTrigger>
            <SheetContent className="bg-meta-dark-blue border-meta-teal/30 text-white">
              <SheetHeader>
                <SheetTitle className="text-white">Add RTMP Destination</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Service Name</label>
                    <input
                      className="w-full bg-meta-slate border border-meta-teal/30 rounded-md py-2 px-3 text-white"
                      placeholder="Custom Service"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">RTMP URL</label>
                    <input
                      className="w-full bg-meta-slate border border-meta-teal/30 rounded-md py-2 px-3 text-white"
                      placeholder="rtmp://your-rtmp-server.com/live"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Stream Key</label>
                    <input
                      className="w-full bg-meta-slate border border-meta-teal/30 rounded-md py-2 px-3 text-white"
                      placeholder="your-stream-key"
                      type="password"
                    />
                  </div>
                  <Button 
                    className="w-full bg-button-gradient text-meta-dark-blue hover:brightness-110 mt-4"
                  >
                    Add Destination
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformsList;
