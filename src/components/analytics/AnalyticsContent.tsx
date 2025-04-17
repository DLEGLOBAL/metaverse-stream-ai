
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnalyticsOverview from './AnalyticsOverview';
import AnalyticsEngagement from './AnalyticsEngagement';

interface AnalyticsContentProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  activePlatform: string;
}

const AnalyticsContent: React.FC<AnalyticsContentProps> = ({ dateRange, activePlatform }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <Tabs defaultValue="overview" onValueChange={setActiveTab} value={activeTab}>
      <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="engagement">Engagement</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="mt-0">
        <AnalyticsOverview 
          dateRange={dateRange} 
          activePlatform={activePlatform} 
        />
      </TabsContent>
      
      <TabsContent value="engagement" className="mt-0">
        <AnalyticsEngagement 
          dateRange={dateRange} 
          activePlatform={activePlatform} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default AnalyticsContent;
