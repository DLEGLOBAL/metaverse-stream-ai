
import React, { useState } from 'react';
import { Video, Youtube, Twitch } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import StreamingHeader from '@/components/streaming/StreamingHeader';
import StreamingTabs from '@/components/streaming/StreamingTabs';

const StreamingContent = () => {
  const { streamStatus, startStream, stopStream } = useAppContext();
  
  // Define platform configurations
  const platforms = [
    { id: 1, name: 'YouTube', icon: Youtube, connected: true, enabled: true },
    { id: 2, name: 'Twitch', icon: Twitch, connected: true, enabled: true },
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
  };
  
  const handleConnectPlatform = (id: number) => {
    // This would connect to the actual streaming platform
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
