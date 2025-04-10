
import React, { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { 
  Scene, Source, AiFeature, Stats, StreamStatus,
  ScheduledStream, AudioSettings, StreamAlert
} from './types';
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
import { activateRealDevice, deactivateRealDevice } from './mediaUtils';

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

  // Implement actual toggle functionality
  const toggleSceneActive = (sceneId: number) => {
    setScenes(prev => prev.map(scene => ({
      ...scene,
      active: scene.id === sceneId
    })));
    setActiveSceneId(sceneId);
    
    toast({
      title: "Scene Changed",
      description: `Switched to ${scenes.find(s => s.id === sceneId)?.name || 'new scene'}`,
    });
  };

  const toggleSourceActive = async (sourceId: number) => {
    const source = sources.find(s => s.id === sourceId);
    if (!source) return;
    
    if (!source.active) {
      // Activating the source
      const success = await activateRealDevice(
        source, 
        setIsStreamPreviewAvailable,
        setSources,
        sources
      );
      
      if (success) {
        setSources(prev => prev.map(s => 
          s.id === sourceId ? { ...s, active: true } : s
        ));
      }
    } else {
      // Deactivating the source
      deactivateRealDevice(sourceId);
      
      setSources(prev => prev.map(s => 
        s.id === sourceId ? { ...s, active: false } : s
      ));
      
      toast({
        title: "Source Deactivated",
        description: `${source.name} has been turned off`,
      });
      
      // Check if we still have any video source active
      const hasActiveVideo = sources.some(s => 
        s.id !== sourceId && s.active && (s.type === 'camera' || s.type === 'display')
      );
      
      if (!hasActiveVideo && (source.type === 'camera' || source.type === 'display')) {
        setIsStreamPreviewAvailable(false);
      }
    }
  };

  const toggleAiFeature = (featureId: number) => {
    setAiFeatures(prev => prev.map(feature => 
      feature.id === featureId 
        ? { ...feature, enabled: !feature.enabled } 
        : feature
    ));
    
    const feature = aiFeatures.find(f => f.id === featureId);
    if (feature) {
      toast({
        title: feature.enabled ? `${feature.name} Disabled` : `${feature.name} Enabled`,
        description: feature.enabled 
          ? `${feature.name} has been turned off` 
          : `${feature.name} is now active`,
      });
    }
  };

  const updateAiFeatureSlider = (featureId: number, value: number) => {
    setAiFeatures(prev => prev.map(feature => 
      feature.id === featureId 
        ? { ...feature, sliderValue: value } 
        : feature
    ));
  };

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

  useEffect(() => {
    try {
      console.log('Initializing app data');
      
      const activeScene = scenes.find(scene => scene.active);
      if (activeScene) {
        setActiveSceneId(activeScene.id);
      }
      
      const hasActiveVideoSource = sources.some(
        source => source.active && (source.type === 'camera' || source.type === 'display')
      );
      setIsStreamPreviewAvailable(hasActiveVideoSource);
      
    } catch (error) {
      console.error('Error initializing app data:', error);
      toast({
        title: 'Error',
        description: 'Failed to initialize application data',
        variant: 'destructive',
      });
    }
  }, [scenes, sources, setActiveSceneId, setIsStreamPreviewAvailable]);

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
          }}
        >
          {children}
        </AppContext.Provider>
      </CustomThemeProvider>
    </ThemeProvider>
  );
};
