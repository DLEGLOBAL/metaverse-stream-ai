
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import StreamPreview from '@/components/dashboard/StreamPreview';
import SceneSelector from '@/components/dashboard/SceneSelector';
import SourcesList from '@/components/dashboard/SourcesList';
import StatsPanel from '@/components/dashboard/StatsPanel';
import AiFeatures from '@/components/dashboard/AiFeatures';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <div className="min-h-screen bg-meta-slate">
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Header sidebarCollapsed={sidebarCollapsed} />
      
      <main className={`pt-20 px-4 pb-4 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main content - 3 cols */}
          <div className="lg:col-span-3 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <StreamPreview />
              </div>
              <div>
                <SceneSelector />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <SourcesList />
              </div>
              <div>
                <div className="grid grid-cols-1 gap-4">
                  <StatsPanel />
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar - 1 col */}
          <div className="lg:col-span-1">
            <AiFeatures />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
