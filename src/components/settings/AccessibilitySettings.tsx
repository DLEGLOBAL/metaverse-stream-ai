
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';
import { useEpilepsySafeMode } from '@/components/accessibility/EpilepsySafeMode';
import { Switch } from '@/components/ui/switch';
import { Sun, Moon, Eye } from 'lucide-react';

const AccessibilitySettings = () => {
  const { theme, toggleTheme } = useTheme();
  const { epilepsySafeMode, toggleEpilepsySafeMode } = useEpilepsySafeMode();
  
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-white dark:text-white">Accessibility Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center">
                {theme === 'dark' ? (
                  <Moon className="h-5 w-5 text-meta-teal mr-2" />
                ) : (
                  <Sun className="h-5 w-5 text-meta-teal mr-2" />
                )}
                <h3 className="text-lg font-medium">{theme === 'dark' ? 'Dark' : 'Light'} Mode</h3>
              </div>
              <p className="text-sm text-gray-400">
                Switch between light and dark themes for comfortable viewing.
              </p>
            </div>
            <Switch 
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center">
                <Eye className="h-5 w-5 text-meta-teal mr-2" />
                <h3 className="text-lg font-medium">Epilepsy Safe Mode</h3>
              </div>
              <p className="text-sm text-gray-400">
                Reduces animations and flashing effects for a safer viewing experience.
              </p>
            </div>
            <Switch 
              checked={epilepsySafeMode}
              onCheckedChange={toggleEpilepsySafeMode}
            />
          </div>
          
          <div className="pt-4 border-t border-gray-700">
            <h3 className="text-lg font-medium mb-2">Additional Accessibility Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch id="font-size" />
                <label htmlFor="font-size" className="text-sm">Larger Font Size</label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="contrast" />
                <label htmlFor="contrast" className="text-sm">High Contrast</label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="motion" />
                <label htmlFor="motion" className="text-sm">Reduce Motion</label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="screen-reader" />
                <label htmlFor="screen-reader" className="text-sm">Screen Reader Support</label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessibilitySettings;
