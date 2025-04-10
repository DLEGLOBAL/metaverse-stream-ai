
import React from 'react';
import { ThemeToggle } from '@/contexts/theme';
import { toast } from "@/hooks/use-toast";

const ThemeTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h3 className="text-lg font-medium">Color Theme</h3>
          <p className="text-sm text-gray-400">
            Switch between light and dark themes for comfortable viewing
          </p>
        </div>
        <ThemeToggle showLabels size="md" />
      </div>
      
      <div className="space-y-4 pt-4 border-t border-gray-700">
        <h3 className="text-lg font-medium">Color Customization</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-300 mb-1 block">
              Accent Color
            </label>
            <div className="flex space-x-2">
              {['#0CFFE1', '#9b87f5', '#f87171', '#4ade80', '#f59e0b'].map(color => (
                <button
                  key={color}
                  onClick={() => toast({
                    title: "Feature Coming Soon",
                    description: "Custom accent colors will be available in an upcoming update."
                  })}
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
    </div>
  );
};

export default ThemeTab;
