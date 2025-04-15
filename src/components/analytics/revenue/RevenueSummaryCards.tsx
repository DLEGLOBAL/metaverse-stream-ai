
import React from 'react';
import MetricCard from './MetricCard';
import { DollarSign } from 'lucide-react';

interface RevenueSummaryProps {
  revenueSummary: {
    total: number;
    totalChange: number;
    subscriptions: number;
    subscriptionsChange: number;
    donations: number;
    donationsChange: number;
    ads: number;
    adsChange: number;
  };
}

const RevenueSummaryCards = ({ revenueSummary }: RevenueSummaryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <MetricCard 
        title="Total Revenue"
        value={`$${revenueSummary.total.toLocaleString()}`}
        change={revenueSummary.totalChange}
        icon={<DollarSign className="h-4 w-4" />}
        positive={revenueSummary.totalChange > 0}
      />
      <MetricCard 
        title="Subscriptions"
        value={`$${revenueSummary.subscriptions.toLocaleString()}`}
        change={revenueSummary.subscriptionsChange}
        icon={<DollarSign className="h-4 w-4" />}
        positive={revenueSummary.subscriptionsChange > 0}
      />
      <MetricCard 
        title="Donations"
        value={`$${revenueSummary.donations.toLocaleString()}`}
        change={revenueSummary.donationsChange}
        icon={<DollarSign className="h-4 w-4" />}
        positive={revenueSummary.donationsChange > 0}
      />
      <MetricCard 
        title="Ad Revenue"
        value={`$${revenueSummary.ads.toLocaleString()}`}
        change={revenueSummary.adsChange}
        icon={<DollarSign className="h-4 w-4" />}
        positive={revenueSummary.adsChange > 0}
      />
    </div>
  );
};

export default RevenueSummaryCards;
