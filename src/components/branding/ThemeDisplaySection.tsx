
import React from 'react';
import { Palette } from 'lucide-react';
import ThemePreview from '@/components/branding/ThemePreview';

interface ThemeColor {
  name: string;
  value: string;
}

interface Theme {
  id: string;
  name: string;
  colors: ThemeColor[];
}

interface ThemeDisplaySectionProps {
  themes: Theme[];
  onApply: (themeId: string) => void;
}

const ThemeDisplaySection = ({ themes, onApply }: ThemeDisplaySectionProps) => {
  return (
    <>
      {themes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <ThemePreview
              key={theme.id}
              name={theme.name}
              colors={theme.colors}
              onApply={() => onApply(theme.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-8 border border-dashed rounded-md">
          <Palette className="h-12 w-12 mx-auto text-muted-foreground" />
          <p className="mt-2 text-muted-foreground">
            Your generated themes will appear here
          </p>
        </div>
      )}
    </>
  );
};

export default ThemeDisplaySection;
