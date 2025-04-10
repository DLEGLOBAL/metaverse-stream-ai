
import React from 'react';
import { Button } from '@/components/ui/button';
import { Camera, LayoutPanelTop, Mic, Wand2, Computer } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/hooks/use-toast';

interface MediaOverlayControlsProps {
  isCameraActive: boolean;
  isMicActive: boolean;
  isScreenShareActive: boolean;
}

const MediaOverlayControls: React.FC<MediaOverlayControlsProps> = ({
  isCameraActive,
  isMicActive,
  isScreenShareActive
}) => {
  const { toggleSourceActive, sources } = useAppContext();
  
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
  
  const handleScreenShareToggle = () => {
    const displaySource = sources.find(source => source.type === 'display');
    if (displaySource) {
      toggleSourceActive(displaySource.id);
    } else {
      toast({
        title: 'Display Source Not Found',
        description: 'No screen sharing source is available.',
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
    <>
      <div className="flex space-x-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className={`h-8 w-8 text-white hover:bg-white/20 bg-black/40 ${
            isCameraActive ? 'text-meta-teal' : 'text-white'
          }`}
          onClick={handleCameraToggle}
        >
          <Camera className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className={`h-8 w-8 text-white hover:bg-white/20 bg-black/40 ${
            isMicActive ? 'text-meta-teal' : 'text-white'
          }`}
          onClick={handleMicToggle}
        >
          <Mic className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className={`h-8 w-8 text-white hover:bg-white/20 bg-black/40 ${
            isScreenShareActive ? 'text-meta-teal' : 'text-white'
          }`}
          onClick={handleScreenShareToggle}
        >
          <Computer className="h-4 w-4" />
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
    </>
  );
};

export default MediaOverlayControls;
