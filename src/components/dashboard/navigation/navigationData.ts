
import { Camera, Layers, Radio, Bot, Settings, Video, Users, Network, Headphones, Headset, Home, DollarSign, Palette, Tv, Globe } from 'lucide-react';
import React from 'react';

export interface NavigationItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  external?: boolean;
}

export const getNavigationItems = (): NavigationItem[] => [
  { icon: React.createElement(Home, { size: 20 }), label: 'Dashboard', path: '/dashboard' },
  { icon: React.createElement(Layers, { size: 20 }), label: 'Scenes', path: '/dashboard/scenes' },
  { icon: React.createElement(Camera, { size: 20 }), label: 'Sources', path: '/dashboard/sources' },
  { icon: React.createElement(Radio, { size: 20 }), label: 'Streaming', path: '/dashboard/streaming' },
  { icon: React.createElement(Bot, { size: 20 }), label: 'AI Tools', path: '/dashboard/ai-tools' },
  { icon: React.createElement(Video, { size: 20 }), label: 'Video Editing', path: '/dashboard/video-editing' },
  { icon: React.createElement(Headphones, { size: 20 }), label: 'Audio', path: '/dashboard/audio' },
  { icon: React.createElement(Headset, { size: 20 }), label: 'VR Integration', path: '/dashboard/vr' },
  { icon: React.createElement(Tv, { size: 20 }), label: 'IPTV Platform', path: 'https://meta-stream.shop/', external: true },
  { icon: React.createElement(Globe, { size: 20 }), label: 'Meta-Stadiums', path: 'https://web.meta-stadiums.com/', external: true },
  { icon: React.createElement(Users, { size: 20 }), label: 'Community', path: '/dashboard/community' },
  { icon: React.createElement(Network, { size: 20 }), label: 'Creator Network', path: '/dashboard/creator-network' },
  { icon: React.createElement(Palette, { size: 20 }), label: 'Branding', path: '/dashboard/branding' },
  { icon: React.createElement(DollarSign, { size: 20 }), label: 'Pricing', path: '/dashboard/pricing' },
  { icon: React.createElement(Settings, { size: 20 }), label: 'Settings', path: '/dashboard/settings' },
];
