
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  positive: boolean;
}

const MetricCard = ({ title, value, change, icon, positive }: MetricCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="text-2xl font-bold mt-1">{value}</div>
          </div>
          <div className={`p-2 rounded-full ${positive ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
            {icon}
          </div>
        </div>
        
        <div className="flex items-center mt-3">
          <div className={`text-sm font-medium flex items-center ${positive ? 'text-green-500' : 'text-red-500'}`}>
            {positive ? <ArrowUpRight className="mr-1 h-4 w-4" /> : <ArrowDownRight className="mr-1 h-4 w-4" />}
            {Math.abs(change)}%
          </div>
          <div className="text-sm text-muted-foreground ml-2">vs. previous period</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
