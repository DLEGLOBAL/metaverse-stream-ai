
import { 
  startRecording as startRecordingUtil, 
  stopRecording as stopRecordingUtil 
} from '../recordingUtils';
import { StreamStatus } from '../types';

type UseRecordingHandlersProps = {
  setStreamStatus: (status: StreamStatus) => void;
  setIsRecording: (isRecording: boolean) => void;
};

export const useRecordingHandlers = ({ 
  setStreamStatus, 
  setIsRecording 
}: UseRecordingHandlersProps) => {
  const startRecording = () => {
    startRecordingUtil(setStreamStatus, setIsRecording);
  };

  const stopRecording = () => {
    stopRecordingUtil(setStreamStatus, setIsRecording);
  };

  return { startRecording, stopRecording };
};
