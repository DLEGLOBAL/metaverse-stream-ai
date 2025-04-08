
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Wand2, Bot, PlayCircle, ArrowRight } from 'lucide-react';

const AIDirectorPanel: React.FC = () => {
  return (
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
  );
};

export default AIDirectorPanel;
