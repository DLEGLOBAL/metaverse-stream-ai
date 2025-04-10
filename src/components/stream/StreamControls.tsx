
import React from 'react';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

interface StreamControlsProps {
  streamStatus: 'live' | 'offline' | 'recording';
  isRecording: boolean;
}

const StreamControls: React.FC<StreamControlsProps> = ({ 
  streamStatus, 
  isRecording 
}) => {
  const { 
    startStream, 
    stopStream, 
    testStream,
    startRecording,
    stopRecording
  } = useAppContext();

  return (
    <div className="flex justify-between space-x-2">
      {streamStatus === 'live' ? (
        <>
          <Button 
            variant="outline" 
            className="border-red-500/30 hover:bg-red-500/10 text-red-400 flex-1"
            onClick={stopStream}
          >
            Stop Stream
          </Button>
          {!isRecording && (
            <Button 
              variant="outline" 
              className="border-meta-teal/30 hover:bg-meta-teal/10 text-meta-teal flex-1"
              onClick={startRecording}
            >
              <Video className="h-4 w-4 mr-2" /> Record
            </Button>
          )}
        </>
      ) : streamStatus === 'recording' ? (
        <Button 
          variant="outline" 
          className="border-red-500/30 hover:bg-red-500/10 text-red-400 flex-1"
          onClick={stopRecording}
        >
          Stop Recording
        </Button>
      ) : (
        <>
          <Button 
            variant="outline" 
            className="border-meta-teal/30 hover:bg-meta-teal/10 flex-1"
            onClick={testStream}
          >
            Test Stream
          </Button>
          <Button 
            className="bg-button-gradient text-meta-dark-blue hover:brightness-110 flex-1"
            onClick={startStream}
          >
            Go Live
          </Button>
          <Button 
            variant="outline" 
            className="border-meta-teal/30 hover:bg-meta-teal/10 text-meta-teal flex-1"
            onClick={startRecording}
          >
            <Video className="h-4 w-4 mr-2" /> Record
          </Button>
        </>
      )}
    </div>
  );
};

export default StreamControls;
