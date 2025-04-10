
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import AnalyticsHeader from '@/components/analytics/AnalyticsHeader';
import AnalyticsContent from '@/components/analytics/AnalyticsContent';
import { ScrollArea } from '@/components/ui/scroll-area';

const Analytics = () => {
  const [dateRange, setDateRange] = useState<{from: Date | undefined, to: Date | undefined}>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
    to: new Date()
  });
  
  const [activePlatform, setActivePlatform] = useState<string>('all');

  return (
    <React.Fragment>
      <Helmet>
        <title>Stream Analytics | MetaStream</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6 p-6 h-full overflow-hidden">
          <AnalyticsHeader 
            dateRange={dateRange} 
            setDateRange={setDateRange}
            activePlatform={activePlatform}
            setActivePlatform={setActivePlatform}
          />
          <ScrollArea className="h-[calc(100vh-14rem)] touch-auto">
            <div className="pr-4">
              <AnalyticsContent 
                dateRange={dateRange} 
                activePlatform={activePlatform}
              />
            </div>
          </ScrollArea>
        </div>
      </DashboardLayout>
    </React.Fragment>
  );
};

export default Analytics;
