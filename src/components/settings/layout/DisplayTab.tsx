
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

interface DisplayTabProps {
  layoutSettings: {
    fontScale: number;
    systemFont: boolean;
  };
  handleSliderChange: (setting: string, value: number[]) => void;
  handleToggleChange: (setting: string, value: boolean) => void;
}

const DisplayTab: React.FC<DisplayTabProps> = ({ 
  layoutSettings,
  handleSliderChange,
  handleToggleChange
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Font Size</h3>
        <div className="flex items-center space-x-4">
          <span className="text-xs text-gray-400">A</span>
          <Slider
            value={[layoutSettings.fontScale]}
            min={75}
            max={150}
            step={5}
            onValueChange={(value) => handleSliderChange('fontScale', value)}
            className="flex-1"
          />
          <span className="text-xl text-gray-400">A</span>
        </div>
        <div className="text-xs text-gray-400 mt-2">
          Font scale: {layoutSettings.fontScale}%
        </div>
      </div>
      
      <div className="space-y-3 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-base font-medium">System Font</h3>
            <p className="text-xs text-gray-400">Use your system's default font</p>
          </div>
          <Switch 
            checked={layoutSettings.systemFont}
            onCheckedChange={(checked) => handleToggleChange('systemFont', checked)}
          />
        </div>
        
        <div className="pt-4">
          <h3 className="text-base font-medium mb-2">Font Preview</h3>
          <div className="bg-meta-dark-blue/30 p-4 rounded-md">
            <p className="mb-2" style={{ fontSize: `${layoutSettings.fontScale}%` }}>
              This is how your text will appear
            </p>
            <p className="text-sm text-gray-400" style={{ fontSize: `${layoutSettings.fontScale * 0.875 / 100}rem` }}>
              Smaller text like this will also be adjusted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayTab;
