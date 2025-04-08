
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import StreamPreview from '@/components/dashboard/StreamPreview';
import SceneSelector from '@/components/dashboard/SceneSelector';
import SourcesList from '@/components/dashboard/SourcesList';
import StatsPanel from '@/components/dashboard/StatsPanel';
import AiFeatures from '@/components/dashboard/AiFeatures';
import VRIntegrationPanel from '@/components/dashboard/VRIntegrationPanel';
import { useAppContext } from '@/contexts/AppContext';
import { Camera, Computer, Headset, Mic, Video, Bot, Wand2 } from 'lucide-react';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { 
    setScenes, 
    setSources, 
    setAiFeatures 
  } = useAppContext();
  
  // Initialize app data on component mount
  useEffect(() => {
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
  }, [setScenes, setSources, setAiFeatures]);
  
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
                  <VRIntegrationPanel />
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
