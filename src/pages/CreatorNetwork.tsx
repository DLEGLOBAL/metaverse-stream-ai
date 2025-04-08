
import React from 'react';
import { Helmet } from 'react-helmet';
import CreatorHeader from '@/components/creator/CreatorHeader';
import CreatorTiers from '@/components/creator/CreatorTiers';
import TrainingPrograms from '@/components/creator/TrainingPrograms';
import CreatorCTA from '@/components/creator/CreatorCTA';
import DashboardLayout from '@/components/layouts/DashboardLayout';

const CreatorNetwork = () => {
  return (
    <>
      <Helmet>
        <title>Creator Network | MetaStream</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6 p-6">
          <CreatorHeader />
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
