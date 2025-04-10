
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import AnalyticsHeader from '@/components/analytics/AnalyticsHeader';
import AnalyticsContent from '@/components/analytics/AnalyticsContent';

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
        <div className="flex flex-col gap-6 p-6">
          <AnalyticsHeader 
            dateRange={dateRange} 
            setDateRange={setDateRange}
            activePlatform={activePlatform}
            setActivePlatform={setActivePlatform}
          />
          <AnalyticsContent 
            dateRange={dateRange} 
            activePlatform={activePlatform}
          />
        </div>
      </DashboardLayout>
    </React.Fragment>
  );
};

export default Analytics;
