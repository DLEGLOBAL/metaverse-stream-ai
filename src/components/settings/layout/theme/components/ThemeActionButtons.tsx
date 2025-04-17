
import React from 'react';
import { Plus, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ThemeActionButtonsProps {
  activeCustomThemeId: string | null;
  onCreateTheme: () => void;
  onResetTheme: () => void;
}

export const ThemeActionButtons = ({
  activeCustomThemeId,
  onCreateTheme,
  onResetTheme,
}: ThemeActionButtonsProps) => {
  return (
    <>
      <Button 
        variant="outline" 
        size="sm"
        onClick={onCreateTheme}
        className="flex items-center"
      >
        <Plus className="h-4 w-4 mr-2" />
        New Theme
      </Button>
      
      {activeCustomThemeId && (
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onResetTheme}
          className="flex items-center"
          title="Reset to default theme"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};
