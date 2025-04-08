
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/card';
import { Play, Headset, Camera, Smartphone, LinkIcon } from 'lucide-react';

interface VRPreviewProps {
  deviceConnected: boolean;
  handleStartCapture: () => void;
}

const VRPreview: React.FC<VRPreviewProps> = ({ deviceConnected, handleStartCapture }) => {
  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-white">VR Preview</CardTitle>
        <Button 
          className="bg-meta-teal/20 hover:bg-meta-teal/30 text-meta-teal border border-meta-teal/30"
          disabled={!deviceConnected}
          onClick={handleStartCapture}
        >
          <Play className="h-4 w-4 mr-2" /> Start Capture
        </Button>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gray-900 rounded-md flex items-center justify-center relative overflow-hidden border border-meta-teal/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-tr from-meta-dark-blue/80 to-meta-slate/80 absolute inset-0 flex items-center justify-center">
              {deviceConnected ? (
                <div className="flex flex-col items-center">
                  <Headset className="h-12 w-12 text-meta-teal mb-2" />
                  <p className="text-meta-teal">Meta Quest 3 Connected</p>
                  <p className="text-xs text-gray-400 mt-1">Ready to start capturing</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Headset className="h-12 w-12 text-meta-teal/40 mb-2" />
                  <p className="text-gray-400">No VR device connected</p>
                  <p className="text-xs text-gray-500 mt-1">Connect a VR headset to begin</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-meta-dark-blue p-3 rounded-md border border-meta-teal/20">
            <div className="flex items-center">
              <div className="bg-meta-teal/20 p-2 rounded-md mr-3">
                <Camera className="h-4 w-4 text-meta-teal" />
              </div>
              <div>
                <p className="text-sm text-white">First Person</p>
                <p className="text-xs text-gray-400">View from headset</p>
              </div>
            </div>
          </div>
          
          <div className="bg-meta-dark-blue p-3 rounded-md border border-meta-teal/20">
            <div className="flex items-center">
              <div className="bg-meta-teal/20 p-2 rounded-md mr-3">
                <Smartphone className="h-4 w-4 text-meta-teal" />
              </div>
              <div>
                <p className="text-sm text-white">Mixed Reality</p>
                <p className="text-xs text-gray-400">Blended view</p>
              </div>
            </div>
          </div>
          
          <div className="bg-meta-dark-blue p-3 rounded-md border border-meta-teal/20">
            <div className="flex items-center">
              <div className="bg-meta-teal/20 p-2 rounded-md mr-3">
                <LinkIcon className="h-4 w-4 text-meta-teal" />
              </div>
              <div>
                <p className="text-sm text-white">Third Person</p>
                <p className="text-xs text-gray-400">External view</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VRPreview;
