
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
      const streams = getAllActiveStreams();
      const activeStreams = Object.values(streams);
      
      if (activeStreams.length > 0) {
        // First try to find a video stream
        const videoStream = activeStreams.find(stream => 
          stream.getVideoTracks().length > 0
        );
        
        if (videoStream && videoRef.current) {
          try {
            videoRef.current.srcObject = videoStream;
            videoRef.current.onloadedmetadata = () => {
              videoRef.current?.play().catch(e => console.error("Error playing video:", e));
            };
          } catch (error) {
            console.error('Error setting video stream:', error);
          }
        } else if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      } else if (videoRef.current) {
        videoRef.current.srcObject = null;
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
