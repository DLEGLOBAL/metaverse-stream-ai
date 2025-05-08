
export interface PlatformKey {
  platform: string;
  rtmpUrl: string;
  streamKey: string;
  isAdvanced?: boolean;
  customConfig?: {
    proxyEnabled?: boolean;
    proxyUrl?: string;
    proxyType?: 'yellowduck' | 'android-emulator' | 'custom';
    customParams?: Record<string, string>;
    betaProgram?: boolean;
  }
}

export const defaultPlatforms: PlatformKey[] = [
  {
    platform: 'Twitch',
    rtmpUrl: 'rtmp://live.twitch.tv/app',
    streamKey: '',
  },
  {
    platform: 'YouTube',
    rtmpUrl: 'rtmp://a.rtmp.youtube.com/live2',
    streamKey: '',
  },
  {
    platform: 'Facebook',
    rtmpUrl: 'rtmp://live-api-s.facebook.com:80/rtmp',
    streamKey: '',
  },
  {
    platform: 'TikTok',
    rtmpUrl: 'rtmp://rtmp-push.tiktok.com/live',
    streamKey: '',
    isAdvanced: true,
    customConfig: {
      betaProgram: false,
      customParams: {}
    }
  },
  {
    platform: 'Instagram',
    rtmpUrl: 'rtmp://localhost:1935/rtmp',
    streamKey: '',
    isAdvanced: true,
    customConfig: {
      proxyEnabled: false,
      proxyType: 'yellowduck',
      proxyUrl: ''
    }
  }
];
