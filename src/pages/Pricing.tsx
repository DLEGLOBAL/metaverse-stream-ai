
import React from 'react';
import { Helmet } from 'react-helmet';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import SubscriptionTiers from '@/components/creator/SubscriptionTiers';

const Pricing = () => {
  return (
    <>
      <Helmet>
        <title>Pricing Plans | MetaStream</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6 p-6">
          <div className="rounded-lg bg-gradient-to-r from-meta-dark-blue to-meta-purple p-6 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold">Subscription Plans</h1>
                <p className="mt-2 text-lg opacity-90">
                  Choose the perfect plan for your streaming journey. Upgrade anytime as your needs grow.
                </p>
              </div>
            </div>
          </div>
          
          {/* Subscription plans */}
          <SubscriptionTiers />
        </div>
      </DashboardLayout>
    </>
  );
};

export default Pricing;
