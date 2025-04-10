
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Scene, Source, AiFeature, Stats, StreamStatus, AppContextType,
  ScheduledStream, AudioSettings, StreamAlert
} from './types';

// Import utility functions from separate files
import { toggleSceneActive } from './sceneUtils';
import { toggleSourceActive } from './sourceUtils';
import { toggleAiFeature, updateAiFeatureSlider } from './aiFeatureUtils';
import { startStream, stopStream, testStream, simulateStatsChange } from './streamUtils';
import { startRecording, stopRecording } from './recordingUtils';
import { scheduleStream, deleteScheduledStream } from './schedulingUtils';
import { updateAudioSettings } from './audioUtils';
import { toggleStreamAlert, updateStreamAlert } from './alertUtils';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State definitions
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [aiFeatures, setAiFeatures] = useState<AiFeature[]>([]);
  const [stats, setStats] = useState<Stats>({
    bitrate: '6000 kbps',
    cpuUsage: '32%',
    ramUsage: '3.2 GB',
    gpuEncoding: 'NVENC',
    status: 'good'
  });
  const [streamStatus, setStreamStatus] = useState<StreamStatus>('offline');
  const [activeSceneId, setActiveSceneId] = useState<number | null>(null);
  const [isStreamPreviewAvailable, setIsStreamPreviewAvailable] = useState(false);
  
  // New state
  const [scheduledStreams, setScheduledStreams] = useState<ScheduledStream[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioSettings, setAudioSettings] = useState<AudioSettings>({
    volume: 75,
    noiseSuppression: true,
    echoCancellation: true,
    autoGainControl: false
  });
  const [streamAlerts, setStreamAlerts] = useState<StreamAlert[]>([
    {
      id: 1,
      type: 'follower',
      message: 'New follower: {username}',
      enabled: true,
      sound: true,
      visual: true,
      duration: 3
    },
    {
      id: 2,
      type: 'subscriber',
      message: '{username} just subscribed!',
      enabled: true,
      sound: true,
      visual: true,
      duration: 5
    },
    {
      id: 3,
      type: 'donation',
      message: '{username} donated {amount}!',
      enabled: true,
      sound: true,
      visual: true,
      duration: 5
    },
    {
      id: 4,
      type: 'raid',
      message: '{username} is raiding with {count} viewers!',
      enabled: true,
      sound: true,
      visual: true,
      duration: 6
    }
  ]);

  // Initialize with data
  useEffect(() => {
    try {
      console.log('Initializing app data');
      
      // Set active scene ID from the first active scene
      const activeScene = scenes.find(scene => scene.active);
      if (activeScene) {
        setActiveSceneId(activeScene.id);
      }
      
      // Check if any video source is active
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
  }, [scenes, sources]);

  // Event handlers
  const handleToggleSceneActive = (id: number) => {
    setScenes(prevScenes => 
      toggleSceneActive(prevScenes, id, setScenes, setActiveSceneId)
    );
  };

  const handleToggleSourceActive = async (id: number) => {
    const result = await toggleSourceActive(sources, id, setIsStreamPreviewAvailable, setSources);
    setSources(result);
  };

  const handleToggleAiFeature = (id: number) => {
    setAiFeatures(prevFeatures => toggleAiFeature(prevFeatures, id));
  };

  const handleUpdateAiFeatureSlider = (id: number, value: number) => {
    setAiFeatures(prevFeatures => updateAiFeatureSlider(prevFeatures, id, value));
  };

  const handleStartStream = () => {
    startStream(isStreamPreviewAvailable, setStreamStatus, () => 
      simulateStatsChange(streamStatus, setStats),
      sources
    );
  };

  const handleStopStream = () => {
    stopStream(setStreamStatus);
  };

  const handleTestStream = () => {
    testStream(isStreamPreviewAvailable, sources);
  };
  
  // New handlers
  const handleStartRecording = () => {
    startRecording(setStreamStatus, setIsRecording);
  };
  
  const handleStopRecording = () => {
    stopRecording(setStreamStatus, setIsRecording);
  };
  
  const handleScheduleStream = (stream: Omit<ScheduledStream, 'id' | 'notificationSent'>) => {
    scheduleStream(scheduledStreams, setScheduledStreams, stream);
  };
  
  const handleDeleteScheduledStream = (id: number) => {
    deleteScheduledStream(id, scheduledStreams, setScheduledStreams);
  };
  
  const handleUpdateAudioSettings = (settings: Partial<AudioSettings>) => {
    updateAudioSettings(audioSettings, setAudioSettings, settings);
  };

  const handleToggleStreamAlert = (id: number) => {
    setStreamAlerts(prevAlerts => toggleStreamAlert(prevAlerts, id));
  };
  
  const handleUpdateStreamAlert = (id: number, alert: Partial<StreamAlert>) => {
    setStreamAlerts(prevAlerts => updateStreamAlert(prevAlerts, id, alert));
  };

  return (
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
        toggleSceneActive: handleToggleSceneActive,
        toggleSourceActive: handleToggleSourceActive,
        toggleAiFeature: handleToggleAiFeature,
        updateAiFeatureSlider: handleUpdateAiFeatureSlider,
        startStream: handleStartStream,
        stopStream: handleStopStream,
        testStream: handleTestStream,
        startRecording: handleStartRecording,
        stopRecording: handleStopRecording,
        scheduleStream: handleScheduleStream,
        deleteScheduledStream: handleDeleteScheduledStream,
        updateAudioSettings: handleUpdateAudioSettings,
        toggleStreamAlert: handleToggleStreamAlert,
        updateStreamAlert: handleUpdateStreamAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
