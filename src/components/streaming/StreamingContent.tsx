
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { Youtube, Twitch, Facebook, X, Video } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PlatformsList from '@/components/streaming/PlatformsList';
import StreamSettings from '@/components/streaming/StreamSettings';
import StreamStatusCard from '@/components/streaming/StreamStatusCard';
import StreamKeyCard from '@/components/streaming/StreamKeyCard';
import AudioControls from '@/components/streaming/AudioControls';
import ScheduleStream from '@/components/streaming/ScheduleStream';
import StreamAlerts from '@/components/streaming/StreamAlerts';
import StreamChat from '@/components/streaming/StreamChat';
import StreamingHeader from '@/components/streaming/StreamingHeader';
import StreamingTabs from '@/components/streaming/StreamingTabs';

const StreamingContent = () => {
  const { streamStatus, startStream, stopStream, isRecording } = useAppContext();
  
  const platforms = [
    { id: 1, name: 'YouTube', icon: Youtube, connected: true, enabled: true },
    { id: 2, name: 'Twitch', icon: Twitch, connected: true, enabled: true },
    { id: 3, name: 'Facebook', icon: Facebook, connected: false, enabled: false },
    { id: 4, name: 'X', icon: X, connected: false, enabled: false },
    { id: 5, name: 'TikTok', icon: Video, connected: true, enabled: true },
  ];
  
  const [platformStates, setPlatformStates] = useState(
    platforms.reduce((acc, platform) => {
      acc[platform.id] = platform.enabled;
      return acc;
    }, {} as Record<number, boolean>)
  );
  
  const handlePlatformToggle = (id: number) => {
    setPlatformStates(prev => ({ 
      ...prev, 
      [id]: !prev[id] 
    }));
    
    const platform = platforms.find(p => p.id === id);
    if (platform) {
      if (!platform.connected) {
        toast({
          title: "Platform Not Connected",
          description: `Please connect your ${platform.name} account first.`,
          variant: "destructive",
        });
        setPlatformStates(prev => ({ ...prev, [id]: false }));
        return;
      }
      
      toast({
        title: platformStates[id] ? `${platform.name} Disabled` : `${platform.name} Enabled`,
        description: platformStates[id] 
          ? `Streams will no longer be sent to ${platform.name}` 
          : `Streams will now be sent to ${platform.name}`,
      });
    }
  };
  
  const handleConnectPlatform = (id: number) => {
    const platform = platforms.find(p => p.id === id);
    if (platform) {
      toast({
        title: "Coming Soon",
        description: `${platform.name} connection will be available in the next update.`,
      });
    }
  };

  const activePlatformsCount = Object.values(platformStates).filter(Boolean).length;

  return (
    <div className="flex flex-col gap-6">
      <StreamingHeader 
        streamStatus={streamStatus} 
        startStream={startStream} 
        stopStream={stopStream} 
      />
      
      <StreamingTabs 
        streamStatus={streamStatus}
        platforms={platforms}
        platformStates={platformStates}
        onPlatformToggle={handlePlatformToggle}
        onConnectPlatform={handleConnectPlatform}
        activePlatformsCount={activePlatformsCount}
        startStream={startStream}
        stopStream={stopStream}
      />
    </div>
  );
};

export default StreamingContent;
