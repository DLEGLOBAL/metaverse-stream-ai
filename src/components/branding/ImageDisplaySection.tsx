
import React from 'react';
import { Image } from 'lucide-react';
import BrandingAIPreview from '@/components/branding/BrandingAIPreview';

interface ImageDisplaySectionProps {
  images: string[];
  onDownload: (type: string) => void;
  onDelete: (type: string) => void;
}

const ImageDisplaySection = ({ images, onDownload, onDelete }: ImageDisplaySectionProps) => {
  return (
    <>
      {images.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((image, index) => (
            <BrandingAIPreview
              key={index}
              type={index < 2 ? "banner" : "profile"}
              imageUrl={image}
              onDownload={() => onDownload('Image')}
              onDelete={() => onDelete('Image')}
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-8 border border-dashed rounded-md">
          <Image className="h-12 w-12 mx-auto text-muted-foreground" />
          <p className="mt-2 text-muted-foreground">
            Your generated images will appear here
          </p>
        </div>
      )}
    </>
  );
};

export default ImageDisplaySection;
