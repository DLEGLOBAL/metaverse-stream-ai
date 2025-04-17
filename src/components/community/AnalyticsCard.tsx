
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageSquare, Clock, Video } from 'lucide-react';
import { useDesktop } from '@/contexts/DesktopContext';

interface AnalyticsCardProps {
  className?: string;
}

const AnalyticsCard = ({ className = '' }: AnalyticsCardProps) => {
  const { isDesktop } = useDesktop();
  
  return (
    <Card className={`glass-card ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-white">Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-meta-dark-blue rounded-md border border-meta-teal/20">
            <div className="flex items-center mb-1">
              <Users className="h-4 w-4 text-meta-teal mr-2" />
              <span className="text-sm text-gray-300">Followers</span>
            </div>
            <p className="text-2xl font-bold text-white">0</p>
            <p className="text-xs text-gray-400 mt-1">No data available</p>
          </div>
          
          <div className="p-3 bg-meta-dark-blue rounded-md border border-meta-teal/20">
            <div className="flex items-center mb-1">
              <Video className="h-4 w-4 text-meta-teal mr-2" />
              <span className="text-sm text-gray-300">Total Views</span>
            </div>
            <p className="text-2xl font-bold text-white">0</p>
            <p className="text-xs text-gray-400 mt-1">No data available</p>
          </div>
          
          <div className="p-3 bg-meta-dark-blue rounded-md border border-meta-teal/20">
            <div className="flex items-center mb-1">
              <MessageSquare className="h-4 w-4 text-meta-teal mr-2" />
              <span className="text-sm text-gray-300">Comments</span>
            </div>
            <p className="text-2xl font-bold text-white">0</p>
            <p className="text-xs text-gray-400 mt-1">No data available</p>
          </div>
          
          <div className="p-3 bg-meta-dark-blue rounded-md border border-meta-teal/20">
            <div className="flex items-center mb-1">
              <Clock className="h-4 w-4 text-meta-teal mr-2" />
              <span className="text-sm text-gray-300">Watch Time</span>
            </div>
            <p className="text-2xl font-bold text-white">0</p>
            <p className="text-xs text-gray-400 mt-1">No data available</p>
          </div>
        </div>
        
        {isDesktop && (
          <div className="mt-3 bg-meta-teal/10 p-2 rounded text-xs text-meta-teal text-center">
            Desktop analytics available
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
