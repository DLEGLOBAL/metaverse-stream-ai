
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const scenes = [
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
];

const SceneSelector = () => {
  return (
    <Card className="h-full glass-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-white">Scenes</CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-meta-teal/10 hover:text-meta-teal">
          <Plus className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-2">
          {scenes.map((scene) => (
            <div 
              key={scene.id}
              className={`p-3 rounded-md cursor-pointer transition-all flex items-center justify-between ${
                scene.active 
                  ? 'bg-meta-teal/20 border border-meta-teal/40 text-white' 
                  : 'border border-transparent hover:bg-secondary/50 text-gray-300'
              }`}
            >
              <span className="font-medium">{scene.name}</span>
              {scene.active && (
                <span className="text-xs bg-meta-teal/30 text-meta-teal px-2 py-0.5 rounded">
                  Active
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SceneSelector;
