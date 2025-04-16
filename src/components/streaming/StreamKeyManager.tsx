
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, Eye, EyeOff, CopyCheck, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PlatformKey {
  platform: string;
  rtmpUrl: string;
  streamKey: string;
}

const defaultPlatforms: PlatformKey[] = [
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

const StreamKeyManager: React.FC = () => {
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

  const handleSaveKeys = () => {
    localStorage.setItem('streamKeys', JSON.stringify(streamKeys));
    toast({
      title: "Stream Keys Saved",
      description: "Your stream keys have been saved securely in your browser.",
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

  const activePlatform = streamKeys.find(p => p.platform === activeTab) || streamKeys[0];

  return (
    <Card className="glass-card mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">Stream Keys</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="Twitch" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            {streamKeys.map(platform => (
              <TabsTrigger key={platform.platform} value={platform.platform}>
                {platform.platform}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {streamKeys.map(platform => (
            <TabsContent key={platform.platform} value={platform.platform}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {platform.platform} RTMP URL
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={platform.rtmpUrl}
                      className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 pl-3 pr-10 text-white"
                      readOnly
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-1 top-1 h-8 w-8 hover:bg-meta-teal/10 text-gray-400"
                      onClick={() => handleCopyUrl(platform.rtmpUrl)}
                    >
                      {copiedUrl && activeTab === platform.platform ? 
                        <CopyCheck className="h-4 w-4 text-meta-teal" /> : 
                        <Link className="h-4 w-4" />
                      }
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {platform.platform} Stream Key
                  </label>
                  <div className="relative">
                    <input 
                      type={showKey ? "text" : "password"} 
                      value={platform.streamKey}
                      onChange={(e) => handleStreamKeyChange(e.target.value)}
                      placeholder="Enter your stream key"
                      className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 pl-3 pr-20 text-white"
                    />
                    <div className="absolute right-1 top-1 flex">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 hover:bg-meta-teal/10 text-gray-400 mr-1"
                        onClick={toggleShowKey}
                      >
                        {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 hover:bg-meta-teal/10 text-gray-400"
                        onClick={() => handleCopyKey(platform.streamKey)}
                      >
                        {copiedKey && activeTab === platform.platform ? 
                          <CopyCheck className="h-4 w-4 text-meta-teal" /> : 
                          <Link className="h-4 w-4" />
                        }
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Keep your stream key private! Never share it with others.
                  </p>
                </div>
              </div>
            </TabsContent>
          ))}
          
          <Button 
            onClick={handleSaveKeys}
            className="mt-4 w-full bg-button-gradient text-meta-dark-blue hover:brightness-110"
          >
            <Save className="h-4 w-4 mr-2" /> Save All Stream Keys
          </Button>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StreamKeyManager;
