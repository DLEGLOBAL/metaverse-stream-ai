
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnalyticsOverview from './AnalyticsOverview';
import AnalyticsGrowth from './AnalyticsGrowth';
import AnalyticsEngagement from './AnalyticsEngagement';
import AnalyticsAudience from './AnalyticsAudience';
import AnalyticsRevenue from './AnalyticsRevenue';

interface AnalyticsContentProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  activePlatform: string;
}

const AnalyticsContent = ({ dateRange, activePlatform }: AnalyticsContentProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="growth">Growth</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <AnalyticsOverview dateRange={dateRange} activePlatform={activePlatform} />
        </TabsContent>
        
        <TabsContent value="growth" className="mt-6">
          <AnalyticsGrowth dateRange={dateRange} activePlatform={activePlatform} />
        </TabsContent>
        
        <TabsContent value="engagement" className="mt-6">
          <AnalyticsEngagement dateRange={dateRange} activePlatform={activePlatform} />
        </TabsContent>
        
        <TabsContent value="audience" className="mt-6">
          <AnalyticsAudience dateRange={dateRange} activePlatform={activePlatform} />
        </TabsContent>
        
        <TabsContent value="revenue" className="mt-6">
          <AnalyticsRevenue dateRange={dateRange} activePlatform={activePlatform} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsContent;
