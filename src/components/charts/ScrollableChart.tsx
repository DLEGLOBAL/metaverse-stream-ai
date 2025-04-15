
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChartContainer } from '@/components/ui/chart';

interface ScrollableChartProps {
  children: React.ReactNode;
  config: Record<string, any>;
  minWidth?: string;
  height?: string;
}

const ScrollableChart = ({ 
  children, 
  config, 
  minWidth = "500px", 
  height = "100%" 
}: ScrollableChartProps) => {
  return (
    <ChartContainer config={config}>
      <ScrollArea className="h-full w-full touch-auto" orientation="horizontal">
        <div style={{ minWidth, height }}>
          {children}
        </div>
      </ScrollArea>
    </ChartContainer>
  );
};

export default ScrollableChart;
