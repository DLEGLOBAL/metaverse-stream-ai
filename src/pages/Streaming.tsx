import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
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

const Streaming = () => {
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
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white dark:text-white">Streaming</h1>
            <p className="text-gray-400 mt-1">Manage your stream destinations and settings</p>
          </div>
          {streamStatus === 'live' ? (
            <Button 
              variant="outline" 
              className="border-red-500/30 hover:bg-red-500/10 text-red-400"
              onClick={stopStream}
            >
              Stop Stream
            </Button>
          ) : streamStatus === 'recording' ? (
            <div className="flex items-center">
              <div className="mr-2 flex items-center">
                <div className="h-2 w-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm text-red-400">Recording in progress</span>
              </div>
              <Button 
                variant="outline" 
                className="border-red-500/30 hover:bg-red-500/10 text-red-400"
              >
                Stop Recording
              </Button>
            </div>
          ) : (
            <Button 
              className="bg-button-gradient text-meta-dark-blue hover:brightness-110"
              onClick={startStream}
            >
              <Play className="h-4 w-4 mr-2" /> Go Live
            </Button>
          )}
        </div>
        
        <Tabs defaultValue="platforms" className="w-full">
          <TabsList className="bg-meta-dark-blue border border-gray-700 mb-4">
            <TabsTrigger value="platforms" className="data-[state=active]:bg-meta-teal/10 data-[state=active]:text-meta-teal">Platforms</TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-meta-teal/10 data-[state=active]:text-meta-teal">Schedule</TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-meta-teal/10 data-[state=active]:text-meta-teal">Alerts</TabsTrigger>
            <TabsTrigger value="audio" className="data-[state=active]:bg-meta-teal/10 data-[state=active]:text-meta-teal">Audio</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-meta-teal/10 data-[state=active]:text-meta-teal">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="platforms">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <PlatformsList 
                  platforms={platforms}
                  platformStates={platformStates}
                  onPlatformToggle={handlePlatformToggle}
                  onConnectPlatform={handleConnectPlatform}
                />
              </div>
              
              <div>
                <StreamStatusCard 
                  streamStatus={streamStatus}
                  activeStreamPlatforms={activePlatformsCount}
                  onStartStream={startStream}
                  onStopStream={stopStream}
                />
                <StreamKeyCard />
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
      </div>
    </DashboardLayout>
  );
};

export default Streaming;
