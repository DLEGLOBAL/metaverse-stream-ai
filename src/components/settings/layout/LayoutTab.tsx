
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { PanelLeft, PanelRight, MonitorSmartphone, Maximize2 } from 'lucide-react';

interface LayoutTabProps {
  layoutSettings: {
    sidebarWidth: number;
    contentWidth: number;
    alwaysShowLabels: boolean;
    compactMode: boolean;
    denseLayout: boolean;
    fullWidthLayout: boolean;
  };
  handleSliderChange: (setting: string, value: number[]) => void;
  handleToggleChange: (setting: string, value: boolean) => void;
}

const LayoutTab: React.FC<LayoutTabProps> = ({ 
  layoutSettings,
  handleSliderChange,
  handleToggleChange
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Sidebar Width</h3>
        <div className="flex items-center space-x-4">
          <PanelLeft className="text-gray-400 h-5 w-5" />
          <Slider
            value={[layoutSettings.sidebarWidth]}
            min={48}
            max={96}
            step={4}
            onValueChange={(value) => handleSliderChange('sidebarWidth', value)}
            className="flex-1"
          />
          <PanelRight className="text-gray-400 h-5 w-5" />
        </div>
        <div className="text-xs text-gray-400 mt-2">
          Sidebar width: {layoutSettings.sidebarWidth}px
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Content Width</h3>
        <div className="flex items-center space-x-4">
          <MonitorSmartphone className="text-gray-400 h-5 w-5" />
          <Slider
            value={[layoutSettings.contentWidth]}
            min={60}
            max={100}
            step={5}
            onValueChange={(value) => handleSliderChange('contentWidth', value)}
            className="flex-1"
          />
          <Maximize2 className="text-gray-400 h-5 w-5" />
        </div>
        <div className="text-xs text-gray-400 mt-2">
          Content width: {layoutSettings.contentWidth}%
        </div>
      </div>
      
      <div className="space-y-3 pt-4 border-t border-gray-700">
        <LayoutToggleOption
          title="Always Show Labels"
          description="Show text labels alongside icons in the UI"
          checked={layoutSettings.alwaysShowLabels}
          onChange={(checked) => handleToggleChange('alwaysShowLabels', checked)}
        />
        
        <LayoutToggleOption
          title="Compact Mode"
          description="Reduce spacing between UI elements"
          checked={layoutSettings.compactMode}
          onChange={(checked) => handleToggleChange('compactMode', checked)}
        />
        
        <LayoutToggleOption
          title="Dense Layout"
          description="Show more content in the same space"
          checked={layoutSettings.denseLayout}
          onChange={(checked) => handleToggleChange('denseLayout', checked)}
        />
        
        <LayoutToggleOption
          title="Full Width Layout"
          description="Expand content to fill the entire screen"
          checked={layoutSettings.fullWidthLayout}
          onChange={(checked) => handleToggleChange('fullWidthLayout', checked)}
        />
      </div>
    </div>
  );
};

interface LayoutToggleOptionProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const LayoutToggleOption: React.FC<LayoutToggleOptionProps> = ({
  title,
  description,
  checked,
  onChange
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <h3 className="text-base font-medium">{title}</h3>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
      <Switch 
        checked={checked}
        onCheckedChange={onChange}
      />
    </div>
  );
};

export default LayoutTab;
