
import React from 'react';
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Film, Plus, Play } from 'lucide-react';
import VideoHistory from './VideoHistory';

interface VideoMediaSidebarProps {
  editHistory: string[];
  historyIndex: number;
  onJumpToHistory: (index: number) => void;
  onAddHistory: (action: string) => void;
}

const VideoMediaSidebar = ({
  editHistory,
  historyIndex,
  onJumpToHistory,
  onAddHistory
}: VideoMediaSidebarProps) => {
  return (
    <>
      <CardHeader className="pb-3">
        <CardTitle>Media & History</CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-69px)] overflow-auto">
        <Tabs defaultValue="history">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="recordings">Recordings</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recordings" className="h-full">
            <div className="space-y-3">
              {[1, 2, 3].map((index) => (
                <div key={index} className="border border-gray-700 rounded-md p-3 flex gap-3 hover:bg-gray-900/50">
                  <div className="aspect-video w-24 bg-gray-800 rounded-sm flex items-center justify-center text-gray-500">
                    <Film size={16} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">Stream Recording {index}</h4>
                    <p className="text-xs text-gray-400">01:2{index}:00 • {index} days ago</p>
                    <div className="flex gap-1 mt-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-7 text-xs"
                        onClick={() => onAddHistory(`Added Stream Recording ${index}`)}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-7 text-xs"
                        onClick={() => onAddHistory(`Previewed Stream Recording ${index}`)}
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Preview
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="h-full">
            <VideoHistory 
              history={editHistory}
              currentIndex={historyIndex}
              onJumpTo={onJumpToHistory}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </>
  );
};

export default VideoMediaSidebar;
