
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import DashboardInitializer from '@/components/dashboard/DashboardInitializer';
import DashboardContent from '@/components/dashboard/DashboardContent';

const Dashboard = () => {
  console.log('Dashboard component rendering');
  const [isLoading, setIsLoading] = useState(true);
  
  // Automatically proceed after a short timeout if initialization takes too long
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        console.log('Dashboard initialization timeout - proceeding anyway');
        setIsLoading(false);
      }
    }, 3000); // 3 second fallback timeout
    
    return () => clearTimeout(timer);
  }, [isLoading]);
  
  const handleInitialized = () => {
    console.log('Dashboard initialization complete');
    setIsLoading(false);
  };
  
  return (
    <DashboardLayout>
      {isLoading ? (
        <>
          <DashboardInitializer onInitialized={handleInitialized} />
          <div className="flex items-center justify-center p-8">
            <p className="text-white text-lg">Loading dashboard...</p>
          </div>
        </>
      ) : (
        <DashboardContent />
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
