
import { 
  scheduleStream as scheduleStreamUtil, 
  deleteScheduledStream as deleteScheduledStreamUtil 
} from '../schedulingUtils';
import { ScheduledStream } from '../types';

type UseScheduleHandlersProps = {
  scheduledStreams: ScheduledStream[];
  setScheduledStreams: (streams: ScheduledStream[]) => void;
};

export const useScheduleHandlers = ({ 
  scheduledStreams, 
  setScheduledStreams 
}: UseScheduleHandlersProps) => {
  const scheduleStream = (stream: Omit<ScheduledStream, 'id' | 'notificationSent'>) => {
    scheduleStreamUtil(scheduledStreams, setScheduledStreams, stream);
  };

  const deleteScheduledStream = (id: number) => {
    deleteScheduledStreamUtil(id, scheduledStreams, setScheduledStreams);
  };

  return { scheduleStream, deleteScheduledStream };
};
