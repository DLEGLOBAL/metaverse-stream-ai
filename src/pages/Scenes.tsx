
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Layers, Move, Edit, Trash, Eye, EyeOff } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/hooks/use-toast';

const Scenes = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { scenes, toggleSceneActive } = useAppContext();
  const [editMode, setEditMode] = useState(false);
  
  const handleAddScene = () => {
    toast({
      title: "Coming Soon",
      description: "Adding new scenes will be available in the next update",
    });
  };
  
  const handleDeleteScene = (id: number) => {
    toast({
      title: "Coming Soon",
      description: "Deleting scenes will be available in the next update",
    });
  };
  
  const handleEditScene = (id: number) => {
    toast({
      title: "Coming Soon",
      description: "Editing scenes will be available in the next update",
    });
  };

  return (
    <div className="min-h-screen bg-meta-slate">
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Header sidebarCollapsed={sidebarCollapsed} />
      
      <main className={`pt-20 px-4 pb-4 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="grid grid-cols-1 gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Scene Management</h1>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="border-meta-teal/30 hover:bg-meta-teal/10 text-white"
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? "Done" : "Edit Scenes"}
              </Button>
              <Button 
                className="bg-button-gradient text-meta-dark-blue hover:brightness-110"
                onClick={handleAddScene}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Scene
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Preview area */}
            <div className="md:col-span-2">
              <Card className="glass-card h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white">Scene Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-900 rounded-md flex items-center justify-center relative overflow-hidden border border-meta-teal/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full bg-gradient-to-tr from-meta-dark-blue/80 to-meta-slate/80 absolute inset-0 flex items-center justify-center">
                        <div className="flex flex-col items-center">
                          <Layers className="h-12 w-12 text-meta-teal mb-2" />
                          <p className="text-meta-teal">
                            {scenes.find(scene => scene.active)?.name || "No Scene Selected"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Scenes list */}
            <div>
              <Card className="glass-card h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-white">Scenes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {scenes.map((scene) => (
                      <div 
                        key={scene.id}
                        className={`p-3 rounded-md transition-all ${
                          scene.active 
                            ? 'bg-meta-teal/20 border border-meta-teal/40 text-white' 
                            : 'border border-transparent hover:bg-secondary/50 text-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Layers className="h-4 w-4 mr-2" />
                            <span className="font-medium">{scene.name}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {editMode ? (
                              <>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-7 w-7 p-0 hover:bg-meta-teal/10"
                                  onClick={() => handleEditScene(scene.id)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-7 w-7 p-0 hover:bg-red-500/10 text-red-400"
                                  onClick={() => handleDeleteScene(scene.id)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className={`h-7 w-7 p-0 ${scene.active ? 'text-meta-teal' : 'hover:bg-meta-teal/10'}`}
                                  onClick={() => toggleSceneActive(scene.id)}
                                >
                                  {scene.active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-7 w-7 p-0 cursor-move hover:bg-meta-teal/10"
                                >
                                  <Move className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Properties area */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Scene Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Scene Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white"
                    value={scenes.find(scene => scene.active)?.name || ""}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Transition</label>
                  <select className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white">
                    <option>Fade</option>
                    <option>Cut</option>
                    <option>Swipe</option>
                    <option>Zoom</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Scenes;
