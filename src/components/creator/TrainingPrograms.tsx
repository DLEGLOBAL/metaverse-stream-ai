
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, BookOpen, Play, Video } from 'lucide-react';

const TrainingPrograms = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-meta-teal" />
          Creator Training
        </CardTitle>
        <CardDescription>
          Learn from experts and improve your streaming skills
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <TrainingCard 
          title="Streaming Basics"
          description="Learn the fundamentals of setting up your stream"
          lessons={5}
          duration="2 hours"
          icon={<Video className="h-8 w-8" />}
        />
        
        <TrainingCard 
          title="Audience Engagement"
          description="Techniques to interact effectively with viewers"
          lessons={8}
          duration="3.5 hours"
          icon={<BookOpen className="h-8 w-8" />}
        />
        
        <TrainingCard 
          title="Advanced AI Features"
          description="Master the AI tools in MetaStream"
          lessons={6}
          duration="4 hours"
          icon={<Play className="h-8 w-8" />}
        />
      </CardContent>
    </Card>
  );
};

interface TrainingCardProps {
  title: string;
  description: string;
  lessons: number;
  duration: string;
  icon: React.ReactNode;
}

const TrainingCard = ({ title, description, lessons, duration, icon }: TrainingCardProps) => (
  <div className="flex gap-4 p-4 border border-border rounded-lg hover:border-meta-teal/50 hover:bg-sidebar-accent/5 transition-colors cursor-pointer">
    <div className="flex-shrink-0 bg-meta-dark-blue/20 text-meta-teal p-3 rounded-lg">
      {icon}
    </div>
    <div className="flex-1">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground mb-2">{description}</p>
      <div className="flex gap-3 text-xs text-muted-foreground">
        <span>{lessons} lessons</span>
        <span>•</span>
        <span>{duration}</span>
      </div>
    </div>
  </div>
);

export default TrainingPrograms;
