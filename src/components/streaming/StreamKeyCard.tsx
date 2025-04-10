
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, Eye, EyeOff, CopyCheck } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const StreamKeyCard: React.FC = () => {
  const [showStreamKey, setShowStreamKey] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const tiktokRtmpUrl = "rtmp://rtmp-push.tiktok.com/live";
  const streamKey = "your-tiktok-stream-key"; // In production, this would be retrieved from user's account

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(tiktokRtmpUrl);
    setCopiedUrl(true);
    toast({
      title: "URL Copied",
      description: "TikTok RTMP URL copied to clipboard",
    });
    
    setTimeout(() => setCopiedUrl(false), 3000);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(streamKey);
    setCopiedKey(true);
    toast({
      title: "Key Copied",
      description: "TikTok Stream key copied to clipboard",
    });
    
    setTimeout(() => setCopiedKey(false), 3000);
  };

  const toggleShowKey = () => {
    setShowStreamKey(!showStreamKey);
  };

  return (
    <Card className="glass-card mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">TikTok Stream Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">TikTok RTMP URL</label>
            <div className="relative">
              <input 
                type="text" 
                value={tiktokRtmpUrl}
                className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 pl-3 pr-10 text-white"
                readOnly
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1 h-8 w-8 hover:bg-meta-teal/10 text-gray-400"
                onClick={handleCopyUrl}
              >
                {copiedUrl ? <CopyCheck className="h-4 w-4 text-meta-teal" /> : <Link className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">TikTok Stream Key</label>
            <div className="relative">
              <input 
                type={showStreamKey ? "text" : "password"} 
                value={streamKey}
                className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 pl-3 pr-20 text-white"
                readOnly
              />
              <div className="absolute right-1 top-1 flex">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 hover:bg-meta-teal/10 text-gray-400 mr-1"
                  onClick={toggleShowKey}
                >
                  {showStreamKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 hover:bg-meta-teal/10 text-gray-400"
                  onClick={handleCopyKey}
                >
                  {copiedKey ? <CopyCheck className="h-4 w-4 text-meta-teal" /> : <Link className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Keep your stream key private! Never share it with others.</p>
          </div>
          
          <div className="p-3 rounded-md bg-meta-teal/10 border border-meta-teal/30">
            <h4 className="text-white text-sm font-medium mb-1">How to go live on TikTok:</h4>
            <ol className="text-xs text-gray-400 list-decimal pl-4 space-y-1">
              <li>Copy the RTMP URL and Stream Key</li>
              <li>Make sure your TikTok account is verified and has live access</li>
              <li>Click "Go Live" to start streaming to TikTok</li>
              <li>Check your TikTok app to confirm your stream is visible</li>
            </ol>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full border-meta-teal/30 hover:bg-meta-teal/10 text-white"
            onClick={() => {
              toast({
                title: "Stream Key Refreshed",
                description: "Your TikTok stream key has been regenerated.",
              });
            }}
          >
            Generate New Stream Key
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreamKeyCard;
