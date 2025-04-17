
import React from 'react';
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Undo, Redo } from 'lucide-react';
import VideoClipsList from './VideoClipsList';
import VideoEffects from './VideoEffects';
import VideoKeyframes from './VideoKeyframes';
import VideoTransitions from './VideoTransitions';
import VideoExportPanel from './VideoExportPanel';
import VideoMultitrackControls from './VideoMultitrackControls';

interface VideoEditorToolsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentTime: number;
  duration: number;
  historyIndex: number;
  editHistory: string[];
  onUndo: () => void;
  onRedo: () => void;
  onAddHistory: (action: string) => void;
  onAddClip?: (track: number) => void;
  onRemoveClip?: (clipId: string) => void;
}

const VideoEditorTools = ({
  activeTab,
  setActiveTab,
  currentTime,
  duration,
  historyIndex,
  editHistory,
  onUndo,
  onRedo,
  onAddHistory,
  onAddClip,
  onRemoveClip
}: VideoEditorToolsProps) => {
  return (
    <>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Editor Tools</CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onUndo}
              disabled={historyIndex === 0}
            >
              <Undo className="h-4 w-4 mr-1" />
              Undo
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onRedo}
              disabled={historyIndex === editHistory.length - 1}
            >
              <Redo className="h-4 w-4 mr-1" />
              Redo
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[calc(100%-69px)] overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-6 mb-4">
            <TabsTrigger value="multitrack">Multitrack</TabsTrigger>
            <TabsTrigger value="clips">Clips</TabsTrigger>
            <TabsTrigger value="effects">Effects</TabsTrigger>
            <TabsTrigger value="keyframes">Keyframes</TabsTrigger>
            <TabsTrigger value="transitions">Transitions</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>
          
          <TabsContent value="multitrack" className="h-full">
            <VideoMultitrackControls 
              onAddHistory={onAddHistory} 
              onAddClip={onAddClip}
            />
          </TabsContent>
          
          <TabsContent value="clips" className="h-full">
            <VideoClipsList 
              onAddHistory={onAddHistory} 
              onAddClip={onAddClip}
              onRemoveClip={onRemoveClip}
            />
          </TabsContent>
          
          <TabsContent value="effects" className="h-full">
            <VideoEffects onAddHistory={onAddHistory} />
          </TabsContent>
          
          <TabsContent value="keyframes" className="h-full">
            <VideoKeyframes 
              currentTime={currentTime} 
              duration={duration}
              onAddHistory={onAddHistory}
            />
          </TabsContent>
          
          <TabsContent value="transitions" className="h-full">
            <VideoTransitions onAddHistory={onAddHistory} />
          </TabsContent>
          
          <TabsContent value="export" className="h-full">
            <VideoExportPanel onExport={() => onAddHistory("Exported video")} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </>
  );
};

export default VideoEditorTools;
