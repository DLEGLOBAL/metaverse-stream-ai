
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
      
      console.log('Available streams for preview:', activeStreams.length);
      
      if (activeStreams.length > 0) {
        // First try to find a video stream
        const videoStream = activeStreams.find(stream => 
          stream.getVideoTracks().length > 0
        );
        
        if (videoStream && videoRef.current) {
          console.log('Setting video stream to preview:', videoStream.id);
          console.log('Video tracks:', videoStream.getVideoTracks().length);
          
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
      } else {
        console.log('No active streams available');
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      }
    };
    
    // Setup stream immediately and when isStreamPreviewAvailable changes
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
      {/* Debug overlay - will help us see if video is loaded but not visible */}
      <div className="absolute bottom-2 left-2 text-xs bg-black/70 text-white px-2 py-1 rounded">
        Stream: {isStreamPreviewAvailable ? 'Available' : 'Unavailable'}
      </div>
    </div>
  );
};

export default MediaPreview;
