
import { useState } from 'react';
import { 
  Scene, Source, AiFeature, Stats, StreamStatus,
  ScheduledStream, AudioSettings, StreamAlert
} from '../types';

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
    },
    {
      id: 3,
      name: 'Gaming Scene',
      active: false
    }
  ]);
  
  // Source state with real device configuration
  const [sources, setSources] = useState<Source[]>([
    {
      id: 1,
      name: 'Webcam',
      type: 'camera',
      active: true,
      settings: {
        resolution: '1080p',
        framerate: 60
      }
    },
    {
      id: 2,
      name: 'Microphone',
      type: 'audio',
      active: true,
      settings: {
        gain: 75,
        noiseSuppression: true
      }
    },
    {
      id: 3,
      name: 'Screen Share',
      type: 'display',
      active: false,
      settings: {
        captureArea: 'window',
        quality: 'high'
      }
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
      description: 'Control your stream with voice',
      enabled: false
    },
    {
      id: 4,
      name: 'AI Assistant',
      description: 'Get real-time suggestions during stream',
      enabled: false
    }
  ]);
  
  // Stats state
  const [stats, setStats] = useState<Stats>({
    bitrate: '6000 kbps',
    cpuUsage: '32%',
    ramUsage: '3.2 GB',
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
