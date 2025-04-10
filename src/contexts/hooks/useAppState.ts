
import { useState } from 'react';
import { 
  Scene, Source, AiFeature, Stats, StreamStatus,
  ScheduledStream, AudioSettings, StreamAlert
} from '../types';

export const useAppState = () => {
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
