
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { MousePointer } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface AccessibilityTabProps {
  layoutSettings: {
    reducedAnimations: boolean;
    contrastMode: boolean;
  };
  handleToggleChange: (setting: string, value: boolean) => void;
}

const AccessibilityTab: React.FC<AccessibilityTabProps> = ({ 
  layoutSettings,
  handleToggleChange
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-base font-medium">Reduced Animations</h3>
            <p className="text-xs text-gray-400">Minimize motion for a more comfortable experience</p>
          </div>
          <Switch 
            checked={layoutSettings.reducedAnimations}
            onCheckedChange={(checked) => handleToggleChange('reducedAnimations', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-base font-medium">High Contrast Mode</h3>
            <p className="text-xs text-gray-400">Increase contrast for better visibility</p>
          </div>
          <Switch 
            checked={layoutSettings.contrastMode}
            onCheckedChange={(checked) => handleToggleChange('contrastMode', checked)}
          />
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-700">
        <h3 className="text-lg font-medium mb-4">Preview Cursor Size</h3>
        <div className="flex items-center space-x-4">
          <MousePointer className="text-gray-400 h-4 w-4" />
          <Slider
            defaultValue={[100]}
            min={75}
            max={200}
            step={25}
            onValueChange={(value) => toast({
              title: "Feature Coming Soon",
              description: "Custom cursor size will be available in an upcoming update."
            })}
            className="flex-1"
          />
          <MousePointer className="text-gray-400 h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default AccessibilityTab;
