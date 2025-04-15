
import React from 'react';
import { getRevenueData } from '@/services/analyticsService';
import RevenueSummaryCards from './revenue/RevenueSummaryCards';
import RevenueOverTimeChart from './revenue/RevenueOverTimeChart';
import RevenueBySourceChart from './revenue/RevenueBySourceChart';
import MonthlyComparisonChart from './revenue/MonthlyComparisonChart';
import TopDonationsTable from './revenue/TopDonationsTable';

interface AnalyticsRevenueProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  activePlatform: string;
}

const AnalyticsRevenue = ({ dateRange, activePlatform }: AnalyticsRevenueProps) => {
  // Get sample data
  const { 
    revenueOverTime, 
    revenueBySource, 
    topDonations,
    monthlyComparison,
    revenueSummary
  } = getRevenueData(dateRange, activePlatform);

  return (
    <div className="space-y-6">
      {/* Revenue Summary Cards */}
      <RevenueSummaryCards revenueSummary={revenueSummary} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue Over Time */}
        <RevenueOverTimeChart revenueOverTime={revenueOverTime} />

        {/* Revenue By Source */}
        <RevenueBySourceChart revenueBySource={revenueBySource} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Comparison */}
        <MonthlyComparisonChart monthlyComparison={monthlyComparison} />

        {/* Top Donations/Supporters */}
        <TopDonationsTable topDonations={topDonations} />
      </div>
    </div>
  );
};

export default AnalyticsRevenue;
