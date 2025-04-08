
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Scene, Source, AiFeature, Stats, StreamStatus, AppContextType 
} from './types';
import { toggleSceneActive } from './sceneUtils';
import { toggleSourceActive } from './sourceUtils';
import { toggleAiFeature, updateAiFeatureSlider } from './aiFeatureUtils';
import { startStream, stopStream, testStream, simulateStatsChange } from './streamUtils';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  // Initialize with dummy data from DB or hardcoded values
  useEffect(() => {
    // In a real app, you would fetch this from the database
    try {
      // Simulate loading from Supabase
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

  const handleToggleSceneActive = (id: number) => {
    setScenes(prevScenes => 
      toggleSceneActive(prevScenes, id, setScenes, setActiveSceneId)
    );
  };

  const handleToggleSourceActive = (id: number) => {
    setSources(prevSources => 
      toggleSourceActive(prevSources, id, setIsStreamPreviewAvailable)
    );
  };

  const handleToggleAiFeature = (id: number) => {
    setAiFeatures(prevFeatures => toggleAiFeature(prevFeatures, id));
  };

  const handleUpdateAiFeatureSlider = (id: number, value: number) => {
    setAiFeatures(prevFeatures => updateAiFeatureSlider(prevFeatures, id, value));
  };

  const handleStartStream = () => {
    startStream(isStreamPreviewAvailable, setStreamStatus, () => 
      simulateStatsChange(streamStatus, setStats)
    );
  };

  const handleStopStream = () => {
    stopStream(setStreamStatus);
  };

  const handleTestStream = () => {
    testStream(isStreamPreviewAvailable);
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
        setScenes,
        setSources,
        setAiFeatures,
        setStats,
        setStreamStatus,
        toggleSceneActive: handleToggleSceneActive,
        toggleSourceActive: handleToggleSourceActive,
        toggleAiFeature: handleToggleAiFeature,
        updateAiFeatureSlider: handleUpdateAiFeatureSlider,
        startStream: handleStartStream,
        stopStream: handleStopStream,
        testStream: handleTestStream,
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
