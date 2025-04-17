
import React from 'react';
import { CustomTheme } from '@/contexts/theme/customTheme.types';
import { ThemeDropdownMenu } from './components/ThemeDropdownMenu';
import { ThemeActionButtons } from './components/ThemeActionButtons';

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
      <ThemeDropdownMenu
        activeTheme={activeTheme}
        customThemes={customThemes}
        activeCustomThemeId={activeCustomThemeId}
        onCreateTheme={onCreateTheme}
        onEditTheme={onEditTheme}
        onDeleteTheme={onDeleteTheme}
        onApplyTheme={onApplyTheme}
        onResetTheme={onResetTheme}
      />
      
      <ThemeActionButtons
        activeCustomThemeId={activeCustomThemeId}
        onCreateTheme={onCreateTheme}
        onResetTheme={onResetTheme}
      />
    </div>
  );
};
