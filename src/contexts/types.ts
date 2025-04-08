
export type Scene = {
  id: number;
  name: string;
  active: boolean;
};

export type Source = {
  id: number;
  name: string;
  type: 'camera' | 'display' | 'audio' | 'vr' | 'media';
  active: boolean;
  icon: React.ReactNode;
};

export type AiFeature = {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
  hasSlider?: boolean;
  sliderValue?: number;
};

export type Stats = {
  bitrate: string;
  cpuUsage: string;
  ramUsage: string;
  gpuEncoding: string;
  status: 'good' | 'warning' | 'error';
};

export type StreamStatus = 'offline' | 'live' | 'recording';

export interface AppContextType {
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
