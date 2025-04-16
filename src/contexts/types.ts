
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
  resolution?: string;
  frameRate?: string;
  viewers?: string;
  activeDestinations?: string[];
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

export type StreamAlert = {
  id: number;
  type: 'follower' | 'subscriber' | 'donation' | 'host' | 'raid';
  message: string;
  enabled: boolean;
  sound: boolean;
  visual: boolean;
  duration: number; // in seconds
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
  streamAlerts: StreamAlert[];
  
  setScenes: (scenes: Scene[]) => void;
  setSources: (sources: Source[]) => void;
  setAiFeatures: (features: AiFeature[]) => void;
  setStats: (stats: Stats) => void;
  setStreamStatus: (status: StreamStatus) => void;
  setStreamAlerts: (alerts: StreamAlert[]) => void;
  
  toggleSceneActive: (id: number) => void;
  toggleSourceActive: (id: number) => void;
  toggleAiFeature: (id: number) => void;
  updateAiFeatureSlider: (id: number, value: number) => void;
  startStream: () => void;
  stopStream: () => void;
  testStream: () => void;
  toggleStreamAlert: (id: number) => void;
  updateStreamAlert: (id: number, alert: Partial<StreamAlert>) => void;
  
  startRecording: () => void;
  stopRecording: () => void;
  scheduleStream: (stream: Omit<ScheduledStream, 'id' | 'notificationSent'>) => void;
  deleteScheduledStream: (id: number) => void;
  updateAudioSettings: (settings: Partial<AudioSettings>) => void;
}
