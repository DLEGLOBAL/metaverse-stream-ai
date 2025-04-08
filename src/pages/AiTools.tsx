
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/hooks/use-toast';
import AIFeatureCard from '@/components/ai-tools/AIFeatureCard';
import AIDirectorPanel from '@/components/ai-tools/AIDirectorPanel';
import SmartGreenScreenPanel from '@/components/ai-tools/SmartGreenScreenPanel';

const AiTools = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { aiFeatures, toggleAiFeature, updateAiFeatureSlider } = useAppContext();
  
  const handleActivateAll = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Activating all AI features will be available in the next update.",
    });
  };
  
  return (
    <div className="min-h-screen bg-meta-slate">
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Header sidebarCollapsed={sidebarCollapsed} />
      
      <main className={`pt-20 px-4 pb-4 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">AI-Powered Tools</h1>
            <p className="text-gray-400 mt-1">Enhance your stream with artificial intelligence</p>
          </div>
          <Button 
            className="bg-button-gradient text-meta-dark-blue hover:brightness-110"
            onClick={handleActivateAll}
          >
            <Bot className="h-4 w-4 mr-2" /> Activate All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {/* AI Features Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiFeatures.map((feature) => (
              <AIFeatureCard 
                key={feature.id}
                feature={feature}
                toggleAiFeature={toggleAiFeature}
                updateAiFeatureSlider={updateAiFeatureSlider}
              />
            ))}
          </div>
          
          {/* AI Director Panel */}
          <AIDirectorPanel />
          
          {/* Smart Green Screen */}
          <SmartGreenScreenPanel />
        </div>
      </main>
    </div>
  );
};

export default AiTools;
