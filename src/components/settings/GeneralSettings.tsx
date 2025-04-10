
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

const GeneralSettings = () => {
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">General Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-white font-medium mb-4">Application Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">Start MetaStream on system startup</p>
                  <p className="text-xs text-gray-400">Automatically start when you login</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">Auto-restore previous session</p>
                  <p className="text-xs text-gray-400">Remember your last open scenes and sources</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">Show system tray icon</p>
                  <p className="text-xs text-gray-400">Display MetaStream in your system tray</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Performance</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Process Priority
                  </label>
                  <select className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white">
                    <option>Normal</option>
                    <option selected>High</option>
                    <option>Realtime</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Color Format
                  </label>
                  <select className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white">
                    <option>NV12</option>
                    <option selected>I444</option>
                    <option>RGB</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">Enable hardware acceleration</p>
                  <p className="text-xs text-gray-400">Use GPU for encoding and processing</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">Use multiple CPU cores</p>
                  <p className="text-xs text-gray-400">Distribute processing across available cores</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Language & Region</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Language
                </label>
                <select className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white">
                  <option selected>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Japanese</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Time Format
                </label>
                <select className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white">
                  <option selected>12-hour (AM/PM)</option>
                  <option>24-hour</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralSettings;
