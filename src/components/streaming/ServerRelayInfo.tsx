import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, HardDrive, MemoryStick, Zap, Info, Server, Globe, Signal, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/hooks/use-toast';
import { RELAY_SERVER_URL } from '@/utils/relayServerUtils';

const DesktopAppInfo = () => {
  const [systemInfo, setSystemInfo] = React.useState<any>({
    platform: '',
    cpus: [],
    totalMemory: 0,
    freeMemory: 0
  });
  const [versions, setVersions] = React.useState<any>({
    app: '',
    electron: '',
    chrome: '',
    node: ''
  });
  const [relayServerStatus, setRelayServerStatus] = React.useState<'online' | 'offline' | 'checking'>('checking');

  const checkRelayServer = async () => {
    setRelayServerStatus('checking');
    try {
      const response = await fetch(`${RELAY_SERVER_URL}/health`, { 
        signal: AbortSignal.timeout(5000)
      });
      setRelayServerStatus(response.ok ? 'online' : 'offline');
    } catch (error) {
      console.error('Error checking relay server:', error);
      setRelayServerStatus('offline');
    }
  };

  React.useEffect(() => {
    // Check relay server status on component mount
    checkRelayServer();
    
    // Check if running in Electron
    if (window.electron) {
      // Get system information
      window.electron.getSystemInfo().then((info: any) => {
        setSystemInfo(info);
      });
      
      // Get version information
      const versionInfo = window.electron.getVersion();
      setVersions(versionInfo);
    } else {
      // Fallback for browser preview
      setSystemInfo({
        platform: navigator.platform,
        cpus: [{model: 'Browser Environment', speed: 0}],
        totalMemory: 8000000000,
        freeMemory: 4000000000
      });
      setVersions({
        app: '1.0.0',
        electron: 'N/A',
        chrome: navigator.userAgent.match(/Chrome\/([0-9.]+)/)?.[1] || 'N/A',
        node: 'N/A'
      });
    }
  }, []);

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const manualStartRelayServer = () => {
    toast({
      title: 'Starting Relay Server',
      description: 'Attempting to start the relay server in background...'
    });
    
    // In a real implementation, this would send a request to start the relay server
    // For now, we'll just simulate a response after a delay
    setTimeout(() => {
      checkRelayServer();
    }, 2000);
  };
  
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center">
          <Server className="h-5 w-5 mr-2 text-meta-teal" />
          Streaming Relay Server
          <div className={`ml-2 px-2 py-0.5 text-xs rounded-full flex items-center ${
            relayServerStatus === 'online' 
              ? 'bg-green-500/20 text-green-400' 
              : relayServerStatus === 'checking'
                ? 'bg-yellow-500/20 text-yellow-400'
                : 'bg-red-500/20 text-red-400'
          }`}>
            <div className={`w-2 h-2 rounded-full mr-1 ${
              relayServerStatus === 'online' 
                ? 'bg-green-400' 
                : relayServerStatus === 'checking'
                  ? 'bg-yellow-400 animate-pulse'
                  : 'bg-red-400'
            }`}></div>
            {relayServerStatus === 'online' 
              ? 'Online' 
              : relayServerStatus === 'checking'
                ? 'Checking'
                : 'Offline'}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="status" className="w-full">
          <TabsList className="bg-meta-dark-blue border border-gray-700 mb-4">
            <TabsTrigger value="status" className="data-[state=active]:bg-meta-teal/10 data-[state=active]:text-meta-teal">Status</TabsTrigger>
            <TabsTrigger value="config" className="data-[state=active]:bg-meta-teal/10 data-[state=active]:text-meta-teal">Configuration</TabsTrigger>
            <TabsTrigger value="system" className="data-[state=active]:bg-meta-teal/10 data-[state=active]:text-meta-teal">System</TabsTrigger>
          </TabsList>
          
          <TabsContent value="status">
            <div className="space-y-4">
              <div className="bg-meta-dark-blue/50 p-4 rounded-md border border-gray-700">
                <div className="flex items-start">
                  <div className={`p-2 rounded-full mr-3 ${
                    relayServerStatus === 'online' 
                      ? 'bg-green-500/20' 
                      : relayServerStatus === 'checking'
                        ? 'bg-yellow-500/20'
                        : 'bg-red-500/20'
                  }`}>
                    <Signal className={`h-5 w-5 ${
                      relayServerStatus === 'online' 
                        ? 'text-green-400' 
                        : relayServerStatus === 'checking'
                          ? 'text-yellow-400'
                          : 'text-red-400'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Relay Server Status</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {relayServerStatus === 'online' 
                        ? 'The relay server is online and ready to handle streaming requests.' 
                        : relayServerStatus === 'checking'
                          ? 'Checking relay server availability...'
                          : 'The relay server is currently offline. Use the button below to attempt to start it.'}
                    </p>
                    
                    <div className="mt-3 flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-meta-teal/30 hover:bg-meta-teal/10 text-white"
                        onClick={checkRelayServer}
                      >
                        Check Status
                      </Button>
                      
                      {relayServerStatus === 'offline' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-meta-teal/30 hover:bg-meta-teal/10 text-white"
                          onClick={manualStartRelayServer}
                        >
                          Start Relay Server
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="bg-meta-dark-blue p-3 rounded-md border border-gray-700 flex items-center">
                    <Globe className="h-4 w-4 text-meta-teal mr-2" />
                    <div>
                      <p className="text-xs text-gray-400">Server URL</p>
                      <p className="text-sm text-white">{RELAY_SERVER_URL || 'Not configured'}</p>
                    </div>
                  </div>
                  
                  <div className="bg-meta-dark-blue p-3 rounded-md border border-gray-700 flex items-center">
                    <Signal className="h-4 w-4 text-meta-teal mr-2" />
                    <div>
                      <p className="text-xs text-gray-400">Last Checked</p>
                      <p className="text-sm text-white">{new Date().toLocaleTimeString()}</p>
                    </div>
                  </div>
                  
                  <div className="bg-meta-dark-blue p-3 rounded-md border border-gray-700 flex items-center">
                    <Zap className="h-4 w-4 text-meta-teal mr-2" />
                    <div>
                      <p className="text-xs text-gray-400">Connection Type</p>
                      <p className="text-sm text-white">WebSocket + RTMP Relay</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-meta-dark-blue/50 p-4 rounded-md border border-meta-teal/30">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-meta-teal mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-300">
                      <strong className="text-white">Note:</strong> The relay server enables direct streaming from your browser to platforms like Twitch, YouTube, and Facebook without requiring OBS or other software. When offline, you may need to start it manually or check your network connection.
                    </p>
                  </div>
                </div>
              </div>
              
              {relayServerStatus === 'offline' && (
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-md">
                  <h3 className="text-white font-medium flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 text-red-400" /> 
                    Troubleshooting Guide
                  </h3>
                  <ul className="list-disc pl-5 text-sm text-gray-300 mt-2 space-y-1">
                    <li>Check if the relay server application is installed and running</li>
                    <li>Verify your network connection and firewall settings</li>
                    <li>Try restarting the relay server application</li>
                    <li>Ensure port 3000 is not blocked or in use by another application</li>
                    <li>Check that the URL in your settings is correct</li>
                  </ul>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="config">
            <div className="space-y-4">
              <p className="text-sm text-gray-300">
                Configure your relay server settings to optimize the streaming experience.
              </p>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-2">
                  <div className="bg-meta-dark-blue/50 p-3 rounded-md border border-gray-700">
                    <h3 className="text-sm font-medium text-white mb-2">Relay Server URL</h3>
                    <div className="flex">
                      <input 
                        type="text" 
                        value={RELAY_SERVER_URL}
                        readOnly
                        className="flex-1 bg-meta-dark-blue border border-gray-700 rounded px-2 py-1 text-sm text-white"
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="ml-2 border-meta-teal/30 hover:bg-meta-teal/10 text-white"
                        onClick={() => {
                          toast({
                            title: 'Configuration Saved',
                            description: 'URL configuration has been updated.'
                          });
                        }}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="bg-meta-dark-blue/50 p-3 rounded-md border border-gray-700">
                      <h3 className="text-sm font-medium text-white mb-2">Video Quality</h3>
                      <select className="w-full bg-meta-dark-blue border border-gray-700 rounded px-2 py-1 text-sm text-white">
                        <option value="high">High (1080p, 6000kbps)</option>
                        <option value="medium" selected>Medium (720p, 4500kbps)</option>
                        <option value="low">Low (480p, 2500kbps)</option>
                      </select>
                    </div>
                    
                    <div className="bg-meta-dark-blue/50 p-3 rounded-md border border-gray-700">
                      <h3 className="text-sm font-medium text-white mb-2">Connection Mode</h3>
                      <select className="w-full bg-meta-dark-blue border border-gray-700 rounded px-2 py-1 text-sm text-white">
                        <option value="auto" selected>Auto (WebSocket + RTMP)</option>
                        <option value="websocket">WebSocket Only</option>
                        <option value="rtmp">RTMP Only</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-meta-teal hover:bg-meta-teal/80 text-black"
                  onClick={() => {
                    toast({
                      title: 'Settings Saved',
                      description: 'Your relay server settings have been updated.'
                    });
                  }}
                >
                  Save Configuration
                </Button>
                
                <Separator className="bg-gray-700" />
                
                <div className="bg-meta-dark-blue/50 p-3 rounded-md border border-meta-teal/30">
                  <h3 className="text-white font-medium flex items-center">
                    <Info className="h-4 w-4 mr-2 text-meta-teal" /> 
                    Advanced Configuration
                  </h3>
                  <p className="text-sm text-gray-300 mt-1">
                    For advanced relay server configuration, you can edit the configuration file directly or use the desktop application settings panel.
                  </p>
                  <Button 
                    variant="link" 
                    className="text-meta-teal p-0 h-auto mt-1"
                    onClick={() => {
                      toast({
                        title: 'Coming Soon',
                        description: 'Advanced configuration will be available in a future update.'
                      });
                    }}
                  >
                    View Advanced Settings
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="system">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-white font-medium">System Information</h3>
                <div className="grid grid-cols-1 gap-2">
                  <div className="bg-meta-dark-blue/50 p-3 rounded-md border border-gray-700 flex items-center">
                    <HardDrive className="h-5 w-5 text-meta-teal mr-3" />
                    <div>
                      <p className="text-sm text-gray-300">Platform</p>
                      <p className="text-sm font-medium text-white">{systemInfo.platform}</p>
                    </div>
                  </div>
                  
                  <div className="bg-meta-dark-blue/50 p-3 rounded-md border border-gray-700 flex items-center">
                    <Cpu className="h-5 w-5 text-meta-teal mr-3" />
                    <div>
                      <p className="text-sm text-gray-300">CPU</p>
                      <p className="text-sm font-medium text-white">
                        {systemInfo.cpus && systemInfo.cpus.length > 0 ? systemInfo.cpus[0].model : 'Loading...'}
                      </p>
                      <p className="text-xs text-gray-400">
                        {systemInfo.cpus ? `${systemInfo.cpus.length} Cores` : ''}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-meta-dark-blue/50 p-3 rounded-md border border-gray-700 flex items-center">
                    <MemoryStick className="h-5 w-5 text-meta-teal mr-3" />
                    <div>
                      <p className="text-sm text-gray-300">Memory</p>
                      <p className="text-sm font-medium text-white">
                        {formatBytes(systemInfo.freeMemory)} free of {formatBytes(systemInfo.totalMemory)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator className="bg-gray-700" />
              
              <div className="space-y-2">
                <h3 className="text-white font-medium">Runtime Versions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <p className="text-sm text-gray-400">Electron:</p>
                    <p className="text-sm text-white ml-2">{versions.electron}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm text-gray-400">Chrome:</p>
                    <p className="text-sm text-white ml-2">{versions.chrome}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm text-gray-400">Node:</p>
                    <p className="text-sm text-white ml-2">{versions.node}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DesktopAppInfo;
