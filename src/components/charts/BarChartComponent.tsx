
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ScrollableChart from './ScrollableChart';

interface BarChartComponentProps {
  data: any[];
  barConfig: {
    dataKey: string;
    name: string;
    fill: string;
  }[];
  config: Record<string, any>;
  minWidth?: string;
  height?: string;
}

const BarChartComponent = ({ 
  data, 
  barConfig, 
  config, 
  minWidth = "500px", 
  height = "100%" 
}: BarChartComponentProps) => {
  return (
    <ScrollableChart config={config} minWidth={minWidth} height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {barConfig.map((config, index) => (
            <Bar 
              key={index} 
              dataKey={config.dataKey} 
              name={config.name} 
              fill={config.fill}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ScrollableChart>
  );
};

export default BarChartComponent;
