
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const StreamKeyCard: React.FC = () => {
  const handleCopyUrl = () => {
    navigator.clipboard.writeText("rtmp://live.metastream.ai/stream");
    toast({
      title: "URL Copied",
      description: "Stream URL copied to clipboard",
    });
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText("stream-key-xxxx-xxxx-xxxx");
    toast({
      title: "Key Copied",
      description: "Stream key copied to clipboard",
    });
  };

  return (
    <Card className="glass-card mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">Stream Key & URL</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Server URL</label>
            <div className="relative">
              <input 
                type="text" 
                value="rtmp://live.metastream.ai/stream"
                className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 pl-3 pr-10 text-white"
                readOnly
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1 h-8 w-8 hover:bg-meta-teal/10 text-gray-400"
                onClick={handleCopyUrl}
              >
                <Link className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Stream Key</label>
            <div className="relative">
              <input 
                type="password" 
                value="stream-key-xxxx-xxxx-xxxx"
                className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 pl-3 pr-10 text-white"
                readOnly
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1 h-8 w-8 hover:bg-meta-teal/10 text-gray-400"
                onClick={handleCopyKey}
              >
                <Link className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Keep your stream key private! Never share it with others.</p>
          </div>
          
          <Button variant="outline" className="w-full border-meta-teal/30 hover:bg-meta-teal/10 text-white">
            Reset Stream Key
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreamKeyCard;
