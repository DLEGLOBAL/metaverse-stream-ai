
import React from 'react';
import { Helmet } from 'react-helmet';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import VideoEditor from '@/components/video/VideoEditor';
import { Button } from '@/components/ui/button';
import { SplitSquareVertical, HardDrive, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const VideoEditing = () => {
  const handleAutosave = () => {
    toast({
      title: "Project Autosaved",
      description: "Your project has been automatically saved.",
    });
  };
  
  const handleExportOptions = () => {
    toast({
      title: "Export Options",
      description: "Choose export format and quality in the Export tab.",
    });
  };
  
  return (
    <>
      <Helmet>
        <title>Advanced Video Editor | MetaStream</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6 p-6">
          <div className="rounded-lg bg-gradient-to-r from-meta-dark-blue to-meta-purple p-6 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold">Advanced Video Editor</h1>
                <p className="mt-2 text-lg opacity-90">
                  Professional video editing suite with advanced features for livestream recordings.
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="bg-white/10 border-white/20 hover:bg-white/20"
                  onClick={handleAutosave}
                >
                  <HardDrive className="h-4 w-4 mr-2" />
                  Auto Saving...
                </Button>
                <Button 
                  className="bg-meta-teal hover:bg-meta-teal/90 text-meta-dark-blue font-medium"
                  onClick={handleExportOptions}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>
          
          <VideoEditor />
        </div>
      </DashboardLayout>
    </>
  );
};

export default VideoEditing;
