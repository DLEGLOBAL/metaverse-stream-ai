
import React from 'react';
import { Camera, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface MediaErrorProps {
  errorType: 'camera' | 'microphone' | 'display' | 'general';
  errorMessage?: string;
  onRetry?: () => void;
}

const PlatformErrorHandling: React.FC<MediaErrorProps> = ({ 
  errorType, 
  errorMessage,
  onRetry 
}) => {
  const getErrorTitle = () => {
    switch (errorType) {
      case 'camera':
        return 'Camera Access Error';
      case 'microphone':
        return 'Microphone Access Error';
      case 'display':
        return 'Screen Share Error';
      default:
        return 'Media Access Error';
    }
  };

  const getDefaultMessage = () => {
    switch (errorType) {
      case 'camera':
        return 'Could not access your camera. Please check that no other applications are using it and that you have enabled camera permissions in your browser.';
      case 'microphone':
        return 'Could not access your microphone. Please check your device settings and browser permissions.';
      case 'display':
        return 'Could not access your screen sharing. Please try again or use a different source.';
      default:
        return 'A media access error occurred. Please check your device settings and permissions.';
    }
  };

  const message = errorMessage || getDefaultMessage();
  
  return (
    <Alert variant="destructive" className="border-red-500/30 bg-red-500/10">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{getErrorTitle()}</AlertTitle>
      <AlertDescription className="flex flex-col space-y-2">
        <p>{message}</p>
        <div className="space-y-2 mt-2">
          <p className="text-sm text-gray-400">Troubleshooting steps:</p>
          <ul className="list-disc pl-5 text-sm text-gray-400">
            <li>Check if your browser has permission to access your {errorType}</li>
            <li>Make sure no other applications are using your {errorType}</li>
            <li>Try restarting your browser or device</li>
          </ul>
        </div>
        {onRetry && (
          <Button 
            variant="outline" 
            className="mt-2 self-start border-red-500/30 hover:bg-red-500/10 text-white"
            onClick={onRetry}
          >
            <RefreshCw className="h-3 w-3 mr-2" /> Try Again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default PlatformErrorHandling;
