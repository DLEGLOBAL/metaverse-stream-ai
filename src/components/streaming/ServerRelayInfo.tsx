
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Server, ChevronDown, ChevronUp, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useAppContext } from '@/contexts/AppContext';

const ServerRelayInfo = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { isRelayServerAvailable } = useAppContext();
  
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center">
          <Server className="h-5 w-5 mr-2 text-meta-teal" />
          Streaming Relay
          {isRelayServerAvailable && (
            <div className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
              Available
            </div>
          )}
          {!isRelayServerAvailable && (
            <div className="ml-2 px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
              Not Connected
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="direct" className="w-full">
          <TabsList className="bg-meta-dark-blue border border-gray-700 mb-4">
            <TabsTrigger value="direct" className="data-[state=active]:bg-meta-teal/10 data-[state=active]:text-meta-teal">Browser Streaming</TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-meta-teal/10 data-[state=active]:text-meta-teal">Tech Details</TabsTrigger>
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
                Our streaming solution uses a WebSocket relay architecture to convert your browser stream to RTMP format
                suitable for platforms like Twitch, YouTube, and Facebook.
              </p>
              
              <Separator className="bg-gray-700" />
              
              <div className="space-y-2">
                <h3 className="text-white font-medium">How It Works</h3>
                <p className="text-sm text-gray-300">
                  1. Your browser captures webcam/microphone/screen using MediaStream API
                </p>
                <p className="text-sm text-gray-300">
                  2. MediaRecorder converts this to WebM format and sends to our relay server via WebSocket
                </p>
                <p className="text-sm text-gray-300">
                  3. Server uses FFmpeg to transcode to H.264/AAC format needed for RTMP
                </p>
                <p className="text-sm text-gray-300">
                  4. Server pushes the stream to your configured streaming platforms
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-white font-medium">Self-Hosted Option</h3>
                <p className="text-sm text-gray-300">
                  You can run your own Node.js relay server with this stack:
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <div className="bg-meta-dark-blue/70 px-3 py-1 rounded text-xs text-white">node-media-server</div>
                  <div className="bg-meta-dark-blue/70 px-3 py-1 rounded text-xs text-white">ffmpeg</div>
                  <div className="bg-meta-dark-blue/70 px-3 py-1 rounded text-xs text-white">express</div>
                  <div className="bg-meta-dark-blue/70 px-3 py-1 rounded text-xs text-white">ws</div>
                </div>
                <Button
                  variant="outline"
                  className="border-meta-teal/30 hover:bg-meta-teal/10 text-white flex items-center mt-2"
                  onClick={() => window.open('https://github.com/illuspas/Node-Media-Server', '_blank')}
                >
                  <Code className="h-4 w-4 mr-2" /> Node Media Server <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </div>
              
              <div className="bg-meta-dark-blue/50 p-3 rounded-md border border-meta-teal/30">
                <p className="text-sm text-gray-300">
                  <strong className="text-white">Note:</strong> Our relay server automatically handles stream formatting 
                  and distribution to multiple platforms simultaneously based on your configured stream keys.
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
