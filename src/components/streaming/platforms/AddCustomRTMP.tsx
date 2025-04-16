
import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { toast } from '@/hooks/use-toast';

const AddCustomRTMP: React.FC = () => {
  const [serviceName, setServiceName] = useState('');
  const [rtmpUrl, setRtmpUrl] = useState('');
  const [streamKey, setStreamKey] = useState('');

  const handleSubmit = () => {
    if (!serviceName || !rtmpUrl || !streamKey) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    // TODO: Implement the actual functionality to add a custom RTMP destination
    toast({
      title: "Custom RTMP Added",
      description: `${serviceName} has been added as a custom destination`,
    });
    
    // Reset form
    setServiceName('');
    setRtmpUrl('');
    setStreamKey('');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="p-4 rounded-md border border-dashed border-gray-700 bg-transparent cursor-pointer">
          <div className="flex items-center justify-center">
            <Button 
              variant="ghost" 
              className="border-meta-teal/30 hover:bg-meta-teal/10 text-white"
            >
              <Globe className="h-4 w-4 mr-2" /> Add Custom RTMP Destination
            </Button>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="bg-meta-dark-blue border-meta-teal/30 text-white">
        <SheetHeader>
          <SheetTitle className="text-white">Add RTMP Destination</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Service Name</label>
              <input
                className="w-full bg-meta-slate border border-meta-teal/30 rounded-md py-2 px-3 text-white"
                placeholder="Custom Service"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">RTMP URL</label>
              <input
                className="w-full bg-meta-slate border border-meta-teal/30 rounded-md py-2 px-3 text-white"
                placeholder="rtmp://your-rtmp-server.com/live"
                value={rtmpUrl}
                onChange={(e) => setRtmpUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Stream Key</label>
              <input
                className="w-full bg-meta-slate border border-meta-teal/30 rounded-md py-2 px-3 text-white"
                placeholder="your-stream-key"
                type="password"
                value={streamKey}
                onChange={(e) => setStreamKey(e.target.value)}
              />
            </div>
            <Button 
              className="w-full bg-button-gradient text-meta-dark-blue hover:brightness-110 mt-4"
              onClick={handleSubmit}
            >
              Add Destination
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddCustomRTMP;
