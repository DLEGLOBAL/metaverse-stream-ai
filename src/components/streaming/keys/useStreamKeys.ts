
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { PlatformKey, defaultPlatforms } from './types';

export const useStreamKeys = () => {
  const [streamKeys, setStreamKeys] = useState<PlatformKey[]>([]);
  const [activeTab, setActiveTab] = useState('Twitch');
  const [showKey, setShowKey] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  // Load saved stream keys from localStorage
  useEffect(() => {
    const savedKeys = localStorage.getItem('streamKeys');
    if (savedKeys) {
      try {
        setStreamKeys(JSON.parse(savedKeys));
      } catch (e) {
        console.error('Error parsing saved stream keys:', e);
        setStreamKeys(defaultPlatforms);
      }
    } else {
      setStreamKeys(defaultPlatforms);
    }
  }, []);

  const handleStreamKeyChange = (value: string) => {
    setStreamKeys(prev => {
      const updated = prev.map(platform => 
        platform.platform === activeTab 
          ? { ...platform, streamKey: value }
          : platform
      );
      
      // Save to localStorage
      localStorage.setItem('streamKeys', JSON.stringify(updated));
      return updated;
    });
  };

  const updatePlatformConfig = (platformName: string, config: Partial<PlatformKey>) => {
    setStreamKeys(prev => {
      const updated = prev.map(platform => {
        if (platform.platform === platformName) {
          // Handle nested customConfig updates
          if (config.customConfig) {
            return {
              ...platform,
              ...config,
              customConfig: {
                ...platform.customConfig,
                ...config.customConfig
              }
            };
          }
          // Handle regular updates
          return { ...platform, ...config };
        }
        return platform;
      });
      
      // Save to localStorage
      localStorage.setItem('streamKeys', JSON.stringify(updated));
      return updated;
    });
  };

  const handleSaveKeys = () => {
    localStorage.setItem('streamKeys', JSON.stringify(streamKeys));
    toast({
      title: "Stream Keys Saved",
      description: "Your stream keys and advanced configurations have been saved securely in your browser.",
    });
  };

  const handleCopyUrl = (rtmpUrl: string) => {
    navigator.clipboard.writeText(rtmpUrl);
    setCopiedUrl(true);
    toast({
      title: "URL Copied",
      description: "RTMP URL copied to clipboard",
    });
    
    setTimeout(() => setCopiedUrl(false), 3000);
  };

  const handleCopyKey = (streamKey: string) => {
    if (!streamKey) {
      toast({
        title: "No Stream Key",
        description: "Please enter a stream key first",
        variant: "destructive"
      });
      return;
    }
    
    navigator.clipboard.writeText(streamKey);
    setCopiedKey(true);
    toast({
      title: "Key Copied",
      description: "Stream key copied to clipboard",
    });
    
    setTimeout(() => setCopiedKey(false), 3000);
  };

  const toggleShowKey = () => {
    setShowKey(!showKey);
  };

  return {
    streamKeys,
    activeTab,
    showKey,
    copiedUrl,
    copiedKey,
    setActiveTab,
    handleStreamKeyChange,
    updatePlatformConfig,
    handleSaveKeys,
    handleCopyUrl,
    handleCopyKey,
    toggleShowKey,
  };
};
