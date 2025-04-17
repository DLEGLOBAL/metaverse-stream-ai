
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Palette, ChevronDown, Check, Edit, Trash2, RotateCcw } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CustomTheme } from '@/contexts/theme/customTheme.types';

interface ThemeActionsProps {
  customThemes: CustomTheme[];
  activeCustomThemeId: string | null;
  onCreateTheme: () => void;
  onEditTheme: (theme: CustomTheme) => void;
  onDeleteTheme: (id: string) => void;
  onApplyTheme: (id: string) => void;
  onResetTheme: () => void;
}

export const ThemeActions = ({
  customThemes,
  activeCustomThemeId,
  onCreateTheme,
  onEditTheme,
  onDeleteTheme,
  onApplyTheme,
  onResetTheme,
}: ThemeActionsProps) => {
  const activeTheme = customThemes.find(t => t.id === activeCustomThemeId);

  return (
    <div className="flex space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center">
            <Palette className="h-4 w-4 mr-2" />
            {activeTheme ? activeTheme.name : "Default Theme"}
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[200px] bg-meta-dark-blue text-white border border-meta-teal/30">
          <DropdownMenuLabel>Select Theme</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-700" />
          
          <DropdownMenuItem 
            onClick={onResetTheme}
            className="flex items-center justify-between"
          >
            <span>Default Theme</span>
            {!activeCustomThemeId && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
          
          {customThemes.length > 0 && (
            <>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuLabel>Custom Themes</DropdownMenuLabel>
              
              {customThemes.map(theme => (
                <DropdownMenuItem
                  key={theme.id}
                  className="flex items-center justify-between group"
                >
                  <div 
                    className="flex-1 cursor-pointer" 
                    onClick={() => onApplyTheme(theme.id)}
                  >
                    <span className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                      {theme.name}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditTheme(theme);
                      }}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTheme(theme.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  {activeCustomThemeId === theme.id && (
                    <Check className="h-4 w-4 ml-2" />
                  )}
                </DropdownMenuItem>
              ))}
            </>
          )}
          
          <DropdownMenuSeparator className="bg-gray-700" />
          <DropdownMenuItem 
            onClick={onCreateTheme}
            className="flex items-center text-meta-teal"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Theme
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

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
    </div>
  );
};
