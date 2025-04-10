
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';

interface ThemeColor {
  name: string;
  value: string;
}

interface ThemePreviewProps {
  name: string;
  colors: ThemeColor[];
  onApply: () => void;
}

const ThemePreview = ({ name, colors, onApply }: ThemePreviewProps) => {
  return (
    <Card className="overflow-hidden hover:border-meta-teal transition-colors">
      <CardContent className="p-4">
        <h3 className="font-medium mb-2">{name}</h3>
        <div className="grid grid-cols-5 gap-2 mb-3">
          {colors.map((color, index) => (
            <div 
              key={index}
              className="w-full aspect-square rounded-full border"
              style={{ backgroundColor: color.value }}
              title={`${color.name}: ${color.value}`}
            />
          ))}
        </div>
        <div 
          className="w-full h-10 mb-3 rounded-md border"
          style={{ 
            background: `linear-gradient(to right, ${colors.map(c => c.value).join(', ')})` 
          }}
        />
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={onApply}
        >
          <Palette className="h-4 w-4 mr-1" />
          Apply Theme
        </Button>
      </CardContent>
    </Card>
  );
};

export default ThemePreview;
