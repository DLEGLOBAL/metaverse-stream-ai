
import React from 'react';
import MediaPreviewContent from './MediaPreviewContent';
import MediaOverlayControls from './MediaOverlayControls';

interface PreviewContainerProps {
  isStreamPreviewAvailable: boolean;
  isCameraActive: boolean;
  isMicActive: boolean;
  isScreenShareActive: boolean;
}

const PreviewContainer: React.FC<PreviewContainerProps> = ({
  isStreamPreviewAvailable,
  isCameraActive,
  isMicActive,
  isScreenShareActive
}) => {
  return (
    <div className="aspect-video bg-gray-900 rounded-md mb-4 flex items-center justify-center relative overflow-hidden border border-meta-teal/20">
      <MediaPreviewContent isStreamPreviewAvailable={isStreamPreviewAvailable} />
      
      {/* Overlay controls */}
      <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-between bg-gradient-to-t from-black/80 to-transparent">
        <MediaOverlayControls 
          isCameraActive={isCameraActive}
          isMicActive={isMicActive}
          isScreenShareActive={isScreenShareActive}
        />
      </div>
    </div>
  );
};

export default PreviewContainer;
