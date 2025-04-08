
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, LayoutPanelTop, Mic, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StreamPreview = () => {
  return (
    <Card className="h-full glass-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-white">Preview</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="h-2 w-2 bg-meta-teal rounded-full mr-2 animate-pulse"></div>
            <span className="text-xs text-meta-teal">Offline</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="aspect-video bg-gray-900 rounded-md mb-4 flex items-center justify-center relative overflow-hidden border border-meta-teal/20">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Placeholder preview */}
            <div className="text-center">
              <Camera className="h-12 w-12 mx-auto text-meta-teal/40 mb-2" />
              <p className="text-gray-400">No active video source</p>
              <p className="text-xs text-gray-500 mt-1">Connect a camera or select a source to see a preview</p>
            </div>
          </div>
          
          {/* Overlay controls */}
          <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-between bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20 bg-black/40">
                <Camera className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20 bg-black/40">
                <Mic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20 bg-black/40">
                <LayoutPanelTop className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20 bg-black/40">
              <Wand2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" className="border-meta-teal/30 hover:bg-meta-teal/10 flex-1 mr-2">
            Test Stream
          </Button>
          <Button className="bg-button-gradient text-meta-dark-blue hover:brightness-110 flex-1">
            Go Live
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreamPreview;
