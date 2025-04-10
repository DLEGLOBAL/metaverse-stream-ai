
import React from 'react';
import { Image } from 'lucide-react';
import BrandingAIPreview from '@/components/branding/BrandingAIPreview';

interface LogoDisplaySectionProps {
  logos: string[];
  onDownload: (type: string) => void;
  onDelete: (type: string) => void;
}

const LogoDisplaySection = ({ logos, onDownload, onDelete }: LogoDisplaySectionProps) => {
  return (
    <>
      {logos.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {logos.map((logo, index) => (
            <BrandingAIPreview
              key={index}
              type="logo"
              imageUrl={logo}
              onDownload={() => onDownload('Logo')}
              onDelete={() => onDelete('Logo')}
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-8 border border-dashed rounded-md">
          <Image className="h-12 w-12 mx-auto text-muted-foreground" />
          <p className="mt-2 text-muted-foreground">
            Your generated logos will appear here
          </p>
        </div>
      )}
    </>
  );
};

export default LogoDisplaySection;
