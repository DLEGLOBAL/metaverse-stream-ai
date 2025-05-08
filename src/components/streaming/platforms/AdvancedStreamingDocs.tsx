
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Info, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const AdvancedStreamingDocs: React.FC = () => {
  return (
    <Card className="glass-card mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">Advanced RTMP Configuration Guide</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="tiktok">
          <TabsList className="mb-4">
            <TabsTrigger value="tiktok">TikTok Beta</TabsTrigger>
            <TabsTrigger value="instagram">Instagram Proxy</TabsTrigger>
            <TabsTrigger value="custom">Custom RTMP</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tiktok" className="space-y-4">
            <Alert variant="default" className="bg-meta-teal/10 border-meta-teal/30">
              <Info className="h-4 w-4 text-meta-teal" />
              <AlertTitle className="text-white">About TikTok Custom RTMP</AlertTitle>
              <AlertDescription className="text-gray-300">
                TikTok offers a limited beta program that allows direct RTMP streaming to their platform
                without requiring the TikTok mobile app.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <h3 className="text-md font-medium text-white">How to Use TikTok's Beta Program:</h3>
              <ol className="list-decimal pl-6 space-y-1 text-gray-300">
                <li>Apply for TikTok's Live Creator program if you haven't already</li>
                <li>Request access to the Custom RTMP Beta through TikTok's Creator Portal</li>
                <li>Once approved, TikTok will provide you with a custom RTMP URL and stream key</li>
                <li>Enable "TikTok Custom RTMP Beta Program" in the Stream Keys settings</li>
                <li>Enter the provided RTMP URL and stream key</li>
              </ol>
            </div>
            
            <Alert variant="destructive" className="bg-red-900/20 border-red-500/20">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important Note</AlertTitle>
              <AlertDescription>
                Beta access is limited and subject to TikTok's terms of service. Not all accounts are eligible.
              </AlertDescription>
            </Alert>
            
            <Button variant="outline" className="border-meta-teal/30 hover:bg-meta-teal/10 text-white" asChild>
              <a href="https://www.tiktok.com/creators/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" /> Visit TikTok Creator Portal
              </a>
            </Button>
          </TabsContent>
          
          <TabsContent value="instagram" className="space-y-4">
            <Alert variant="default" className="bg-meta-teal/10 border-meta-teal/30">
              <Info className="h-4 w-4 text-meta-teal" />
              <AlertTitle className="text-white">About Instagram Streaming Proxy</AlertTitle>
              <AlertDescription className="text-gray-300">
                Instagram requires a mobile device for live streaming. These proxy solutions allow you to
                stream from your browser by mimicking an Instagram mobile client.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <h3 className="text-md font-medium text-white">Available Proxy Solutions:</h3>
              
              <div className="p-3 rounded-md border border-gray-700 bg-meta-dark-blue/50">
                <h4 className="text-white font-medium">Yellow Duck</h4>
                <p className="text-gray-300 text-sm mt-1">
                  Open-source middleware that creates a virtual mobile client to broadcast to Instagram.
                </p>
                <div className="mt-2">
                  <Button size="sm" variant="outline" className="border-meta-teal/30 hover:bg-meta-teal/10 text-white" asChild>
                    <a href="https://github.com/yellowduck-blog/yellowduck" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1" /> Yellow Duck GitHub
                    </a>
                  </Button>
                </div>
              </div>
              
              <div className="p-3 rounded-md border border-gray-700 bg-meta-dark-blue/50">
                <h4 className="text-white font-medium">Android Emulator</h4>
                <p className="text-gray-300 text-sm mt-1">
                  Uses an Android emulator with Instagram installed, and an RTMP server to receive your stream.
                </p>
                <div className="mt-2">
                  <Button size="sm" variant="outline" className="border-meta-teal/30 hover:bg-meta-teal/10 text-white text-xs" disabled>
                    <Info className="h-3 w-3 mr-1" /> Requires local setup
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-md font-medium text-white">Setup Instructions:</h3>
              <ol className="list-decimal pl-6 space-y-1 text-gray-300">
                <li>Install and run your preferred proxy solution on your local machine</li>
                <li>Enable "Instagram Streaming Proxy" in the Stream Keys settings</li>
                <li>Select the proxy type you're using</li>
                <li>Set the RTMP URL if different from the default</li>
                <li>When going live, the stream will be sent to your proxy, which relays it to Instagram</li>
              </ol>
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-4">
            <Alert variant="default" className="bg-meta-teal/10 border-meta-teal/30">
              <Info className="h-4 w-4 text-meta-teal" />
              <AlertTitle className="text-white">Custom RTMP Destinations</AlertTitle>
              <AlertDescription className="text-gray-300">
                You can stream to any custom RTMP server by configuring the appropriate URL and stream key.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <h3 className="text-md font-medium text-white">Common RTMP Server Types:</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 rounded-md border border-gray-700 bg-meta-dark-blue/50">
                  <h4 className="text-white font-medium">Nginx RTMP</h4>
                  <p className="text-gray-300 text-sm mt-1">
                    Self-hosted RTMP server using Nginx with the RTMP module.
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    URL format: rtmp://your-server/live
                  </p>
                </div>
                
                <div className="p-3 rounded-md border border-gray-700 bg-meta-dark-blue/50">
                  <h4 className="text-white font-medium">Wowza</h4>
                  <p className="text-gray-300 text-sm mt-1">
                    Enterprise media server with advanced streaming capabilities.
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    URL format: rtmp://your-wowza-server/app
                  </p>
                </div>
                
                <div className="p-3 rounded-md border border-gray-700 bg-meta-dark-blue/50">
                  <h4 className="text-white font-medium">SRT Protocol</h4>
                  <p className="text-gray-300 text-sm mt-1">
                    For low-latency streaming over unreliable networks.
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    URL format: srt://your-server:port (requires SRT relay)
                  </p>
                </div>
                
                <div className="p-3 rounded-md border border-gray-700 bg-meta-dark-blue/50">
                  <h4 className="text-white font-medium">WHIP Protocol</h4>
                  <p className="text-gray-300 text-sm mt-1">
                    Modern WebRTC-based streaming protocol.
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    URL format: https://your-server/whip/endpoint
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

export default AdvancedStreamingDocs;
