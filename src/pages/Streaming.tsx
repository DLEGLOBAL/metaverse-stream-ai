
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Youtube, Play, ChevronRight, TrendingUp, Clock, Users, Twitch, Facebook, X, Link } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/hooks/use-toast';

const Streaming = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { streamStatus, startStream, stopStream } = useAppContext();
  
  const platforms = [
    { id: 1, name: 'YouTube', icon: Youtube, connected: true, enabled: true },
    { id: 2, name: 'Twitch', icon: Twitch, connected: true, enabled: true },
    { id: 3, name: 'Facebook', icon: Facebook, connected: false, enabled: false },
    { id: 4, name: 'X', icon: X, connected: false, enabled: false },
  ];
  
  const [platformStates, setPlatformStates] = useState(
    platforms.reduce((acc, platform) => {
      acc[platform.id] = platform.enabled;
      return acc;
    }, {} as Record<number, boolean>)
  );
  
  const handlePlatformToggle = (id: number) => {
    setPlatformStates(prev => ({ 
      ...prev, 
      [id]: !prev[id] 
    }));
    
    const platform = platforms.find(p => p.id === id);
    if (platform) {
      if (!platform.connected) {
        toast({
          title: "Platform Not Connected",
          description: `Please connect your ${platform.name} account first.`,
          variant: "destructive",
        });
        setPlatformStates(prev => ({ ...prev, [id]: false }));
        return;
      }
      
      toast({
        title: platformStates[id] ? `${platform.name} Disabled` : `${platform.name} Enabled`,
        description: platformStates[id] 
          ? `Streams will no longer be sent to ${platform.name}` 
          : `Streams will now be sent to ${platform.name}`,
      });
    }
  };
  
  const handleConnectPlatform = (id: number) => {
    const platform = platforms.find(p => p.id === id);
    if (platform) {
      toast({
        title: "Coming Soon",
        description: `${platform.name} connection will be available in the next update.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-meta-slate">
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Header sidebarCollapsed={sidebarCollapsed} />
      
      <main className={`pt-20 px-4 pb-4 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Streaming</h1>
            <p className="text-gray-400 mt-1">Manage your stream destinations and settings</p>
          </div>
          {streamStatus === 'live' ? (
            <Button 
              variant="outline" 
              className="border-red-500/30 hover:bg-red-500/10 text-red-400"
              onClick={stopStream}
            >
              Stop Stream
            </Button>
          ) : (
            <Button 
              className="bg-button-gradient text-meta-dark-blue hover:brightness-110"
              onClick={startStream}
            >
              <Play className="h-4 w-4 mr-2" /> Go Live
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Platforms section */}
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Platforms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {platforms.map((platform) => (
                    <div key={platform.id} className="p-4 rounded-md border border-gray-700 bg-meta-dark-blue/50">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full ${platform.connected ? 'bg-meta-teal/20' : 'bg-gray-700'} mr-3`}>
                          <platform.icon className={`h-5 w-5 ${platform.connected ? 'text-meta-teal' : 'text-gray-400'}`} />
                        </div>
                        
                        <div>
                          <p className="font-medium text-white">{platform.name}</p>
                          <p className="text-xs text-gray-400">
                            {platform.connected ? 'Connected' : 'Not connected'}
                          </p>
                        </div>
                        
                        <div className="ml-auto flex items-center space-x-2">
                          {platform.connected ? (
                            <div className="flex items-center mr-2">
                              <span className="text-sm text-gray-300 mr-3">Stream to this platform</span>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  className="sr-only peer" 
                                  checked={platformStates[platform.id]}
                                  onChange={() => handlePlatformToggle(platform.id)}
                                />
                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-meta-teal"></div>
                              </label>
                            </div>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-meta-teal/30 hover:bg-meta-teal/10 text-white"
                              onClick={() => handleConnectPlatform(platform.id)}
                            >
                              Connect
                            </Button>
                          )}
                          {platform.connected && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      {platform.connected && platformStates[platform.id] && (
                        <div className="mt-3 pt-3 border-t border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-2">
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 text-meta-teal mr-2" />
                            <span className="text-sm text-gray-300">Quality: 1080p/60fps</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-meta-teal mr-2" />
                            <span className="text-sm text-gray-300">Uptime: 0:00:00</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-meta-teal mr-2" />
                            <span className="text-sm text-gray-300">Viewers: 0</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <div className="p-4 rounded-md border border-dashed border-gray-700 bg-transparent">
                    <div className="flex items-center justify-center">
                      <Button 
                        variant="ghost" 
                        className="border-meta-teal/30 hover:bg-meta-teal/10 text-white"
                      >
                        <Globe className="h-4 w-4 mr-2" /> Add Custom RTMP Destination
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Stream settings */}
            <Card className="glass-card mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Stream Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Video Quality</label>
                    <select className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white">
                      <option>720p 30fps (1.5-4 Mbps)</option>
                      <option selected>1080p 60fps (4-6 Mbps)</option>
                      <option>1440p 60fps (9-18 Mbps)</option>
                      <option>4K 30fps (13-34 Mbps)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Encoder</label>
                    <select className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white">
                      <option>x264 (Software)</option>
                      <option selected>NVENC (Hardware)</option>
                      <option>AMD AMF (Hardware)</option>
                      <option>Intel QuickSync (Hardware)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Bitrate</label>
                    <div className="flex space-x-3">
                      <input 
                        type="range" 
                        className="flex-1 accent-meta-teal"
                        min="2000"
                        max="10000"
                        step="500"
                        defaultValue="6000"
                      />
                      <div className="bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white text-sm w-28 text-center">
                        6000 kbps
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Keyframe Interval</label>
                    <select className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white">
                      <option>1 second</option>
                      <option selected>2 seconds</option>
                      <option>3 seconds</option>
                      <option>5 seconds</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button className="bg-button-gradient text-meta-dark-blue hover:brightness-110">
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Status and Stream Key */}
          <div>
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Stream Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-meta-dark-blue p-4 rounded-md border border-meta-teal/20">
                  <div className="flex items-center mb-3">
                    <div className={`h-3 w-3 rounded-full mr-2 ${
                      streamStatus === 'live' ? 'bg-red-500 animate-pulse' : 'bg-meta-teal'
                    }`}></div>
                    <span className="text-white font-medium">
                      {streamStatus === 'live' ? 'LIVE' : 'OFFLINE'}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Uptime:</span>
                      <span className="text-white">
                        {streamStatus === 'live' ? '00:00:00' : '--:--:--'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Active Platforms:</span>
                      <span className="text-white">
                        {Object.values(platformStates).filter(Boolean).length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Viewers:</span>
                      <span className="text-white">0</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    {streamStatus === 'live' ? (
                      <Button 
                        variant="outline" 
                        className="w-full border-red-500/30 hover:bg-red-500/10 text-red-400"
                        onClick={stopStream}
                      >
                        End Stream
                      </Button>
                    ) : (
                      <Button 
                        className="w-full bg-button-gradient text-meta-dark-blue hover:brightness-110"
                        onClick={startStream}
                      >
                        <Play className="h-4 w-4 mr-2" /> Start Streaming
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Stream Key & URL</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Server URL</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value="rtmp://live.metastream.ai/stream"
                        className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 pl-3 pr-10 text-white"
                        readOnly
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-1 top-1 h-8 w-8 hover:bg-meta-teal/10 text-gray-400"
                        onClick={() => {
                          navigator.clipboard.writeText("rtmp://live.metastream.ai/stream");
                          toast({
                            title: "URL Copied",
                            description: "Stream URL copied to clipboard",
                          });
                        }}
                      >
                        <Link className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Stream Key</label>
                    <div className="relative">
                      <input 
                        type="password" 
                        value="stream-key-xxxx-xxxx-xxxx"
                        className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 pl-3 pr-10 text-white"
                        readOnly
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-1 top-1 h-8 w-8 hover:bg-meta-teal/10 text-gray-400"
                        onClick={() => {
                          navigator.clipboard.writeText("stream-key-xxxx-xxxx-xxxx");
                          toast({
                            title: "Key Copied",
                            description: "Stream key copied to clipboard",
                          });
                        }}
                      >
                        <Link className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Keep your stream key private! Never share it with others.</p>
                  </div>
                  
                  <Button variant="outline" className="w-full border-meta-teal/30 hover:bg-meta-teal/10 text-white">
                    Reset Stream Key
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Streaming;
