
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Computer, Headset, Mic, Plus, Video } from 'lucide-react';

const sources = [
  {
    id: 1,
    name: "Webcam",
    type: "camera",
    icon: <Camera className="h-4 w-4" />,
    active: true,
  },
  {
    id: 2,
    name: "Desktop",
    type: "display",
    icon: <Computer className="h-4 w-4" />,
    active: false,
  },
  {
    id: 3,
    name: "Microphone",
    type: "audio",
    icon: <Mic className="h-4 w-4" />,
    active: true,
  },
  {
    id: 4,
    name: "VR Headset",
    type: "vr",
    icon: <Headset className="h-4 w-4" />,
    active: false,
  },
  {
    id: 5,
    name: "Media File",
    type: "media",
    icon: <Video className="h-4 w-4" />,
    active: false,
  }
];

const SourcesList = () => {
  return (
    <Card className="h-full glass-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-white">Sources</CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-meta-teal/10 hover:text-meta-teal">
          <Plus className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-2">
          {sources.map((source) => (
            <div 
              key={source.id}
              className={`p-3 rounded-md cursor-pointer transition-all ${
                source.active 
                  ? 'bg-meta-teal/10 border border-meta-teal/30 text-white' 
                  : 'border border-transparent hover:bg-secondary/50 text-gray-300'
              }`}
            >
              <div className="flex items-center">
                <div className={`mr-2 ${source.active ? 'text-meta-teal' : 'text-gray-400'}`}>
                  {source.icon}
                </div>
                <span className="font-medium">{source.name}</span>
                {source.active && (
                  <div className="ml-auto">
                    <div className="h-2 w-2 bg-meta-teal rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SourcesList;
