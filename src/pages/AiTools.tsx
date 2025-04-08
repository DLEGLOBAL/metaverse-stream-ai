
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Wand2, Mic, Monitor, Video, Brain, Camera, PlayCircle, ArrowRight } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

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
              <Card key={feature.id} className={`glass-card transition-all ${feature.enabled ? 'border-meta-teal/30' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="bg-meta-teal/20 rounded-md p-2">
                      {feature.name === "AI Director" && <Monitor className="h-5 w-5 text-meta-teal" />}
                      {feature.name === "Smart Green Screen" && <Camera className="h-5 w-5 text-meta-teal" />}
                      {feature.name === "Voice Commands" && <Mic className="h-5 w-5 text-meta-teal" />}
                      {feature.name === "AI Assistant" && <Bot className="h-5 w-5 text-meta-teal" />}
                    </div>
                    <Switch 
                      checked={feature.enabled}
                      onCheckedChange={() => toggleAiFeature(feature.id)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-medium text-white text-lg">{feature.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">{feature.description}</p>
                  
                  {feature.hasSlider && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Intensity</span>
                        <span>{feature.sliderValue}%</span>
                      </div>
                      <input 
                        type="range" 
                        className="w-full accent-meta-teal"
                        min="0"
                        max="100"
                        value={feature.sliderValue}
                        onChange={(e) => updateAiFeatureSlider(feature.id, parseInt(e.target.value))}
                        disabled={!feature.enabled}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* AI Director Panel */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">AI Director</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="bg-meta-dark-blue p-4 rounded-md border border-meta-teal/20">
                    <h3 className="text-white font-medium mb-2">Real-time Scene Analysis</h3>
                    <p className="text-gray-400 text-sm">
                      AI Director analyzes your stream content in real-time to determine the optimal scene to display. 
                      It detects movement, audio levels, and content type to make intelligent switching decisions.
                    </p>
                    
                    <h3 className="text-white font-medium mt-4 mb-2">Configuration</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-400 block mb-1">Switching Frequency</label>
                        <select className="w-full bg-meta-slate border border-meta-teal/30 rounded-md py-1.5 px-2 text-white text-sm">
                          <option>Low</option>
                          <option selected>Medium</option>
                          <option>High</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 block mb-1">Transition Style</label>
                        <select className="w-full bg-meta-slate border border-meta-teal/30 rounded-md py-1.5 px-2 text-white text-sm">
                          <option>Fade</option>
                          <option selected>Smooth</option>
                          <option>Cut</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button className="bg-meta-teal/20 hover:bg-meta-teal/30 text-meta-teal border border-meta-teal/30 w-full">
                        <PlayCircle className="h-4 w-4 mr-2" /> Run Training Session
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-meta-dark-blue p-4 rounded-md border border-meta-teal/20 h-full flex flex-col">
                    <h3 className="text-white font-medium mb-2">AI Insights</h3>
                    <div className="flex-1 space-y-3">
                      <div className="p-2 border border-meta-teal/20 rounded bg-meta-slate/50">
                        <div className="flex items-center text-xs text-meta-teal mb-1">
                          <Brain className="h-3 w-3 mr-1" /> Scene Analysis
                        </div>
                        <p className="text-xs text-gray-300">Main camera is optimal for current content</p>
                      </div>
                      
                      <div className="p-2 border border-meta-teal/20 rounded bg-meta-slate/50">
                        <div className="flex items-center text-xs text-meta-teal mb-1">
                          <Wand2 className="h-3 w-3 mr-1" /> Suggestion
                        </div>
                        <p className="text-xs text-gray-300">Add Picture-in-Picture for gameplay</p>
                      </div>
                      
                      <div className="p-2 border border-meta-teal/20 rounded bg-meta-slate/50">
                        <div className="flex items-center text-xs text-meta-teal mb-1">
                          <Bot className="h-3 w-3 mr-1" /> Auto Action
                        </div>
                        <p className="text-xs text-gray-300">Balanced audio levels for optimal sound</p>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="mt-4 border-meta-teal/30 hover:bg-meta-teal/10 text-white">
                      View All Insights <ArrowRight className="h-3 w-3 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Smart Green Screen */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Smart Green Screen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="aspect-video bg-gray-900 rounded-md flex items-center justify-center relative overflow-hidden border border-meta-teal/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-tr from-meta-dark-blue/80 to-meta-slate/80 absolute inset-0 flex items-center justify-center">
                      <div className="flex flex-col items-center">
                        <Camera className="h-12 w-12 text-meta-teal mb-2" />
                        <p className="text-meta-teal">Background Removal Preview</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-meta-dark-blue p-4 rounded-md border border-meta-teal/20 h-full">
                    <h3 className="text-white font-medium mb-3">Background Settings</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-gray-400 block mb-1">Background Type</label>
                        <select className="w-full bg-meta-slate border border-meta-teal/30 rounded-md py-2 px-3 text-white">
                          <option>None (Transparent)</option>
                          <option selected>Blur</option>
                          <option>Virtual Background</option>
                          <option>Color Fill</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="text-xs text-gray-400 block mb-1">Edge Detection</label>
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Precision</span>
                          <span>75%</span>
                        </div>
                        <input 
                          type="range" 
                          className="w-full accent-meta-teal"
                          min="0"
                          max="100"
                          value="75"
                        />
                      </div>
                      
                      <div>
                        <label className="text-xs text-gray-400 block mb-1">Processing Quality</label>
                        <div className="grid grid-cols-3 gap-2">
                          <Button variant="outline" size="sm" className="border-meta-teal/30 text-white">Low</Button>
                          <Button variant="outline" size="sm" className="border-meta-teal bg-meta-teal/20 text-white">Medium</Button>
                          <Button variant="outline" size="sm" className="border-meta-teal/30 text-white">High</Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Higher quality uses more CPU resources</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button className="bg-button-gradient text-meta-dark-blue hover:brightness-110 w-full">
                        Apply Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AiTools;
