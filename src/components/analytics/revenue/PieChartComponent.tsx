
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

interface PieChartComponentProps {
  data: any[];
  nameKey: string;
  dataKey: string;
  colors: string[];
  config: Record<string, any>;
  labelFormat?: (name: string, percent: number) => string;
  tooltipFormatter?: (value: any, name: string, props: any) => [string, string];
}

const PieChartComponent = ({ 
  data, 
  nameKey, 
  dataKey, 
  colors, 
  config,
  labelFormat = (name, percent) => `${name} ${(percent * 100).toFixed(0)}%`,
  tooltipFormatter = (value) => [`${value}`, 'Value']
}: PieChartComponentProps) => {
  return (
    <ChartContainer config={config}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey={dataKey}
            nameKey={nameKey}
            label={({name, percent}) => labelFormat(name, percent)}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip formatter={tooltipFormatter} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default PieChartComponent;
