
import { 
  startStream as startStreamUtil, 
  stopStream as stopStreamUtil, 
  testStream as testStreamUtil,
  simulateStatsChange as simulateStatsChangeUtil
} from '../streaming';
import { Source, Stats, StreamStatus } from '../types';

type UseStreamHandlersProps = {
  isStreamPreviewAvailable: boolean;
  streamStatus: StreamStatus;
  setStreamStatus: (status: StreamStatus) => void;
  setStats: (stats: Stats) => void;
  sources: Source[];
};

export const useStreamHandlers = ({ 
  isStreamPreviewAvailable, 
  streamStatus,
  setStreamStatus, 
  setStats,
  sources
}: UseStreamHandlersProps) => {
  const startStream = () => {
    startStreamUtil(
      isStreamPreviewAvailable, 
      setStreamStatus, 
      () => simulateStatsChangeUtil(streamStatus, setStats),
      sources
    );
  };

  const stopStream = () => {
    stopStreamUtil(setStreamStatus);
  };

  const testStream = () => {
    testStreamUtil(isStreamPreviewAvailable, sources);
  };

  return { startStream, stopStream, testStream };
};
