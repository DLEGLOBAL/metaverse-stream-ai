
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import CreatorHeader from '@/components/creator/CreatorHeader';
import CreatorTiers from '@/components/creator/CreatorTiers';
import TrainingPrograms from '@/components/creator/TrainingPrograms';
import CreatorCTA from '@/components/creator/CreatorCTA';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';

const CreatorNetwork = () => {
  return (
    <>
      <Helmet>
        <title>Creator Network | MetaStream</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6 p-6">
          <CreatorHeader />
          
          <div className="w-full rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-meta-teal" />
              Looking for subscription plans?
            </h2>
            <p className="text-gray-400 mb-4">
              Our subscription plans have moved to the dedicated Pricing page where you can explore all available options.
            </p>
            <Button asChild className="bg-meta-teal hover:bg-meta-teal/90 text-meta-dark-blue">
              <Link to="/dashboard/pricing">View Pricing Plans</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CreatorTiers />
            <TrainingPrograms />
          </div>
          <CreatorCTA />
        </div>
      </DashboardLayout>
    </>
  );
};

export default CreatorNetwork;
