
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppContext } from '@/contexts/AppContext';
import StreamStatusIndicator from '@/components/stream/StreamStatusIndicator';
import StreamControls from '@/components/stream/StreamControls';
import PreviewContainer from '@/components/stream/PreviewContainer';

const StreamPreview = () => {
  const { 
    streamStatus, 
    isStreamPreviewAvailable, 
    isRecording,
    sources
  } = useAppContext();
  
  // Get active status of different source types
  const isCameraActive = sources.some(s => s.type === 'camera' && s.active);
  const isMicActive = sources.some(s => s.type === 'audio' && s.active);
  const isScreenShareActive = sources.some(s => s.type === 'display' && s.active);

  return (
    <Card className="h-full glass-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-white">Preview</CardTitle>
        <div className="flex items-center space-x-2">
          <StreamStatusIndicator streamStatus={streamStatus} />
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <PreviewContainer 
          isStreamPreviewAvailable={isStreamPreviewAvailable}
          isCameraActive={isCameraActive}
          isMicActive={isMicActive}
          isScreenShareActive={isScreenShareActive}
        />
        
        <StreamControls 
          streamStatus={streamStatus}
          isRecording={isRecording}
        />
      </CardContent>
    </Card>
  );
};

export default StreamPreview;
