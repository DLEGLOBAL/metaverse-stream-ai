
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface VideoExportPanelProps {
  onExport: () => void;
}

const VideoExportPanel = ({ onExport }: VideoExportPanelProps) => {
  const handleExport = () => {
    toast({
      title: "Exporting Video",
      description: "Your video is being prepared for export. This may take a few minutes.",
    });
    
    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your video has been successfully exported.",
      });
      
      onExport();
    }, 3000);
  };
  
  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Export Settings</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Format</label>
              <select className="w-full p-2 rounded-md border border-gray-700 bg-black/50">
                <option>MP4 (H.264)</option>
                <option>WebM</option>
                <option>MOV</option>
                <option>MP4 (H.265/HEVC)</option>
                <option>GIF</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Quality</label>
              <select className="w-full p-2 rounded-md border border-gray-700 bg-black/50">
                <option>Ultra HD (4K)</option>
                <option>High (1080p)</option>
                <option>Medium (720p)</option>
                <option>Low (480p)</option>
                <option>Web Optimized</option>
              </select>
            </div>
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Advanced Settings</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Bitrate</label>
              <select className="w-full p-2 rounded-md border border-gray-700 bg-black/50">
                <option>High (20 Mbps)</option>
                <option>Medium (10 Mbps)</option>
                <option>Low (5 Mbps)</option>
                <option>Custom</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Frame Rate</label>
              <select className="w-full p-2 rounded-md border border-gray-700 bg-black/50">
                <option>Original</option>
                <option>60 fps</option>
                <option>30 fps</option>
                <option>24 fps</option>
              </select>
            </div>
          </div>
        </div>
        
        <Button className="bg-meta-teal text-meta-dark-blue hover:bg-meta-teal/90" onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export Video
        </Button>
      </div>
    </div>
  );
};

export default VideoExportPanel;
