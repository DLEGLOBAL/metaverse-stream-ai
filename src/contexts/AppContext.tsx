
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

type Scene = {
  id: number;
  name: string;
  active: boolean;
};

type Source = {
  id: number;
  name: string;
  type: 'camera' | 'display' | 'audio' | 'vr' | 'media';
  active: boolean;
  icon: React.ReactNode;
};

type AiFeature = {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
  hasSlider?: boolean;
  sliderValue?: number;
};

type Stats = {
  bitrate: string;
  cpuUsage: string;
  ramUsage: string;
  gpuEncoding: string;
  status: 'good' | 'warning' | 'error';
};

type StreamStatus = 'offline' | 'live' | 'recording';

interface AppContextType {
  scenes: Scene[];
  sources: Source[];
  aiFeatures: AiFeature[];
  stats: Stats;
  streamStatus: StreamStatus;
  activeSceneId: number | null;
  isStreamPreviewAvailable: boolean;
  
  setScenes: (scenes: Scene[]) => void;
  setSources: (sources: Source[]) => void;
  setAiFeatures: (features: AiFeature[]) => void;
  setStats: (stats: Stats) => void;
  setStreamStatus: (status: StreamStatus) => void;
  
  toggleSceneActive: (id: number) => void;
  toggleSourceActive: (id: number) => void;
  toggleAiFeature: (id: number) => void;
  updateAiFeatureSlider: (id: number, value: number) => void;
  startStream: () => void;
  stopStream: () => void;
  testStream: () => void;
}

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

  const toggleSceneActive = (id: number) => {
    setScenes(prevScenes => {
      const newScenes = prevScenes.map(scene => ({
        ...scene,
        active: scene.id === id
      }));
      
      // Update active scene ID
      setActiveSceneId(id);
      
      // Notify user
      const activatedScene = newScenes.find(scene => scene.id === id);
      if (activatedScene) {
        toast({
          title: 'Scene Activated',
          description: `Switched to "${activatedScene.name}" scene`,
        });
      }
      
      return newScenes;
    });
  };

  const toggleSourceActive = (id: number) => {
    setSources(prevSources => {
      const newSources = prevSources.map(source => {
        if (source.id === id) {
          const newActive = !source.active;
          
          // Show toast notification
          toast({
            title: newActive ? 'Source Activated' : 'Source Deactivated',
            description: `${source.name} is now ${newActive ? 'active' : 'inactive'}`,
          });
          
          return { ...source, active: newActive };
        }
        return source;
      });
      
      // Check if any video source is active after toggling
      const hasActiveVideoSource = newSources.some(
        source => source.active && (source.type === 'camera' || source.type === 'display')
      );
      setIsStreamPreviewAvailable(hasActiveVideoSource);
      
      return newSources;
    });
  };

  const toggleAiFeature = (id: number) => {
    setAiFeatures(prevFeatures => {
      return prevFeatures.map(feature => {
        if (feature.id === id) {
          const newEnabled = !feature.enabled;
          
          // Show toast notification
          toast({
            title: newEnabled ? 'Feature Enabled' : 'Feature Disabled',
            description: `${feature.name} is now ${newEnabled ? 'enabled' : 'disabled'}`,
          });
          
          return { ...feature, enabled: newEnabled };
        }
        return feature;
      });
    });
  };

  const updateAiFeatureSlider = (id: number, value: number) => {
    setAiFeatures(prevFeatures => {
      return prevFeatures.map(feature => {
        if (feature.id === id) {
          return { ...feature, sliderValue: value };
        }
        return feature;
      });
    });
  };

  const startStream = () => {
    if (!isStreamPreviewAvailable) {
      toast({
        title: 'Cannot Start Stream',
        description: 'No active video source available. Please enable a camera or display source.',
        variant: 'destructive',
      });
      return;
    }
    
    setStreamStatus('live');
    toast({
      title: 'Stream Started',
      description: 'You are now live!',
    });
    
    // Simulate stats change during streaming
    simulateStatsChange();
  };

  const stopStream = () => {
    setStreamStatus('offline');
    toast({
      title: 'Stream Stopped',
      description: 'Your stream has ended',
    });
  };

  const testStream = () => {
    if (!isStreamPreviewAvailable) {
      toast({
        title: 'Cannot Test Stream',
        description: 'No active video source available. Please enable a camera or display source.',
        variant: 'destructive',
      });
      return;
    }
    
    toast({
      title: 'Testing Stream',
      description: 'Running stream test...',
    });
    
    // Simulate a 3-second test
    setTimeout(() => {
      toast({
        title: 'Stream Test Completed',
        description: 'Your stream settings are working correctly',
      });
    }, 3000);
  };

  const simulateStatsChange = () => {
    // Only simulate changes when streaming is active
    if (streamStatus !== 'live') return;
    
    const interval = setInterval(() => {
      setStats({
        bitrate: `${5800 + Math.floor(Math.random() * 500)} kbps`,
        cpuUsage: `${30 + Math.floor(Math.random() * 20)}%`,
        ramUsage: `${3 + Math.random().toFixed(1)} GB`,
        gpuEncoding: 'NVENC',
        status: 'good',
      });
    }, 5000);
    
    // Cleanup interval when stream stops
    return () => clearInterval(interval);
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
        toggleSceneActive,
        toggleSourceActive,
        toggleAiFeature,
        updateAiFeatureSlider,
        startStream,
        stopStream,
        testStream,
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
