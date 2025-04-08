
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

const SmartGreenScreenPanel: React.FC = () => {
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">Smart Green Screen</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="aspect-video bg-gray-900 rounded-md flex items-center justify-center relative overflow-hidden border border-meta-teal/20">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-tr from-meta-dark-blue/80 to-meta-slate/80 absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <Camera className="h-12 w-12 text-meta-teal mb-2" />
                  <p className="text-meta-teal">Background Removal Preview</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-meta-dark-blue p-4 rounded-md border border-meta-teal/20 h-full">
              <h3 className="text-white font-medium mb-3">Background Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Background Type</label>
                  <select className="w-full bg-meta-slate border border-meta-teal/30 rounded-md py-2 px-3 text-white">
                    <option>None (Transparent)</option>
                    <option selected>Blur</option>
                    <option>Virtual Background</option>
                    <option>Color Fill</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Edge Detection</label>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Precision</span>
                    <span>75%</span>
                  </div>
                  <input 
                    type="range" 
                    className="w-full accent-meta-teal"
                    min="0"
                    max="100"
                    value="75"
                  />
                </div>
                
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Processing Quality</label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" className="border-meta-teal/30 text-white">Low</Button>
                    <Button variant="outline" size="sm" className="border-meta-teal bg-meta-teal/20 text-white">Medium</Button>
                    <Button variant="outline" size="sm" className="border-meta-teal/30 text-white">High</Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Higher quality uses more CPU resources</p>
                </div>
              </div>
              
              <div className="mt-4">
                <Button className="bg-button-gradient text-meta-dark-blue hover:brightness-110 w-full">
                  Apply Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartGreenScreenPanel;
