
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, HardDrive, MemoryStick, Zap, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useAppContext } from '@/contexts/AppContext';

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

  React.useEffect(() => {
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
  
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center">
          <Cpu className="h-5 w-5 mr-2 text-meta-teal" />
          MetaStream Desktop
          <div className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
            v{versions.app}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="system" className="w-full">
          <TabsList className="bg-meta-dark-blue border border-gray-700 mb-4">
            <TabsTrigger value="system" className="data-[state=active]:bg-meta-teal/10 data-[state=active]:text-meta-teal">System</TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-meta-teal/10 data-[state=active]:text-meta-teal">About</TabsTrigger>
          </TabsList>
          
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
          
          <TabsContent value="about">
            <div className="space-y-4">
              <p className="text-sm text-gray-300">
                MetaStream Desktop is a powerful streaming and recording application designed to rival OBS,
                with a focus on ease of use and modern features.
              </p>
              
              <Separator className="bg-gray-700" />
              
              <div className="space-y-2">
                <h3 className="text-white font-medium">Key Features</h3>
                <ul className="space-y-1">
                  <li className="text-sm text-gray-300 flex items-start">
                    <Zap className="h-4 w-4 text-meta-teal mr-2 mt-0.5" />
                    Direct streaming to Twitch, YouTube, and Facebook
                  </li>
                  <li className="text-sm text-gray-300 flex items-start">
                    <Zap className="h-4 w-4 text-meta-teal mr-2 mt-0.5" />
                    Hardware-accelerated encoding for minimal CPU usage
                  </li>
                  <li className="text-sm text-gray-300 flex items-start">
                    <Zap className="h-4 w-4 text-meta-teal mr-2 mt-0.5" />
                    Scene and source management with transitions
                  </li>
                  <li className="text-sm text-gray-300 flex items-start">
                    <Zap className="h-4 w-4 text-meta-teal mr-2 mt-0.5" />
                    AI-powered features like background removal and auto-framing
                  </li>
                  <li className="text-sm text-gray-300 flex items-start">
                    <Zap className="h-4 w-4 text-meta-teal mr-2 mt-0.5" />
                    Built-in video editor for creating clips and highlights
                  </li>
                </ul>
              </div>
              
              <div className="bg-meta-dark-blue/50 p-3 rounded-md border border-meta-teal/30 flex items-start">
                <Info className="h-5 w-5 text-meta-teal mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-300">
                    <strong className="text-white">Note:</strong> For the best streaming experience, 
                    we recommend using a dedicated GPU for encoding and a high-speed internet connection
                    with at least 5Mbps upload speed.
                  </p>
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
