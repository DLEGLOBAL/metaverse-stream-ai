
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Server, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const ServerRelayInfo = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center">
          <Server className="h-5 w-5 mr-2 text-meta-teal" />
          Streaming Relay
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="direct" className="w-full">
          <TabsList className="bg-meta-dark-blue border border-gray-700 mb-4">
            <TabsTrigger value="direct" className="data-[state=active]:bg-meta-teal/10 data-[state=active]:text-meta-teal">Direct Streaming</TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-meta-teal/10 data-[state=active]:text-meta-teal">Advanced Options</TabsTrigger>
          </TabsList>
          
          <TabsContent value="direct">
            <div className="space-y-4">
              <p className="text-sm text-gray-300">
                Stream directly to Twitch, YouTube, and other platforms using our browser-based relay server.
              </p>
              
              <div className="space-y-2">
                <h3 className="text-white font-medium">Step 1: Configure Stream Keys</h3>
                <p className="text-sm text-gray-300">
                  Add your stream keys for each platform you want to stream to in the Stream Keys section.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-white font-medium">Step 2: Set Up Sources</h3>
                <p className="text-sm text-gray-300">
                  Enable your webcam, screen share, and audio sources in the Sources panel.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-white font-medium">Step 3: Go Live!</h3>
                <p className="text-sm text-gray-300">
                  Click "Start Streaming" to begin broadcasting directly from your browser.
                </p>
              </div>
              
              <div className="bg-meta-dark-blue/50 p-3 rounded-md border border-meta-teal/30">
                <p className="text-sm text-gray-300">
                  <strong className="text-white">Note:</strong> For the best streaming experience, 
                  we recommend using a high-speed internet connection with at least 5Mbps upload speed.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced">
            <div className="space-y-4">
              <p className="text-sm text-gray-300">
                For advanced users: Our streaming solution uses a server-side relay that handles 
                the WebRTC to RTMP protocol conversion, allowing you to stream directly from your browser.
              </p>
              
              <Separator className="bg-gray-700" />
              
              <div className="space-y-2">
                <h3 className="text-white font-medium">Self-Hosted Relay Option</h3>
                <p className="text-sm text-gray-300">
                  You can set up your own Node.js server using libraries like node-media-server to create 
                  a WebRTC to RTMP relay.
                </p>
                <Button
                  variant="outline"
                  className="border-meta-teal/30 hover:bg-meta-teal/10 text-white flex items-center"
                  onClick={() => window.open('https://github.com/illuspas/Node-Media-Server', '_blank')}
                >
                  Node Media Server <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-white font-medium">Streaming Service Option</h3>
                <p className="text-sm text-gray-300">
                  Use a third-party service that offers browser-to-RTMP conversion capabilities:
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                  <li>Mux Video</li>
                  <li>Agora.io</li>
                  <li>LiveKit</li>
                </ul>
                <Button
                  variant="outline"
                  className="border-meta-teal/30 hover:bg-meta-teal/10 text-white flex items-center mt-2"
                  onClick={() => window.open('https://www.mux.com/', '_blank')}
                >
                  Mux Video <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </div>
              
              <div className="bg-meta-dark-blue/50 p-3 rounded-md border border-meta-teal/30">
                <p className="text-sm text-gray-300">
                  <strong className="text-white">Note:</strong> Setting up a streaming relay requires 
                  server infrastructure and technical knowledge. Our embedded relay service handles this 
                  for you automatically.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <Button
          variant="ghost"
          className="w-full mt-4 flex items-center justify-center text-gray-400 hover:text-white hover:bg-meta-teal/10"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? (
            <>
              Hide Advanced Options <ChevronUp className="h-4 w-4 ml-1" />
            </>
          ) : (
            <>
              Show Advanced Options <ChevronDown className="h-4 w-4 ml-1" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServerRelayInfo;
