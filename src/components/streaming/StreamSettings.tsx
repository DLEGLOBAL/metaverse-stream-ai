
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const StreamSettings: React.FC = () => {
  return (
    <Card className="glass-card mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">Stream Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Video Quality</label>
            <select className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white">
              <option>720p 30fps (1.5-4 Mbps)</option>
              <option selected>1080p 60fps (4-6 Mbps)</option>
              <option>1440p 60fps (9-18 Mbps)</option>
              <option>4K 30fps (13-34 Mbps)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Encoder</label>
            <select className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white">
              <option>x264 (Software)</option>
              <option selected>NVENC (Hardware)</option>
              <option>AMD AMF (Hardware)</option>
              <option>Intel QuickSync (Hardware)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Bitrate</label>
            <div className="flex space-x-3">
              <input 
                type="range" 
                className="flex-1 accent-meta-teal"
                min="2000"
                max="10000"
                step="500"
                defaultValue="6000"
              />
              <div className="bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white text-sm w-28 text-center">
                6000 kbps
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Keyframe Interval</label>
            <select className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white">
              <option>1 second</option>
              <option selected>2 seconds</option>
              <option>3 seconds</option>
              <option>5 seconds</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <Button className="bg-button-gradient text-meta-dark-blue hover:brightness-110">
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreamSettings;
