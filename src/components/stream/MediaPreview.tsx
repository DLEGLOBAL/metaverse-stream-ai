
import React, { useEffect, useRef, useState } from 'react';
import { getAllActiveStreams } from '@/contexts/mediaUtils';
import { toast } from '@/hooks/use-toast';

interface MediaPreviewProps {
  isStreamPreviewAvailable: boolean;
}

const MediaPreview: React.FC<MediaPreviewProps> = ({ isStreamPreviewAvailable }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [streamReady, setStreamReady] = useState(false);
  
  useEffect(() => {
    if (!videoRef.current) return;
    
    const setupStream = async () => {
      try {
        const streams = getAllActiveStreams();
        
        if (Object.keys(streams).length === 0) {
          console.log('No active streams available');
          if (videoRef.current) {
            videoRef.current.srcObject = null;
            setStreamReady(false);
          }
          return;
        }
        
        // First try to find a video stream
        const videoStreamKey = Object.keys(streams).find(key => 
          streams[key].getVideoTracks().length > 0
        );
        
        if (videoStreamKey && videoRef.current) {
          const videoStream = streams[videoStreamKey];
          console.log(`Found video stream: ${videoStreamKey} with ${videoStream.getVideoTracks().length} video tracks`);
          
          try {
            // Create a new MediaStream that combines video and audio if available
            const combinedStream = new MediaStream();
            
            // Add video tracks
            videoStream.getVideoTracks().forEach(track => {
              combinedStream.addTrack(track);
            });
            
            // Add audio tracks if available
            if (streams.audio) {
              streams.audio.getAudioTracks().forEach(track => {
                combinedStream.addTrack(track);
              });
            }
            
            videoRef.current.srcObject = combinedStream;
            videoRef.current.onloadedmetadata = () => {
              videoRef.current?.play().catch(e => console.error("Error playing video:", e));
              setStreamReady(true);
              
              // Store the combined stream for RTMP broadcasting
              window.streamForBroadcast = combinedStream;
            };
          } catch (error) {
            console.error('Error setting video stream:', error);
            setStreamReady(false);
            toast({
              title: 'Stream Preview Error',
              description: 'Could not setup stream preview',
              variant: 'destructive',
            });
          }
        } else {
          console.log('No video tracks found in active streams');
          if (videoRef.current) {
            videoRef.current.srcObject = null;
            setStreamReady(false);
          }
        }
      } catch (error) {
        console.error('Error in setupStream:', error);
        setStreamReady(false);
      }
    };
    
    if (isStreamPreviewAvailable) {
      setupStream();
    } else if (videoRef.current) {
      videoRef.current.srcObject = null;
      setStreamReady(false);
    }
    
    return () => {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      // @ts-ignore - Custom property for streaming
      delete window.streamForBroadcast;
    };
  }, [isStreamPreviewAvailable]);
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      <video 
        ref={videoRef} 
        className="w-full h-full object-cover rounded-md bg-black"
        autoPlay 
        playsInline 
        muted
      />
      <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded text-xs text-white">
        {streamReady ? 'Preview Ready' : 'Preview'}
      </div>
    </div>
  );
};

// Add a custom property to the Window interface
declare global {
  interface Window {
    streamForBroadcast?: MediaStream;
  }
}

export default MediaPreview;
