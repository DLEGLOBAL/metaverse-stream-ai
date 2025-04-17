
import { Camera, Layers, Radio, Bot, Settings, Video, Users, Network, Headphones, Headset, Home, DollarSign, Palette, BarChart, Tv, Globe } from 'lucide-react';
import React from 'react';

export interface NavigationItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  external?: boolean;
}

export const getNavigationItems = (): NavigationItem[] => [
  { icon: <Home size={20} />, label: 'Dashboard', path: '/dashboard' },
  { icon: <Layers size={20} />, label: 'Scenes', path: '/dashboard/scenes' },
  { icon: <Camera size={20} />, label: 'Sources', path: '/dashboard/sources' },
  { icon: <Radio size={20} />, label: 'Streaming', path: '/dashboard/streaming' },
  { icon: <Bot size={20} />, label: 'AI Tools', path: '/dashboard/ai-tools' },
  { icon: <Video size={20} />, label: 'Video Editing', path: '/dashboard/video-editing' },
  { icon: <Headphones size={20} />, label: 'Audio', path: '/dashboard/audio' },
  { icon: <Headset size={20} />, label: 'VR Integration', path: '/dashboard/vr' },
  { icon: <Tv size={20} />, label: 'IPTV Platform', path: 'https://meta-stream.shop/', external: true },
  { icon: <Globe size={20} />, label: 'Metaverse', path: 'https://web.meta-stadiums.com/', external: true },
  { icon: <Users size={20} />, label: 'Community', path: '/dashboard/community' },
  { icon: <Network size={20} />, label: 'Creator Network', path: '/dashboard/creator-network' },
  { icon: <Palette size={20} />, label: 'Branding', path: '/dashboard/branding' },
  { icon: <BarChart size={20} />, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: <DollarSign size={20} />, label: 'Pricing', path: '/dashboard/pricing' },
  { icon: <Settings size={20} />, label: 'Settings', path: '/dashboard/settings' },
];
