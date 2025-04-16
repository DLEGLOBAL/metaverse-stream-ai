
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OBSInstructions = () => {
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">How to Stream with OBS</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-300">
            To stream to Twitch, YouTube, or other platforms, you'll need to use OBS Studio with your stream settings from this app.
          </p>
          
          <div className="space-y-2">
            <h3 className="text-white font-medium">Step 1: Download OBS Studio</h3>
            <p className="text-sm text-gray-300">
              If you don't have OBS Studio yet, download and install it from the official website.
            </p>
            <Button
              variant="outline"
              className="border-meta-teal/30 hover:bg-meta-teal/10 text-white flex items-center"
              onClick={() => window.open('https://obsproject.com/download', '_blank')}
            >
              Download OBS Studio <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-white font-medium">Step 2: Configure OBS</h3>
            <p className="text-sm text-gray-300">
              Open OBS and go to Settings → Stream. Select your streaming service (Twitch, YouTube, etc.)
              and enter your Stream Key from this app.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-white font-medium">Step 3: Add Sources</h3>
            <p className="text-sm text-gray-300">
              In OBS, add the same sources you've enabled in this app:
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
              <li>Video Capture Device (for your webcam)</li>
              <li>Display Capture (for screen sharing)</li>
              <li>Audio Input Capture (for your microphone)</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-white font-medium">Step 4: Go Live!</h3>
            <p className="text-sm text-gray-300">
              Click "Start Streaming" in OBS to go live with your configured settings.
            </p>
          </div>
          
          <div className="bg-meta-dark-blue/50 p-3 rounded-md border border-meta-teal/30">
            <p className="text-sm text-gray-300">
              <strong className="text-white">Pro Tip:</strong> Use this app to prepare your stream layout, 
              test your camera and audio, and get your stream keys organized. Then use OBS for the actual broadcasting.
            </p>
          </div>
          
          <div>
            <Button
              variant="outline"
              className="border-meta-teal/30 hover:bg-meta-teal/10 text-white flex items-center"
              onClick={() => window.open('https://obsproject.com/wiki/OBS-Studio-Quickstart', '_blank')}
            >
              OBS Quickstart Guide <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OBSInstructions;
