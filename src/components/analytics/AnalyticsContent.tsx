
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnalyticsOverview from './AnalyticsOverview';
import AnalyticsGrowth from './AnalyticsGrowth';
import AnalyticsEngagement from './AnalyticsEngagement';
import AnalyticsAudience from './AnalyticsAudience';
import AnalyticsRevenue from './AnalyticsRevenue';
import { ScrollArea } from '@/components/ui/scroll-area';

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
        <div className="pb-2 overflow-hidden">
          <ScrollArea className="w-full touch-auto" orientation="horizontal">
            <div className="min-w-[500px] pb-3">
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="overview" className="py-3 text-base">Overview</TabsTrigger>
                <TabsTrigger value="growth" className="py-3 text-base">Growth</TabsTrigger>
                <TabsTrigger value="engagement" className="py-3 text-base">Engagement</TabsTrigger>
                <TabsTrigger value="audience" className="py-3 text-base">Audience</TabsTrigger>
                <TabsTrigger value="revenue" className="py-3 text-base">Revenue</TabsTrigger>
              </TabsList>
            </div>
          </ScrollArea>
        </div>
        
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
