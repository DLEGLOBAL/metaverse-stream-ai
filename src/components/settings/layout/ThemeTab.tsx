
import React, { useState } from 'react';
import { ThemeToggle } from '@/contexts/theme';
import { toast } from "@/hooks/use-toast";
import { useCustomTheme } from '@/contexts/theme/CustomThemeContext';
import { CustomTheme } from '@/contexts/theme/customTheme.types';
import { ThemeFormDialog } from './theme/ThemeFormDialog';
import { ThemeActions } from './theme/ThemeActions';
import { useThemeForm, defaultThemeValues } from './theme/useThemeForm';

const ThemeTab = () => {
  const { 
    customThemes, 
    activeCustomThemeId, 
    addCustomTheme, 
    updateCustomTheme,
    deleteCustomTheme, 
    applyCustomTheme, 
    resetToDefaultTheme 
  } = useCustomTheme();
  
  const [isCreatingTheme, setIsCreatingTheme] = useState(false);
  const [editingThemeId, setEditingThemeId] = useState<string | null>(null);
  
  const form = useThemeForm();
  const editForm = useThemeForm();
  
  const activeTheme = activeCustomThemeId 
    ? customThemes.find(theme => theme.id === activeCustomThemeId) 
    : null;
  
  const handleCreateTheme = (data: typeof defaultThemeValues) => {
    const { name, description, isDark, ...colors } = data;
    
    addCustomTheme({
      name,
      description,
      isDark,
      colors: {
        background: colors.background,
        foreground: colors.foreground,
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
        muted: colors.muted,
        border: colors.border,
      }
    });
    
    setIsCreatingTheme(false);
    form.reset();
  };
  
  const handleEditTheme = (data: typeof defaultThemeValues) => {
    if (!editingThemeId) return;
    
    const { name, description, isDark, ...colors } = data;
    
    updateCustomTheme(editingThemeId, {
      name,
      description,
      isDark,
      colors: {
        background: colors.background,
        foreground: colors.foreground,
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
        muted: colors.muted,
        border: colors.border,
      }
    });
    
    setEditingThemeId(null);
    editForm.reset();
  };
  
  const startEditingTheme = (theme: CustomTheme) => {
    const { colors } = theme;
    
    editForm.reset({
      name: theme.name,
      description: theme.description || '',
      isDark: theme.isDark,
      background: colors.background,
      foreground: colors.foreground,
      primary: colors.primary,
      secondary: colors.secondary,
      accent: colors.accent,
      muted: colors.muted,
      border: colors.border,
    });
    
    setEditingThemeId(theme.id);
  };

  const handleAccentColorClick = (color: string) => {
    if (activeCustomThemeId) {
      const activeTheme = customThemes.find(t => t.id === activeCustomThemeId);
      if (activeTheme) {
        updateCustomTheme(activeCustomThemeId, {
          colors: {
            ...activeTheme.colors,
            primary: color,
            accent: color
          }
        });
      }
    } else {
      toast({
        title: "Select a Custom Theme",
        description: "Please create or select a custom theme first to change its accent color."
      });
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Theme toggle */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h3 className="text-lg font-medium">Color Theme</h3>
          <p className="text-sm text-gray-400">
            Switch between light and dark themes for comfortable viewing
          </p>
        </div>
        <ThemeToggle showLabels size="md" />
      </div>
      
      {/* Custom themes section */}
      <div className="space-y-4 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Custom Themes</h3>
          
          <ThemeActions 
            customThemes={customThemes}
            activeCustomThemeId={activeCustomThemeId}
            onCreateTheme={() => setIsCreatingTheme(true)}
            onEditTheme={startEditingTheme}
            onDeleteTheme={deleteCustomTheme}
            onApplyTheme={applyCustomTheme}
            onResetTheme={resetToDefaultTheme}
          />
        </div>
        
        {/* Theme preview */}
        {activeTheme && (
          <div className="mt-4 p-4 rounded-md border border-gray-700 bg-meta-dark-blue/50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">{activeTheme.name}</h4>
              <div className="text-xs text-gray-400">{activeTheme.isDark ? "Dark Theme" : "Light Theme"}</div>
            </div>
            
            {activeTheme.description && (
              <p className="text-xs text-gray-400 mb-3">{activeTheme.description}</p>
            )}
            
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(activeTheme.colors).map(([key, color]) => (
                <div key={key} className="flex flex-col items-center">
                  <div 
                    className="w-10 h-10 rounded-md border border-gray-700 mb-1" 
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs text-gray-400">{key}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Color quick selection */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-sm font-medium text-gray-300 mb-1 block">
              Accent Color
            </label>
            <div className="flex space-x-2">
              {['#0CFFE1', '#9b87f5', '#f87171', '#4ade80', '#f59e0b'].map(color => (
                <button
                  key={color}
                  onClick={() => handleAccentColorClick(color)}
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-300 mb-1 block">
              Sidebar Style
            </label>
            <select className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white">
              <option>Solid</option>
              <option>Transparent</option>
              <option>Glassmorphism</option>
            </select>
          </div>
        </div>
      </div>

      {/* Create Theme Dialog */}
      <ThemeFormDialog
        open={isCreatingTheme}
        onOpenChange={setIsCreatingTheme}
        form={form}
        title="Create Custom Theme"
        description="Create your own custom color theme"
        onSubmit={handleCreateTheme}
      />

      {/* Edit Theme Dialog */}
      <ThemeFormDialog
        open={!!editingThemeId}
        onOpenChange={(open) => !open && setEditingThemeId(null)}
        form={editForm}
        title="Edit Custom Theme"
        description="Modify your custom theme"
        onSubmit={handleEditTheme}
      />
    </div>
  );
};

export default ThemeTab;
