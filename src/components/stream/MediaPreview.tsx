
import React, { useEffect, useRef } from 'react';
import { getAllActiveStreams } from '@/contexts/mediaUtils';

interface MediaPreviewProps {
  isStreamPreviewAvailable: boolean;
}

const MediaPreview: React.FC<MediaPreviewProps> = ({ isStreamPreviewAvailable }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (!isStreamPreviewAvailable || !videoRef.current) return;
    
    const streams = getAllActiveStreams();
    const activeStreams = Object.values(streams);
    
    console.log('Available streams for preview:', activeStreams.length);
    
    if (activeStreams.length > 0) {
      // If we have multiple active streams, we should technically combine them
      // For simplicity, we'll just show the first video stream
      const videoStream = activeStreams.find(stream => 
        stream.getVideoTracks().length > 0
      );
      
      if (videoStream && videoRef.current) {
        console.log('Setting video stream to preview');
        videoRef.current.srcObject = videoStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(e => console.error("Error playing video:", e));
        };
      } else {
        console.log('No video tracks found in active streams');
      }
    }
    
    return () => {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [isStreamPreviewAvailable]);
  
  return (
    <div className="w-full h-full">
      {isStreamPreviewAvailable ? (
        <video 
          ref={videoRef} 
          className="w-full h-full object-cover rounded-md"
          autoPlay 
          playsInline 
          muted
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-900 rounded-md">
          <p className="text-gray-400">No active video source</p>
        </div>
      )}
    </div>
  );
};

export default MediaPreview;
