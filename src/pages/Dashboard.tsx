
import React, { useState, useEffect, Suspense } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { useAppContext } from '@/contexts/AppContext';
import { Camera, Computer, Headset, Mic, Video } from 'lucide-react';

// Import components with error handling
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error("Error caught by error boundary:", error);
      setHasError(true);
      setError(error.error);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="p-4 m-4 border border-red-500 rounded bg-red-100 text-red-800">
        <h2 className="text-lg font-bold">Something went wrong</h2>
        <p className="mt-2">{error?.message || 'Unknown error'}</p>
        <button 
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => setHasError(false)}
        >
          Try again
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

// Lazy load components that might be causing issues
const LazyStreamPreview = React.lazy(() => import('@/components/dashboard/StreamPreview'));
const LazySceneSelector = React.lazy(() => import('@/components/dashboard/SceneSelector'));
const LazySourcesList = React.lazy(() => import('@/components/dashboard/SourcesList'));
const LazyStatsPanel = React.lazy(() => import('@/components/dashboard/StatsPanel'));
const LazyVRIntegrationPanel = React.lazy(() => import('@/components/dashboard/VRIntegrationPanel'));
const LazyAiFeatures = React.lazy(() => import('@/components/dashboard/AiFeatures'));

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { 
    setScenes, 
    setSources, 
    setAiFeatures 
  } = useAppContext();
  
  useEffect(() => {
    try {
      console.log('Dashboard component mounted');
      
      // Initialize scenes
      setScenes([
        {
          id: 1,
          name: "Main Camera",
          active: true,
        },
        {
          id: 2,
          name: "Screen Share",
          active: false,
        },
        {
          id: 3,
          name: "Game Overlay",
          active: false,
        },
        {
          id: 4,
          name: "VR Experience",
          active: false,
        }
      ]);
      
      // Initialize sources
      setSources([
        {
          id: 1,
          name: "Webcam",
          type: "camera",
          icon: <Camera className="h-4 w-4" />,
          active: true,
        },
        {
          id: 2,
          name: "Desktop",
          type: "display",
          icon: <Computer className="h-4 w-4" />,
          active: false,
        },
        {
          id: 3,
          name: "Microphone",
          type: "audio",
          icon: <Mic className="h-4 w-4" />,
          active: true,
        },
        {
          id: 4,
          name: "VR Headset",
          type: "vr",
          icon: <Headset className="h-4 w-4" />,
          active: false,
        },
        {
          id: 5,
          name: "Media File",
          type: "media",
          icon: <Video className="h-4 w-4" />,
          active: false,
        }
      ]);
      
      // Initialize AI features
      setAiFeatures([
        {
          id: 1,
          name: "AI Director",
          description: "Smart scene switching",
          enabled: true,
          hasSlider: false,
        },
        {
          id: 2,
          name: "Smart Green Screen",
          description: "Background removal",
          enabled: true,
          hasSlider: true,
          sliderValue: 75,
        },
        {
          id: 3,
          name: "Voice Commands",
          description: "Hands-free control",
          enabled: false,
          hasSlider: false,
        },
        {
          id: 4,
          name: "AI Assistant",
          description: "Stream helper",
          enabled: true,
          hasSlider: false,
        }
      ]);

      setIsLoading(false);
      console.log('Dashboard initialization complete');
    } catch (error) {
      console.error('Error initializing dashboard:', error);
      setIsLoading(false);
    }
  }, [setScenes, setSources, setAiFeatures]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-meta-slate flex items-center justify-center">
        <p className="text-white">Loading dashboard...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-meta-slate">
      <ErrorBoundary>
        <Sidebar collapsed={sidebarCollapsed} toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <Header sidebarCollapsed={sidebarCollapsed} />
      </ErrorBoundary>
      
      <main className={`pt-20 px-4 pb-4 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main content - 3 cols */}
          <div className="lg:col-span-3 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <ErrorBoundary>
                  <Suspense fallback={<div className="p-4 border border-gray-600 rounded bg-gray-800 text-white">Loading preview...</div>}>
                    <LazyStreamPreview />
                  </Suspense>
                </ErrorBoundary>
              </div>
              <div>
                <ErrorBoundary>
                  <Suspense fallback={<div className="p-4 border border-gray-600 rounded bg-gray-800 text-white">Loading scenes...</div>}>
                    <LazySceneSelector />
                  </Suspense>
                </ErrorBoundary>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <ErrorBoundary>
                  <Suspense fallback={<div className="p-4 border border-gray-600 rounded bg-gray-800 text-white">Loading sources...</div>}>
                    <LazySourcesList />
                  </Suspense>
                </ErrorBoundary>
              </div>
              <div>
                <div className="grid grid-cols-1 gap-4">
                  <ErrorBoundary>
                    <Suspense fallback={<div className="p-4 border border-gray-600 rounded bg-gray-800 text-white">Loading stats...</div>}>
                      <LazyStatsPanel />
                    </Suspense>
                  </ErrorBoundary>
                  <ErrorBoundary>
                    <Suspense fallback={<div className="p-4 border border-gray-600 rounded bg-gray-800 text-white">Loading VR integration...</div>}>
                      <LazyVRIntegrationPanel />
                    </Suspense>
                  </ErrorBoundary>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar - 1 col */}
          <div className="lg:col-span-1">
            <ErrorBoundary>
              <Suspense fallback={<div className="p-4 border border-gray-600 rounded bg-gray-800 text-white">Loading AI features...</div>}>
                <LazyAiFeatures />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
