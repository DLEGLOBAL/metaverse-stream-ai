
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Computer, Headset, Mic, Video, Plus, Eye, EyeOff, Settings, Filter } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/hooks/use-toast';

const Sources = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { sources, toggleSourceActive } = useAppContext();
  const [selectedSource, setSelectedSource] = useState<number | null>(null);
  
  const handleAddSource = () => {
    toast({
      title: "Coming Soon",
      description: "Adding new sources will be available in the next update",
    });
  };
  
  const handleSelectSource = (id: number) => {
    setSelectedSource(id === selectedSource ? null : id);
  };
  
  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'camera': return <Camera className="h-5 w-5" />;
      case 'display': return <Computer className="h-5 w-5" />;
      case 'audio': return <Mic className="h-5 w-5" />;
      case 'vr': return <Headset className="h-5 w-5" />;
      case 'media': return <Video className="h-5 w-5" />;
      default: return <Camera className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-meta-slate">
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Header sidebarCollapsed={sidebarCollapsed} />
      
      <main className={`pt-20 px-4 pb-4 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Source Manager</h1>
          <Button 
            className="bg-button-gradient text-meta-dark-blue hover:brightness-110"
            onClick={handleAddSource}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Source
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sources list */}
          <div>
            <Card className="glass-card h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Available Sources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {sources.map((source) => (
                  <div 
                    key={source.id}
                    className={`p-3 rounded-md cursor-pointer transition-all ${
                      selectedSource === source.id 
                        ? 'bg-meta-teal/20 border border-meta-teal/40 text-white' 
                        : (source.active 
                          ? 'bg-meta-teal/10 border border-meta-teal/30 text-white'
                          : 'border border-transparent hover:bg-secondary/50 text-gray-300')
                    }`}
                    onClick={() => handleSelectSource(source.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`mr-3 ${source.active ? 'text-meta-teal' : 'text-gray-400'}`}>
                          {source.icon}
                        </div>
                        <div>
                          <p className="font-medium">{source.name}</p>
                          <p className="text-xs text-gray-400 capitalize">{source.type}</p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`h-7 w-7 p-0 ${source.active ? 'text-meta-teal' : 'hover:bg-meta-teal/10'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSourceActive(source.id);
                        }}
                      >
                        {source.active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          {/* Preview area */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-4">
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white">
                    {selectedSource 
                      ? `Preview: ${sources.find(s => s.id === selectedSource)?.name}`
                      : 'Source Preview'
                    }
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-900 rounded-md flex items-center justify-center relative overflow-hidden border border-meta-teal/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full bg-gradient-to-tr from-meta-dark-blue/80 to-meta-slate/80 absolute inset-0 flex items-center justify-center">
                        {selectedSource ? (
                          <div className="flex flex-col items-center">
                            {getSourceIcon(sources.find(s => s.id === selectedSource)?.type || 'camera')}
                            <p className="text-meta-teal mt-2">
                              {sources.find(s => s.id === selectedSource)?.name}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {sources.find(s => s.id === selectedSource)?.active 
                                ? 'Source is active'
                                : 'Source is inactive'
                              }
                            </p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <Camera className="h-12 w-12 text-meta-teal/40 mb-2" />
                            <p className="text-gray-400">Select a source to preview</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {selectedSource && (
                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white">Source Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Source Name</label>
                        <input 
                          type="text" 
                          className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white"
                          value={sources.find(s => s.id === selectedSource)?.name || ""}
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Source Type</label>
                        <input 
                          type="text" 
                          className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white capitalize"
                          value={sources.find(s => s.id === selectedSource)?.type || ""}
                          readOnly
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                      <Button variant="outline" className="border-meta-teal/30 hover:bg-meta-teal/10 text-white">
                        <Settings className="h-4 w-4 mr-2" /> Configure
                      </Button>
                      <Button variant="outline" className="border-meta-teal/30 hover:bg-meta-teal/10 text-white">
                        <Filter className="h-4 w-4 mr-2" /> Add Filters
                      </Button>
                      <Button variant="outline" className="border-meta-teal/30 hover:bg-meta-teal/10 text-white">
                        <Eye className="h-4 w-4 mr-2" /> 
                        {sources.find(s => s.id === selectedSource)?.active ? "Hide" : "Show"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Sources;
