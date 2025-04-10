
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Trash2 } from 'lucide-react';

interface BrandingAIPreviewProps {
  type: 'logo' | 'banner' | 'profile';
  imageUrl: string;
  onDownload: () => void;
  onDelete: () => void;
}

const BrandingAIPreview = ({ type, imageUrl, onDownload, onDelete }: BrandingAIPreviewProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative group">
        <img 
          src={imageUrl} 
          alt={`Generated ${type}`} 
          className={`w-full ${type === 'logo' ? 'aspect-square' : 'aspect-video'} object-cover`}
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button size="sm" variant="secondary" onClick={onDownload}>
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
          <Button size="sm" variant="outline" onClick={onDelete}>
            <Trash2 className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      </div>
      <CardContent className="p-3">
        <p className="text-sm text-center capitalize">{type}</p>
      </CardContent>
    </Card>
  );
};

export default BrandingAIPreview;
