
import React, { Suspense } from 'react';
import DashboardErrorBoundary from './DashboardErrorBoundary';

// Lazy load components
const LazyStreamPreview = React.lazy(() => import('@/components/dashboard/StreamPreview'));
const LazySceneSelector = React.lazy(() => import('@/components/dashboard/SceneSelector'));
const LazySourcesList = React.lazy(() => import('@/components/dashboard/SourcesList'));
const LazyStatsPanel = React.lazy(() => import('@/components/dashboard/StatsPanel'));
const LazyVRIntegrationPanel = React.lazy(() => import('@/components/dashboard/VRIntegrationPanel'));
const LazyAiFeatures = React.lazy(() => import('@/components/dashboard/AiFeatures'));

const DashboardContent = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 touch-auto">
      {/* Main content - 3 cols */}
      <div className="lg:col-span-3 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <DashboardErrorBoundary>
              <Suspense fallback={<div className="p-4 border border-gray-600 rounded bg-gray-800 text-white">Loading preview...</div>}>
                <LazyStreamPreview />
              </Suspense>
            </DashboardErrorBoundary>
          </div>
          <div>
            <DashboardErrorBoundary>
              <Suspense fallback={<div className="p-4 border border-gray-600 rounded bg-gray-800 text-white">Loading scenes...</div>}>
                <LazySceneSelector />
              </Suspense>
            </DashboardErrorBoundary>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <DashboardErrorBoundary>
              <Suspense fallback={<div className="p-4 border border-gray-600 rounded bg-gray-800 text-white">Loading sources...</div>}>
                <LazySourcesList />
              </Suspense>
            </DashboardErrorBoundary>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-4">
              <DashboardErrorBoundary>
                <Suspense fallback={<div className="p-4 border border-gray-600 rounded bg-gray-800 text-white">Loading stats...</div>}>
                  <LazyStatsPanel />
                </Suspense>
              </DashboardErrorBoundary>
              <DashboardErrorBoundary>
                <Suspense fallback={<div className="p-4 border border-gray-600 rounded bg-gray-800 text-white">Loading VR integration...</div>}>
                  <LazyVRIntegrationPanel />
                </Suspense>
              </DashboardErrorBoundary>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sidebar - 1 col */}
      <div className="lg:col-span-1">
        <DashboardErrorBoundary>
          <Suspense fallback={<div className="p-4 border border-gray-600 rounded bg-gray-800 text-white">Loading AI features...</div>}>
            <LazyAiFeatures />
          </Suspense>
        </DashboardErrorBoundary>
      </div>
    </div>
  );
};

export default DashboardContent;
