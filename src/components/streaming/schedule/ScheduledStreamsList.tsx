
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { ScheduledStream } from '@/contexts/types';

interface ScheduledStreamsListProps {
  streams: ScheduledStream[];
  onDeleteStream: (id: number) => void;
}

const ScheduledStreamsList: React.FC<ScheduledStreamsListProps> = ({ 
  streams, 
  onDeleteStream 
}) => {
  if (streams.length === 0) {
    return null;
  }
  
  return (
    <div className="border-t border-gray-700 pt-4 mt-4">
      <h3 className="text-sm font-medium text-gray-300 mb-2">Upcoming Streams</h3>
      <div className="space-y-3">
        {streams.map((stream) => (
          <div key={stream.id} className="p-3 rounded-md border border-gray-700 bg-meta-dark-blue/50">
            <div className="flex justify-between">
              <div>
                <h4 className="text-white font-medium">{stream.title}</h4>
                <p className="text-xs text-gray-400">{stream.description}</p>
                <div className="flex items-center mt-1 text-xs text-gray-300">
                  <Calendar className="h-3 w-3 mr-1" />
                  {format(new Date(stream.scheduledDate), 'PPP')} at {format(new Date(stream.scheduledDate), 'p')}
                </div>
                <div className="flex items-center mt-1 text-xs text-gray-300">
                  <Clock className="h-3 w-3 mr-1" />
                  {stream.duration} minutes
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                onClick={() => onDeleteStream(stream.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduledStreamsList;
