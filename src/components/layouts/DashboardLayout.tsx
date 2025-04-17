
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-meta-dark-blue text-white">
        <Sidebar />
        <div className="ml-0 md:ml-64">
          <Header />
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default DashboardLayout;
