
import React from 'react';
import { getGrowthData } from '@/services/analyticsService';
import FollowerGrowthChart from './growth/FollowerGrowthChart';
import SubscriberGrowthChart from './growth/SubscriberGrowthChart';
import ViewsGrowthChart from './growth/ViewsGrowthChart';
import RetentionRateChart from './growth/RetentionRateChart';

interface AnalyticsGrowthProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  activePlatform: string;
}

const AnalyticsGrowth = ({ dateRange, activePlatform }: AnalyticsGrowthProps) => {
  // Get sample data
  const { followerGrowth, subscriberGrowth, viewsGrowth, retentionRate } = getGrowthData(dateRange, activePlatform);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FollowerGrowthChart 
          followerGrowth={followerGrowth} 
          activePlatform={activePlatform} 
        />
        <SubscriberGrowthChart 
          subscriberGrowth={subscriberGrowth} 
          activePlatform={activePlatform} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ViewsGrowthChart 
          viewsGrowth={viewsGrowth} 
        />
        <RetentionRateChart 
          retentionRate={retentionRate} 
          activePlatform={activePlatform} 
        />
      </div>
    </div>
  );
};

export default AnalyticsGrowth;
