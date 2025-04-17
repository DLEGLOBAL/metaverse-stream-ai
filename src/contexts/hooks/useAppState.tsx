
import { useState } from 'react';
import { 
  Scene, Source, AiFeature, Stats, StreamStatus,
  ScheduledStream, AudioSettings, StreamAlert
} from '../types';
import { Camera, Computer, Mic, Bot } from 'lucide-react';

export const useAppState = () => {
  // Scene state
  const [scenes, setScenes] = useState<Scene[]>([
    {
      id: 1,
      name: 'Main Scene',
      active: true
    },
    {
      id: 2,
      name: 'Interview Scene',
      active: false
    }
  ]);
  
  // Source state
  const [sources, setSources] = useState<Source[]>([
    {
      id: 1,
      name: 'Webcam',
      type: 'camera',
      active: true,
      icon: <Camera className="h-4 w-4" />
    },
    {
      id: 2,
      name: 'Microphone',
      type: 'audio',
      active: true,
      icon: <Mic className="h-4 w-4" />
    },
    {
      id: 3,
      name: 'Screen Share',
      type: 'display',
      active: false,
      icon: <Computer className="h-4 w-4" />
    }
  ]);
  
  // AI features state
  const [aiFeatures, setAiFeatures] = useState<AiFeature[]>([
    {
      id: 1,
      name: 'AI Director',
      description: 'Automatically switches scenes based on content',
      enabled: false,
      hasSlider: true,
      sliderValue: 50
    },
    {
      id: 2,
      name: 'Smart Green Screen',
      description: 'AI-powered background removal',
      enabled: true,
      hasSlider: true,
      sliderValue: 75
    },
    {
      id: 3,
      name: 'Voice Commands',
      description: 'Control your stream with your voice',
      enabled: false,
      hasSlider: false
    },
    {
      id: 4,
      name: 'AI Assistant',
      description: 'Get help and suggestions in real-time',
      enabled: true,
      hasSlider: true,
      sliderValue: 60
    }
  ]);
  
  // Stats state
  const [stats, setStats] = useState<Stats>({
    bitrate: '6000 kbps',
    cpuUsage: '0%',
    ramUsage: '0 GB',
    gpuEncoding: 'NVENC',
    status: 'good'
  });
  
  // Stream status state
  const [streamStatus, setStreamStatus] = useState<StreamStatus>('offline');
  const [activeSceneId, setActiveSceneId] = useState<number | null>(1);
  const [isStreamPreviewAvailable, setIsStreamPreviewAvailable] = useState(true);
  
  // Scheduled streams state
  const [scheduledStreams, setScheduledStreams] = useState<ScheduledStream[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  
  // Audio settings state
  const [audioSettings, setAudioSettings] = useState<AudioSettings>({
    volume: 75,
    noiseSuppression: true,
    echoCancellation: true,
    autoGainControl: false
  });
  
  // Stream alerts state  
  const [streamAlerts, setStreamAlerts] = useState<StreamAlert[]>([]);

  return {
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
  };
};
