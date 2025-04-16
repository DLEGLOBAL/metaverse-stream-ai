
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const ServerRelayInfo = () => {
  return (
    <Card className="glass-card mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center">
          <Server className="h-5 w-5 mr-2 text-meta-teal" />
          Server-Side Streaming Relay
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-300">
            For advanced users: To stream directly from your browser to Twitch, you'll need to set up a 
            server-side relay that handles the RTMP protocol conversion.
          </p>
          
          <Separator className="bg-gray-700" />
          
          <div className="space-y-2">
            <h3 className="text-white font-medium">Option 1: Self-Hosted Relay</h3>
            <p className="text-sm text-gray-300">
              Set up your own Node.js server using libraries like node-media-server to create a WebRTC to RTMP relay.
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
            <h3 className="text-white font-medium">Option 2: Streaming Service</h3>
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
              server infrastructure and technical knowledge. For most users, OBS is the simpler solution.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServerRelayInfo;
