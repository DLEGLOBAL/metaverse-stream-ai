
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Settings } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import MediaDeviceSettings from '@/components/streaming/MediaDeviceSettings';

const SourcesList = () => {
  const { sources, toggleSourceActive } = useAppContext();
  const [showSettings, setShowSettings] = useState(false);

  const handleAddSource = () => {
    toast({
      title: 'Feature Coming Soon',
      description: 'Adding new sources will be available in the next update',
    });
  };
  
  const handleShowDeviceSettings = () => {
    setShowSettings(true);
  };

  return (
    <>
      <Card className="h-full glass-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-white">Sources</CardTitle>
          <div className="flex space-x-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 hover:bg-meta-teal/10 hover:text-meta-teal"
              onClick={handleShowDeviceSettings}
              title="Configure devices"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 hover:bg-meta-teal/10 hover:text-meta-teal"
              onClick={handleAddSource}
              title="Add source"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
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
                onClick={() => toggleSourceActive(source.id)}
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
      
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-[600px] bg-meta-dark-blue border-meta-teal/20">
          <DialogHeader>
            <DialogTitle className="text-white">Device Settings</DialogTitle>
          </DialogHeader>
          <MediaDeviceSettings />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SourcesList;
