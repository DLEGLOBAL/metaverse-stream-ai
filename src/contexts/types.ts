
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

export type StreamStatus = 'live' | 'offline' | 'recording';

export type ScheduledStream = {
  id: number;
  title: string;
  description: string;
  scheduledDate: string;
  platforms: number[];
  duration: number; // in minutes
  notificationSent: boolean;
};

export type AudioSettings = {
  volume: number;
  noiseSuppression: boolean;
  echoCancellation: boolean;
  autoGainControl: boolean;
};

export interface AppContextType {
  scenes: Scene[];
  sources: Source[];
  aiFeatures: AiFeature[];
  stats: Stats;
  streamStatus: StreamStatus;
  activeSceneId: number | null;
  isStreamPreviewAvailable: boolean;
  scheduledStreams: ScheduledStream[];
  isRecording: boolean;
  audioSettings: AudioSettings;
  
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
  
  // New functions
  startRecording: () => void;
  stopRecording: () => void;
  scheduleStream: (stream: Omit<ScheduledStream, 'id' | 'notificationSent'>) => void;
  deleteScheduledStream: (id: number) => void;
  updateAudioSettings: (settings: Partial<AudioSettings>) => void;
}
