
import React from 'react';
import { Camera } from 'lucide-react';
import MediaPreview from './MediaPreview';

interface MediaPreviewContentProps {
  isStreamPreviewAvailable: boolean;
}

const MediaPreviewContent: React.FC<MediaPreviewContentProps> = ({ isStreamPreviewAvailable }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {isStreamPreviewAvailable ? (
        <MediaPreview isStreamPreviewAvailable={isStreamPreviewAvailable} />
      ) : (
        <div className="text-center">
          <Camera className="h-12 w-12 mx-auto text-meta-teal/40 mb-2" />
          <p className="text-gray-400">No active video source</p>
          <p className="text-xs text-gray-500 mt-1">Connect a camera or select a source to see a preview</p>
        </div>
      )}
    </div>
  );
};

export default MediaPreviewContent;
