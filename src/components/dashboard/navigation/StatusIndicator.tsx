
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

interface StatusIndicatorProps {
  collapsed: boolean;
  theme: string;
}

export const StatusIndicator = ({ collapsed, theme }: StatusIndicatorProps) => {
  return (
    <div className="p-4">
      <div 
        className={cn(
          "p-3 rounded-lg", 
          theme === 'dark' 
            ? "bg-meta-purple/20 border border-meta-purple/20" 
            : "bg-meta-teal/10 border border-meta-teal/20"
        )}
      >
        <div className={cn(
          "flex items-center", 
          collapsed ? "justify-center" : "justify-between"
        )}>
          <span className={cn(
            "flex items-center",
            collapsed ? "hidden" : "flex"
          )}>
            <span className={theme === 'dark' ? "text-meta-purple" : "text-meta-teal"}>
              {theme === 'dark' ? "Pro" : "Free"}
            </span>
            <span className="bg-gray-300/20 h-4 w-px mx-2"></span>
            <span className={theme === 'dark' ? "text-gray-300" : "text-gray-500"}>
              2 TB Used
            </span>
          </span>
          <Button 
            size="icon" 
            variant="ghost"
            className={theme === 'dark' ? "text-meta-purple hover:text-white hover:bg-meta-purple/20" : "text-meta-teal hover:text-meta-dark-blue hover:bg-meta-teal/20"}
          >
            <Settings size={collapsed ? 18 : 16} />
          </Button>
        </div>
      </div>
    </div>
  );
};
