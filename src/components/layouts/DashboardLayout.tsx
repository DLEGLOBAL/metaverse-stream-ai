
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-meta-dark-blue text-white">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          toggleSidebar={toggleSidebar} 
        />
        <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-0 md:ml-64'}`}>
          <Header sidebarCollapsed={sidebarCollapsed} />
          <main className="p-6 pt-24">
            {children}
          </main>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default DashboardLayout;
