
import React, { useEffect, useRef } from 'react';
import { getAllActiveStreams } from '@/contexts/mediaUtils';

interface MediaPreviewProps {
  isStreamPreviewAvailable: boolean;
}

const MediaPreview: React.FC<MediaPreviewProps> = ({ isStreamPreviewAvailable }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (!videoRef.current) return;
    
    const setupStream = async () => {
      try {
        const streams = getAllActiveStreams();
        
        if (Object.keys(streams).length === 0) {
          console.log('No active streams available');
          if (videoRef.current) {
            videoRef.current.srcObject = null;
          }
          return;
        }
        
        console.log('Active streams:', Object.keys(streams));
        
        // First try to find a video stream
        const videoStreamKey = Object.keys(streams).find(key => 
          streams[key].getVideoTracks().length > 0
        );
        
        if (videoStreamKey && videoRef.current) {
          const videoStream = streams[videoStreamKey];
          console.log(`Found video stream: ${videoStreamKey} with ${videoStream.getVideoTracks().length} video tracks`);
          
          try {
            videoRef.current.srcObject = videoStream;
            videoRef.current.onloadedmetadata = () => {
              videoRef.current?.play().catch(e => console.error("Error playing video:", e));
            };
          } catch (error) {
            console.error('Error setting video stream:', error);
          }
        } else {
          console.log('No video tracks found in active streams');
          if (videoRef.current) {
            videoRef.current.srcObject = null;
          }
        }
      } catch (error) {
        console.error('Error in setupStream:', error);
      }
    };
    
    if (isStreamPreviewAvailable) {
      setupStream();
    } else if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    return () => {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [isStreamPreviewAvailable]);
  
  return (
    <div className="w-full h-full">
      <video 
        ref={videoRef} 
        className="w-full h-full object-cover rounded-md"
        autoPlay 
        playsInline 
        muted
      />
    </div>
  );
};

export default MediaPreview;
