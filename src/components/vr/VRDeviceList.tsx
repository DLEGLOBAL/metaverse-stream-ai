
import React from 'react';
import { Button } from '@/components/ui/card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Headset, Camera, RefreshCw, Gamepad2 } from 'lucide-react';

interface VRDeviceListProps {
  deviceConnected: boolean;
}

const VRDeviceList: React.FC<VRDeviceListProps> = ({ deviceConnected }) => {
  return (
    <Card className="glass-card h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">VR Devices</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className={`p-4 rounded-md border ${deviceConnected ? 'border-meta-teal/40 bg-meta-teal/10' : 'border-gray-700'}`}>
            <div className="flex items-center">
              <Headset className={`h-6 w-6 mr-3 ${deviceConnected ? 'text-meta-teal' : 'text-gray-400'}`} />
              <div>
                <p className="font-medium text-white">Meta Quest 3</p>
                <p className="text-xs text-gray-400">Standalone VR Headset</p>
              </div>
              <div className="ml-auto">
                {deviceConnected && (
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-meta-teal rounded-full mr-2 animate-pulse"></div>
                    <span className="text-xs text-meta-teal">Connected</span>
                  </div>
                )}
              </div>
            </div>
            
            {deviceConnected && (
              <div className="mt-3 pt-3 border-t border-gray-700">
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                  <div>Battery: <span className="text-meta-teal">82%</span></div>
                  <div>Resolution: <span className="text-meta-teal">2064 x 2208</span></div>
                  <div>Connection: <span className="text-meta-teal">WiFi</span></div>
                  <div>Latency: <span className="text-meta-teal">35ms</span></div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 rounded-md border border-gray-700">
            <div className="flex items-center">
              <Gamepad2 className="h-6 w-6 mr-3 text-gray-400" />
              <div>
                <p className="font-medium text-white">PCVR / SteamVR</p>
                <p className="text-xs text-gray-400">PC-Connected VR</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-md border border-gray-700">
            <div className="flex items-center">
              <Camera className="h-6 w-6 mr-3 text-gray-400" />
              <div>
                <p className="font-medium text-white">360° Camera</p>
                <p className="text-xs text-gray-400">External VR Camera</p>
              </div>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full border-meta-teal/30 hover:bg-meta-teal/10 text-white mt-2"
          >
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh Devices
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VRDeviceList;
