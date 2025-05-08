
import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import MediaPreview from './MediaPreview';
import PlatformErrorHandling from '@/components/streaming/PlatformErrorHandling';
import { useAppContext } from '@/contexts/AppContext';

interface MediaPreviewContentProps {
  isStreamPreviewAvailable: boolean;
}

const MediaPreviewContent: React.FC<MediaPreviewContentProps> = ({ isStreamPreviewAvailable }) => {
  const { sources, toggleSourceActive } = useAppContext();
  const [error, setError] = useState<{type: 'camera' | 'microphone' | 'display' | 'general' | 'server', message?: string} | null>(null);
  
  // Check for errors in console logs
  useEffect(() => {
    // Clear error state when a video source becomes available
    if (isStreamPreviewAvailable) {
      setError(null);
    }
  }, [isStreamPreviewAvailable]);

  // Listen for relay server errors
  useEffect(() => {
    const handleRelayError = (event: CustomEvent) => {
      console.log('Relay server error detected:', event.detail);
      setError({
        type: 'server',
        message: event.detail.message || 'Could not connect to the relay server'
      });
    };

    window.addEventListener('relay-server-error', handleRelayError as EventListener);
    
    return () => {
      window.removeEventListener('relay-server-error', handleRelayError as EventListener);
    };
  }, []);

  const handleRetry = () => {
    // Find the camera source
    const cameraSource = sources.find(source => source.type === 'camera');
    if (cameraSource) {
      toggleSourceActive(cameraSource.id);
    }
    
    // Reset error state
    setError(null);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {isStreamPreviewAvailable ? (
        <MediaPreview isStreamPreviewAvailable={isStreamPreviewAvailable} />
      ) : error ? (
        <div className="w-full p-4">
          <PlatformErrorHandling 
            errorType={error.type} 
            errorMessage={error.message} 
            onRetry={handleRetry} 
          />
        </div>
      ) : (
        <div className="text-center">
          <Camera className="h-12 w-12 mx-auto text-meta-teal/40 mb-2" />
          <p className="text-gray-400">No active video source</p>
          <p className="text-xs text-gray-500 mt-1">
            Enable a camera or screen share from the Sources panel
          </p>
        </div>
      )}
    </div>
  );
};

export default MediaPreviewContent;
