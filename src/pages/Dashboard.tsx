
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import DashboardInitializer from '@/components/dashboard/DashboardInitializer';
import DashboardContent from '@/components/dashboard/DashboardContent';

const Dashboard = () => {
  console.log('Dashboard component rendering');
  const [isLoading, setIsLoading] = useState(true);
  
  const handleInitialized = () => {
    setIsLoading(false);
  };
  
  // Simple loading state to handle initialization
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center p-8">
          <p className="text-white text-lg">Loading dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <DashboardInitializer onInitialized={handleInitialized} />
      <DashboardContent />
    </DashboardLayout>
  );
};

export default Dashboard;
