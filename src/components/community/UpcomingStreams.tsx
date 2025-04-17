
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useDesktop } from '@/contexts/DesktopContext';

interface UpcomingStreamsProps {
  className?: string;
}

const UpcomingStreams = ({ className = '' }: UpcomingStreamsProps) => {
  const { isDesktop } = useDesktop();
  
  return (
    <Card className={`glass-card ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-white">Upcoming Streams</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <Video className="h-12 w-12 mb-2 opacity-20" />
          <p>No upcoming streams</p>
        </div>
        
        <Button 
          className="w-full mt-3 bg-button-gradient text-meta-dark-blue hover:brightness-110"
          onClick={() => {
            toast({
              title: "Coming Soon",
              description: isDesktop ? 
                "Schedule management will be available in the next desktop update." : 
                "Schedule management will be available in the next update.",
            });
          }}
        >
          <Plus className="h-4 w-4 mr-2" /> Schedule New Stream
        </Button>
      </CardContent>
    </Card>
  );
};

export default UpcomingStreams;
