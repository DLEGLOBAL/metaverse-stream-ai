
import React, { useState } from 'react';
import { Facebook, Twitch, Youtube, MessageSquare } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import StreamStatusCard from './StreamStatusCard';
import ScheduleStream from './ScheduleStream';
import StreamKeyManager from './StreamKeyManager';
import PlatformsList from './platforms/PlatformsList';
import StreamStats from './StreamStats';
import ServerRelayInfo from './ServerRelayInfo';
import StreamAlerts from './StreamAlerts';
import StreamChat from './StreamChat';
import AddCustomRTMP from './platforms/AddCustomRTMP';
import AdvancedStreamingDocs from './platforms/AdvancedStreamingDocs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const StreamingContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState("keys");
  const { stats, streamStatus, isRelayServerAvailable, startStream, stopStream } = useAppContext();
  
  const [platformStates, setPlatformStates] = useState<Record<number, boolean>>({
    1: true,  // Twitch
    2: true,  // YouTube
    3: false, // Facebook
    4: false, // TikTok
  });
  
  const [platforms] = useState([
    {
      id: 1,
      name: 'Twitch',
      icon: Twitch,
      connected: true,
      enabled: true,
    },
    {
      id: 2,
      name: 'YouTube',
      icon: Youtube,
      connected: true,
      enabled: true,
    },
    {
      id: 3,
      name: 'Facebook',
      icon: Facebook,
      connected: false,
      enabled: false,
    },
    {
      id: 4,
      name: 'TikTok',
      icon: MessageSquare,
      connected: false,
      enabled: false,
    },
  ]);
  
  const handlePlatformToggle = (id: number) => {
    setPlatformStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const handleConnectPlatform = (id: number) => {
    // This would typically open an OAuth flow
    console.log(`Connect to platform with ID: ${id}`);
  };

  // Calculate active platform count for StreamStatusCard
  const getActivePlatformCount = (): number => {
    return Object.values(platformStates).filter(Boolean).length;
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
      <div className="md:col-span-2 space-y-4">
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="keys">Stream Keys</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="keys" className="space-y-4">
            <StreamKeyManager />
            {isRelayServerAvailable ? (
              <ServerRelayInfo />
            ) : (
              <StreamAlerts />
            )}
          </TabsContent>
          
          <TabsContent value="platforms" className="space-y-4">
            <PlatformsList
              platforms={platforms}
              platformStates={platformStates}
              onPlatformToggle={handlePlatformToggle}
              onConnectPlatform={handleConnectPlatform}
            />
            <AddCustomRTMP />
          </TabsContent>
          
          <TabsContent value="schedule" className="space-y-4">
            <ScheduleStream />
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4">
            <AdvancedStreamingDocs />
          </TabsContent>
        </Tabs>
      </div>
      <div className="space-y-4">
        <StreamStatusCard 
          streamStatus={streamStatus} 
          activeStreamPlatforms={getActivePlatformCount()}
          onStartStream={startStream}
          onStopStream={stopStream}
        />
        <StreamStats stats={stats} streamStatus={streamStatus} />
        <StreamChat />
      </div>
    </div>
  );
};

export default StreamingContent;
