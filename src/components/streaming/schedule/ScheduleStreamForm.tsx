
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PlatformOption {
  id: number;
  name: string;
}

interface ScheduleStreamFormProps {
  onSchedule: (streamData: {
    title: string;
    description: string;
    scheduledDate: string;
    platforms: number[];
    duration: number;
  }) => void;
}

const PLATFORMS: PlatformOption[] = [
  { id: 1, name: 'YouTube' },
  { id: 2, name: 'Twitch' },
  { id: 5, name: 'TikTok' },
];

const ScheduleStreamForm: React.FC<ScheduleStreamFormProps> = ({ onSchedule }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState(60); // Default 60 minutes
  const [selectedPlatforms, setSelectedPlatforms] = useState<number[]>([]);
  
  const handleSubmit = () => {
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
    onSchedule({
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
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
        <Input
          type="text"
          className="w-full bg-meta-slate border border-gray-700 text-white"
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
              <Calendar
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
          <Input
            type="time"
            className="w-full bg-meta-slate border border-gray-700 text-white"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Duration (minutes)</label>
        <Input
          type="number"
          className="w-full bg-meta-slate border border-gray-700 text-white"
          min={15}
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value) || 60)}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Platforms</label>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map(platform => (
            <Button
              key={platform.id}
              variant={selectedPlatforms.includes(platform.id) ? "default" : "outline"} 
              size="sm"
              className={selectedPlatforms.includes(platform.id) ? "bg-meta-teal text-black" : "border-gray-700 text-gray-300"}
              onClick={() => togglePlatform(platform.id)}
            >
              {platform.name}
            </Button>
          ))}
        </div>
      </div>
      
      <Button
        className="w-full bg-button-gradient text-meta-dark-blue hover:brightness-110"
        onClick={handleSubmit}
      >
        Schedule Stream
      </Button>
    </div>
  );
};

export default ScheduleStreamForm;
