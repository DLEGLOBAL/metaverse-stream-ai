import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { useAppState } from './hooks/useAppState';
import { useSceneHandlers } from './hooks/useSceneHandlers';
import { useSourceHandlers } from './hooks/useSourceHandlers';
import { useAIFeatureHandlers } from './hooks/useAIFeatureHandlers';
import { useStreamHandlers } from './hooks/useStreamHandlers';
import { useRecordingHandlers } from './hooks/useRecordingHandlers';
import { useScheduleHandlers } from './hooks/useScheduleHandlers';
import { useAudioHandlers } from './hooks/useAudioHandlers';
import { useAlertHandlers } from './hooks/useAlertHandlers';
import { AppContext } from './AppContext';
import { ThemeProvider } from './theme/ThemeContext';
import { CustomThemeProvider } from './theme/CustomThemeContext';
import { useAppInitializer } from './hooks/useAppInitializer';
import { Facebook, Twitch, Youtube } from 'lucide-react';

const TikTok = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.69 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.98-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.33 1.08-.3 1.64.02.53.11 1.04.29 1.54.38.97 1.15 1.73 2.1 2.11.1.04.21.07.32.1 1.36.36 2.84.01 3.94-1.1.44-.51.7-1.17.81-1.85.16-1.08.14-2.17.15-3.25.01-2.56 0-5.12.01-7.68-.01-.05 1.96 0 2.95.02z" />
  </svg>
);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    scenes, setScenes,
    sources, setSources,
    aiFeatures, setAiFeatures,
    stats, setStats,
    streamStatus, setStreamStatus,
    activeSceneId, setActiveSceneId,
    isStreamPreviewAvailable, setIsStreamPreviewAvailable,
    scheduledStreams, setScheduledStreams,
    isRecording, setIsRecording,
    audioSettings, setAudioSettings,
    streamAlerts, setStreamAlerts
  } = useAppState();

  const { toggleSceneActive } = useSceneHandlers({ 
    setScenes, 
    setActiveSceneId 
  });

  const { toggleSourceActive } = useSourceHandlers({ 
    sources, 
    setSources, 
    setIsStreamPreviewAvailable 
  });

  const { toggleAiFeature, updateAiFeatureSlider } = useAIFeatureHandlers({ 
    setAiFeatures 
  });

  const { startStream, stopStream, testStream } = useStreamHandlers({
    isStreamPreviewAvailable,
    streamStatus,
    setStreamStatus,
    setStats,
    sources
  });

  const { startRecording, stopRecording } = useRecordingHandlers({
    setStreamStatus,
    setIsRecording
  });

  const { scheduleStream, deleteScheduledStream } = useScheduleHandlers({
    scheduledStreams,
    setScheduledStreams
  });

  const { updateAudioSettings } = useAudioHandlers({
    audioSettings,
    setAudioSettings
  });

  const { toggleStreamAlert, updateStreamAlert } = useAlertHandlers({
    setStreamAlerts
  });

  useAppInitializer({
    scenes,
    sources,
    setActiveSceneId,
    setIsStreamPreviewAvailable
  });

  const [isRelayServerAvailable, setRelayServerAvailable] = useState(false);
  
  const platforms = [
    { id: 1, name: 'Twitch', icon: Twitch, connected: false, enabled: false },
    { id: 2, name: 'YouTube', icon: Youtube, connected: false, enabled: false },
    { id: 3, name: 'Facebook', icon: Facebook, connected: false, enabled: false },
    { id: 4, name: 'TikTok', icon: TikTok, connected: false, enabled: false }
  ];
  
  const [platformStates, setPlatformStates] = useState<Record<number, boolean>>({});
  
  const onPlatformToggle = (id: number) => {
    setPlatformStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const onConnectPlatform = (id: number) => {
    const platform = platforms.find(p => p.id === id);
    if (platform) {
      toast({
        title: `Connect to ${platform.name}`,
        description: `This would open a ${platform.name} authentication window.`
      });
    }
  };
  
  const getActivePlatformsCount = () => {
    return Object.values(platformStates).filter(Boolean).length;
  };

  return (
    <ThemeProvider>
      <CustomThemeProvider>
        <AppContext.Provider
          value={{
            scenes,
            sources,
            aiFeatures,
            stats,
            streamStatus,
            activeSceneId,
            isStreamPreviewAvailable,
            scheduledStreams,
            isRecording,
            audioSettings,
            streamAlerts,
            setScenes,
            setSources,
            setAiFeatures,
            setStats,
            setStreamStatus,
            setStreamAlerts,
            toggleSceneActive,
            toggleSourceActive,
            toggleAiFeature,
            updateAiFeatureSlider,
            startStream,
            stopStream,
            testStream,
            startRecording,
            stopRecording,
            scheduleStream,
            deleteScheduledStream,
            updateAudioSettings,
            toggleStreamAlert,
            updateStreamAlert,
            isRelayServerAvailable,
            setRelayServerAvailable,
            platforms,
            platformStates,
            onPlatformToggle,
            onConnectPlatform,
            getActivePlatformsCount
          }}
        >
          {children}
        </AppContext.Provider>
      </CustomThemeProvider>
    </ThemeProvider>
  );
};
