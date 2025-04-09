
import { ScheduledStream } from './types';
import { toast } from '@/hooks/use-toast';

export const scheduleStream = (
  scheduledStreams: ScheduledStream[],
  setScheduledStreams: (streams: ScheduledStream[]) => void,
  newStream: Omit<ScheduledStream, 'id' | 'notificationSent'>
) => {
  const id = scheduledStreams.length > 0 
    ? Math.max(...scheduledStreams.map(s => s.id)) + 1 
    : 1;
  
  const stream: ScheduledStream = {
    ...newStream,
    id,
    notificationSent: false
  };
  
  setScheduledStreams([...scheduledStreams, stream]);
  
  toast({
    title: 'Stream Scheduled',
    description: `Your stream "${newStream.title}" has been scheduled for ${new Date(newStream.scheduledDate).toLocaleString()}`,
  });
  
  // In a real implementation, we would set up a notification
  return stream;
};

export const deleteScheduledStream = (
  id: number,
  scheduledStreams: ScheduledStream[],
  setScheduledStreams: (streams: ScheduledStream[]) => void
) => {
  const streamToDelete = scheduledStreams.find(s => s.id === id);
  
  if (streamToDelete) {
    setScheduledStreams(scheduledStreams.filter(s => s.id !== id));
    
    toast({
      title: 'Stream Unscheduled',
      description: `Your stream "${streamToDelete.title}" has been removed from the schedule`,
    });
  }
};
