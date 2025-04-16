
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
import { Facebook, Twitch, Youtube, TikTok } from 'lucide-react';

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

  // Initialize handlers for different features
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

  // Initialize app data
  useAppInitializer({
    scenes,
    sources,
    setActiveSceneId,
    setIsStreamPreviewAvailable
  });

  // Initialize platform state
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
