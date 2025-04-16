
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PlatformsList from '@/components/streaming/PlatformsList';
import StreamSettings from '@/components/streaming/StreamSettings';
import StreamStatusCard from '@/components/streaming/StreamStatusCard';
import StreamKeyManager from '@/components/streaming/StreamKeyManager';
import AudioControls from '@/components/streaming/AudioControls';
import ScheduleStream from '@/components/streaming/ScheduleStream';
import StreamAlerts from '@/components/streaming/StreamAlerts';
import StreamChat from '@/components/streaming/StreamChat';
import StreamStats from '@/components/streaming/StreamStats';
import { useAppContext } from '@/contexts/AppContext';

interface StreamingTabsProps {
  streamStatus: 'live' | 'offline' | 'recording';
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
  activePlatformsCount: number;
  startStream: () => void;
  stopStream: () => void;
}

const StreamingTabs: React.FC<StreamingTabsProps> = ({
  streamStatus,
  platforms,
  platformStates,
  onPlatformToggle,
  onConnectPlatform,
  activePlatformsCount,
  startStream,
  stopStream
}) => {
  const { stats } = useAppContext();

  return (
    <Tabs defaultValue="stream-setup" className="w-full">
      <TabsList className="bg-meta-dark-blue border border-gray-700 mb-4">
        <TabsTrigger value="stream-setup" className="data-[state=active]:bg-meta-teal/10 data-[state=active]:text-meta-teal">Stream Setup</TabsTrigger>
        <TabsTrigger value="platforms" className="data-[state=active]:bg-meta-teal/10 data-[state=active]:text-meta-teal">Platforms</TabsTrigger>
        <TabsTrigger value="schedule" className="data-[state=active]:bg-meta-teal/10 data-[state=active]:text-meta-teal">Schedule</TabsTrigger>
        <TabsTrigger value="alerts" className="data-[state=active]:bg-meta-teal/10 data-[state=active]:text-meta-teal">Alerts</TabsTrigger>
        <TabsTrigger value="chat" className="data-[state=active]:bg-meta-teal/10 data-[state=active]:text-meta-teal">Chat</TabsTrigger>
        <TabsTrigger value="audio" className="data-[state=active]:bg-meta-teal/10 data-[state=active]:text-meta-teal">Audio</TabsTrigger>
        <TabsTrigger value="settings" className="data-[state=active]:bg-meta-teal/10 data-[state=active]:text-meta-teal">Settings</TabsTrigger>
      </TabsList>
      
      <TabsContent value="stream-setup">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StreamKeyManager />
            <StreamStats stats={stats} streamStatus={streamStatus} />
          </div>
          
          <div>
            <StreamStatusCard 
              streamStatus={streamStatus}
              activeStreamPlatforms={activePlatformsCount}
              onStartStream={startStream}
              onStopStream={stopStream}
            />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="platforms">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PlatformsList 
              platforms={platforms}
              platformStates={platformStates}
              onPlatformToggle={onPlatformToggle}
              onConnectPlatform={onConnectPlatform}
            />
          </div>
          
          <div>
            <StreamStatusCard 
              streamStatus={streamStatus}
              activeStreamPlatforms={activePlatformsCount}
              onStartStream={startStream}
              onStopStream={stopStream}
            />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="schedule">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ScheduleStream />
          </div>
          
          <div>
            <StreamStatusCard 
              streamStatus={streamStatus}
              activeStreamPlatforms={activePlatformsCount}
              onStartStream={startStream}
              onStopStream={stopStream}
            />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="alerts">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StreamAlerts />
          </div>
          
          <div>
            <StreamStatusCard 
              streamStatus={streamStatus}
              activeStreamPlatforms={activePlatformsCount}
              onStartStream={startStream}
              onStopStream={stopStream}
            />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="chat">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StreamChat />
          </div>
          
          <div>
            <StreamStatusCard 
              streamStatus={streamStatus}
              activeStreamPlatforms={activePlatformsCount}
              onStartStream={startStream}
              onStopStream={stopStream}
            />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="audio">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AudioControls />
          </div>
          
          <div>
            <StreamStatusCard 
              streamStatus={streamStatus}
              activeStreamPlatforms={activePlatformsCount}
              onStartStream={startStream}
              onStopStream={stopStream}
            />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="settings">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StreamSettings />
          </div>
          
          <div>
            <StreamStatusCard 
              streamStatus={streamStatus}
              activeStreamPlatforms={activePlatformsCount}
              onStartStream={startStream}
              onStopStream={stopStream}
            />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default StreamingTabs;
