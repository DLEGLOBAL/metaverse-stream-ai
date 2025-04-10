
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Palette, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeColor {
  name: string;
  value: string;
}

interface ThemePreviewProps {
  name: string;
  colors: ThemeColor[];
  onApply: () => void;
  onDelete?: () => void;
}

const ThemePreview = ({ name, colors, onApply, onDelete }: ThemePreviewProps) => {
  // Helper to find a color by name
  const getColor = (name: string): string => {
    const color = colors.find(c => c.name === name);
    return color ? color.value : '#cccccc';
  };

  // Get text color based on background brightness
  const getTextColor = (bgColor: string): string => {
    // Convert hex to RGB
    const hex = bgColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Calculate brightness (weighted RGB)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    // Return black or white based on brightness
    return brightness > 125 ? '#000000' : '#ffffff';
  };

  const primaryColor = getColor('primary');
  const secondaryColor = getColor('secondary');
  const accentColor = getColor('accent');
  const backgroundColor = getColor('background');
  const textColor = getColor('text');

  return (
    <Card className="overflow-hidden hover:border-meta-teal transition-colors">
      <div 
        className="p-6" 
        style={{ 
          backgroundColor: backgroundColor,
          color: textColor
        }}
      >
        <h3 className="font-medium mb-3">{name}</h3>
        
        <div className="grid grid-cols-5 gap-2 mb-4">
          {colors.map((color, index) => (
            <div 
              key={index}
              className="group relative w-full aspect-square rounded-full border-2 border-white/20 flex items-center justify-center"
              style={{ backgroundColor: color.value }}
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center bg-black/50 rounded-full text-xs text-white transition-opacity">
                {color.name}
              </span>
            </div>
          ))}
        </div>
        
        {/* Theme preview elements */}
        <div className="mb-4 space-y-2">
          {/* Button examples */}
          <div className="flex gap-2">
            <button 
              className="px-3 py-1 rounded-md text-sm"
              style={{ 
                backgroundColor: primaryColor,
                color: getTextColor(primaryColor)
              }}
            >
              Primary
            </button>
            <button 
              className="px-3 py-1 rounded-md text-sm"
              style={{ 
                backgroundColor: secondaryColor,
                color: getTextColor(secondaryColor)
              }}
            >
              Secondary
            </button>
          </div>
          
          {/* Card example */}
          <div 
            className="p-2 rounded-md text-xs"
            style={{ 
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderLeft: `4px solid ${accentColor}`
            }}
          >
            Sample card with accent
          </div>
        </div>
        
        <div 
          className="w-full h-2 mb-4 rounded-md"
          style={{ 
            background: `linear-gradient(to right, ${colors.map(c => c.value).join(', ')})` 
          }}
        />
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full group"
            onClick={onApply}
            style={{
              borderColor: textColor,
              color: textColor,
              backgroundColor: 'transparent'
            }}
          >
            <Palette className="h-4 w-4 mr-1 group-hover:hidden" />
            <Check className="h-4 w-4 mr-1 hidden group-hover:block" />
            <span>Apply Theme</span>
          </Button>
          
          {onDelete && (
            <Button
              variant="outline"
              size="sm"
              className="aspect-square p-0"
              onClick={onDelete}
              style={{
                borderColor: textColor,
                color: textColor,
                backgroundColor: 'transparent'
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ThemePreview;
