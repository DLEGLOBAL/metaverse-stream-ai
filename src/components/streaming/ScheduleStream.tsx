
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import ScheduleStreamForm from './schedule/ScheduleStreamForm';
import ScheduledStreamsList from './schedule/ScheduledStreamsList';

const ScheduleStream: React.FC = () => {
  const { scheduledStreams, scheduleStream, deleteScheduledStream } = useAppContext();
  
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-meta-teal" />
          Schedule Stream
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ScheduleStreamForm 
            onSchedule={scheduleStream}
          />
          
          <ScheduledStreamsList
            streams={scheduledStreams}
            onDeleteStream={deleteScheduledStream}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleStream;
