
import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Mic, User, Settings, Play, LayoutPanelTop } from 'lucide-react';

const Studio = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <div className="min-h-screen bg-meta-slate">
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Header sidebarCollapsed={sidebarCollapsed} />
      
      <main className={`pt-20 px-4 pb-4 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main preview area */}
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-white">Live Studio</CardTitle>
                <Button variant="outline" className="bg-red-500/20 border-red-500/40 text-red-400 hover:bg-red-500/30">
                  <Play className="h-4 w-4 mr-2" /> Go Live
                </Button>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-900 rounded-md mb-4 flex items-center justify-center relative overflow-hidden border border-meta-teal/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-tr from-meta-dark-blue/80 to-meta-slate/80 absolute inset-0 flex items-center justify-center">
                      <div className="flex flex-col items-center">
                        <Camera className="h-12 w-12 text-meta-teal mb-2" />
                        <p className="text-meta-teal">Studio Preview</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <Button variant="outline" className="flex items-center justify-center border-meta-teal/30 hover:bg-meta-teal/10">
                    <Camera className="h-4 w-4 mr-2" />
                    Camera
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center border-meta-teal/30 hover:bg-meta-teal/10">
                    <Mic className="h-4 w-4 mr-2" />
                    Audio
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center border-meta-teal/30 hover:bg-meta-teal/10">
                    <LayoutPanelTop className="h-4 w-4 mr-2" />
                    Layout
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center border-meta-teal/30 hover:bg-meta-teal/10">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Control sidebar */}
          <div className="lg:col-span-1">
            <div className="grid grid-cols-1 gap-4">
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white">Live Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Stream Quality</span>
                      <span className="text-sm text-meta-teal">1080p60</span>
                    </div>
                    <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-meta-teal w-3/4 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Connection</span>
                      <span className="text-sm text-meta-teal">Excellent</span>
                    </div>
                    <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-meta-teal w-full rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-md bg-meta-teal/10 border border-meta-teal/30">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-meta-teal mr-2" />
                      <div>
                        <p className="text-white text-sm font-medium">0 viewers</p>
                        <p className="text-xs text-gray-400">Ready to go live</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-button-gradient text-meta-dark-blue hover:brightness-110">
                    Start Broadcasting
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white">Chat</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex flex-col items-center justify-center border border-dashed border-gray-700 rounded-md">
                    <p className="text-gray-500 text-sm">No messages yet</p>
                    <p className="text-gray-600 text-xs mt-1">Chat will appear here when live</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Studio;
