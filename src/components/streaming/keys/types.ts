
export interface PlatformKey {
  platform: string;
  rtmpUrl: string;
  streamKey: string;
}

export const defaultPlatforms: PlatformKey[] = [
  {
    platform: 'Twitch',
    rtmpUrl: 'rtmp://live.twitch.tv/app',
    streamKey: ''
  },
  {
    platform: 'YouTube',
    rtmpUrl: 'rtmp://a.rtmp.youtube.com/live2',
    streamKey: ''
  },
  {
    platform: 'Facebook',
    rtmpUrl: 'rtmp://live-api-s.facebook.com:80/rtmp',
    streamKey: ''
  },
  {
    platform: 'TikTok',
    rtmpUrl: 'rtmp://rtmp-push.tiktok.com/live',
    streamKey: ''
  }
];
