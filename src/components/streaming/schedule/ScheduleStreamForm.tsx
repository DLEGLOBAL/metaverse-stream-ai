
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DateTimePicker } from '@/components/ui/date-time-picker';
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
  const [scheduledDateTime, setScheduledDateTime] = useState<Date | undefined>(undefined);
  const [duration, setDuration] = useState(60); // Default 60 minutes
  const [selectedPlatforms, setSelectedPlatforms] = useState<number[]>([]);
  
  // Calculate minimum date (today)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const handleSubmit = () => {
    if (!title || !scheduledDateTime) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in title and schedule date/time',
        variant: 'destructive',
      });
      return;
    }
    
    // Schedule the stream
    onSchedule({
      title,
      description,
      scheduledDate: scheduledDateTime.toISOString(),
      platforms: selectedPlatforms,
      duration
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setScheduledDateTime(undefined);
    setDuration(60);
    setSelectedPlatforms([]);
    
    toast({
      title: 'Stream Scheduled',
      description: `Your stream "${title}" has been scheduled successfully.`,
    });
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
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Date & Time</label>
        <DateTimePicker 
          date={scheduledDateTime} 
          onDateChange={setScheduledDateTime}
          className="border-gray-700 bg-meta-slate text-white"
          placeholder="Select stream date and time"
          minDate={today}
        />
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
