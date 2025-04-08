
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface VRStreamSettingsProps {
  deviceConnected: boolean;
}

const VRStreamSettings: React.FC<VRStreamSettingsProps> = ({ deviceConnected }) => {
  return (
    <Card className="glass-card mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">VR Stream Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Stream Resolution</label>
            <select className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white" disabled={!deviceConnected}>
              <option>1080p (Full HD)</option>
              <option selected>1440p (QHD)</option>
              <option>2160p (4K UHD)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Frame Rate</label>
            <select className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white" disabled={!deviceConnected}>
              <option>30 fps</option>
              <option selected>60 fps</option>
              <option>90 fps</option>
              <option>120 fps</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Bitrate</label>
            <select className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white" disabled={!deviceConnected}>
              <option>10 Mbps</option>
              <option>15 Mbps</option>
              <option selected>20 Mbps</option>
              <option>30 Mbps</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Encoding</label>
            <select className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white" disabled={!deviceConnected}>
              <option>Software (CPU)</option>
              <option selected>Hardware (GPU)</option>
              <option>Auto (Recommended)</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VRStreamSettings;
