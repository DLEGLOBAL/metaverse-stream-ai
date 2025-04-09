
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Trash2 } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';

const ScheduleStream = () => {
  const { scheduledStreams, scheduleStream, deleteScheduledStream } = useAppContext();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState(60); // Default 60 minutes
  const [selectedPlatforms, setSelectedPlatforms] = useState<number[]>([]);
  
  const handleSchedule = () => {
    if (!title || !date || !time) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in title, date, and time',
        variant: 'destructive',
      });
      return;
    }
    
    // Combine date and time
    const dateTime = new Date(date);
    const [hours, minutes] = time.split(':').map(Number);
    dateTime.setHours(hours, minutes);
    
    // Schedule the stream
    scheduleStream({
      title,
      description,
      scheduledDate: dateTime.toISOString(),
      platforms: selectedPlatforms,
      duration
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setDate(undefined);
    setTime('');
    setDuration(60);
    setSelectedPlatforms([]);
  };
  
  const togglePlatform = (id: number) => {
    setSelectedPlatforms(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id) 
        : [...prev, id]
    );
  };
  
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
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
              <input
                type="text"
                className="w-full bg-meta-slate border border-gray-700 rounded-md py-2 px-3 text-white"
                placeholder="Stream title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <textarea
                className="w-full bg-meta-slate border border-gray-700 rounded-md py-2 px-3 text-white"
                placeholder="Stream description"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left border-gray-700 bg-meta-slate text-white"
                    >
                      {date ? format(date, 'PPP') : <span className="text-gray-500">Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-meta-dark-blue border-gray-700">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Time</label>
                <input
                  type="time"
                  className="w-full bg-meta-slate border border-gray-700 rounded-md py-2 px-3 text-white"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Duration (minutes)</label>
              <input
                type="number"
                className="w-full bg-meta-slate border border-gray-700 rounded-md py-2 px-3 text-white"
                min={15}
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 60)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Platforms</label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedPlatforms.includes(1) ? "default" : "outline"} 
                  size="sm"
                  className={selectedPlatforms.includes(1) ? "bg-meta-teal text-black" : "border-gray-700 text-gray-300"}
                  onClick={() => togglePlatform(1)}
                >
                  YouTube
                </Button>
                <Button
                  variant={selectedPlatforms.includes(2) ? "default" : "outline"} 
                  size="sm"
                  className={selectedPlatforms.includes(2) ? "bg-meta-teal text-black" : "border-gray-700 text-gray-300"}
                  onClick={() => togglePlatform(2)}
                >
                  Twitch
                </Button>
                <Button
                  variant={selectedPlatforms.includes(5) ? "default" : "outline"} 
                  size="sm"
                  className={selectedPlatforms.includes(5) ? "bg-meta-teal text-black" : "border-gray-700 text-gray-300"}
                  onClick={() => togglePlatform(5)}
                >
                  TikTok
                </Button>
              </div>
            </div>
            
            <Button
              className="w-full bg-button-gradient text-meta-dark-blue hover:brightness-110"
              onClick={handleSchedule}
            >
              Schedule Stream
            </Button>
          </div>
          
          {scheduledStreams.length > 0 && (
            <div className="border-t border-gray-700 pt-4 mt-4">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Upcoming Streams</h3>
              <div className="space-y-3">
                {scheduledStreams.map((stream) => (
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
                        onClick={() => deleteScheduledStream(stream.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleStream;
