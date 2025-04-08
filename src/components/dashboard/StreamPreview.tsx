
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, LayoutPanelTop, Mic, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/hooks/use-toast';

const StreamPreview = () => {
  const { 
    streamStatus, 
    isStreamPreviewAvailable, 
    startStream, 
    stopStream, 
    testStream, 
    toggleSourceActive, 
    sources 
  } = useAppContext();
  
  const handleCameraToggle = () => {
    const cameraSource = sources.find(source => source.type === 'camera');
    if (cameraSource) {
      toggleSourceActive(cameraSource.id);
    } else {
      toast({
        title: 'Camera Not Found',
        description: 'No camera source is available.',
        variant: 'destructive',
      });
    }
  };
  
  const handleMicToggle = () => {
    const micSource = sources.find(source => source.type === 'audio');
    if (micSource) {
      toggleSourceActive(micSource.id);
    } else {
      toast({
        title: 'Microphone Not Found',
        description: 'No microphone source is available.',
        variant: 'destructive',
      });
    }
  };
  
  const handleLayoutToggle = () => {
    toast({
      title: 'Layout Options',
      description: 'Layout customization will be available in the next update.',
    });
  };
  
  const handleWandToggle = () => {
    toast({
      title: 'AI Enhancement',
      description: 'AI enhancements will be available in the next update.',
    });
  };

  return (
    <Card className="h-full glass-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-white">Preview</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {streamStatus === 'live' ? (
              <>
                <div className="h-2 w-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-xs text-red-500">Live</span>
              </>
            ) : (
              <>
                <div className="h-2 w-2 bg-meta-teal rounded-full mr-2 animate-pulse"></div>
                <span className="text-xs text-meta-teal">Offline</span>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="aspect-video bg-gray-900 rounded-md mb-4 flex items-center justify-center relative overflow-hidden border border-meta-teal/20">
          <div className="absolute inset-0 flex items-center justify-center">
            {isStreamPreviewAvailable ? (
              <div className="text-center">
                <div className="w-full h-full bg-gradient-to-tr from-meta-dark-blue/80 to-meta-slate/80 absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center animate-pulse">
                    <Camera className="h-12 w-12 text-meta-teal mb-2" />
                    <p className="text-meta-teal">Camera Active</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <Camera className="h-12 w-12 mx-auto text-meta-teal/40 mb-2" />
                <p className="text-gray-400">No active video source</p>
                <p className="text-xs text-gray-500 mt-1">Connect a camera or select a source to see a preview</p>
              </div>
            )}
          </div>
          
          {/* Overlay controls */}
          <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-between bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-8 w-8 text-white hover:bg-white/20 bg-black/40 ${
                  sources.find(s => s.type === 'camera' && s.active) ? 'text-meta-teal' : 'text-white'
                }`}
                onClick={handleCameraToggle}
              >
                <Camera className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-8 w-8 text-white hover:bg-white/20 bg-black/40 ${
                  sources.find(s => s.type === 'audio' && s.active) ? 'text-meta-teal' : 'text-white'
                }`}
                onClick={handleMicToggle}
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:bg-white/20 bg-black/40"
                onClick={handleLayoutToggle}
              >
                <LayoutPanelTop className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-white hover:bg-white/20 bg-black/40"
              onClick={handleWandToggle}
            >
              <Wand2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex justify-between">
          {streamStatus === 'live' ? (
            <Button 
              variant="outline" 
              className="border-red-500/30 hover:bg-red-500/10 text-red-400 flex-1"
              onClick={stopStream}
            >
              Stop Stream
            </Button>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="border-meta-teal/30 hover:bg-meta-teal/10 flex-1 mr-2"
                onClick={testStream}
              >
                Test Stream
              </Button>
              <Button 
                className="bg-button-gradient text-meta-dark-blue hover:brightness-110 flex-1"
                onClick={startStream}
              >
                Go Live
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StreamPreview;
