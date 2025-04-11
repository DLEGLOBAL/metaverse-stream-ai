
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ScrollableChart from './ScrollableChart';

interface LineChartComponentProps {
  data: any[];
  lineConfig: {
    dataKey: string;
    name: string;
    stroke: string;
    strokeWidth?: number;
    dot?: boolean | object;
  }[];
  config: Record<string, any>;
  minWidth?: string;
  height?: string;
}

const LineChartComponent = ({ 
  data, 
  lineConfig, 
  config, 
  minWidth = "500px", 
  height = "100%" 
}: LineChartComponentProps) => {
  return (
    <ScrollableChart config={config} minWidth={minWidth} height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {lineConfig.map((config, index) => (
            <Line 
              key={index}
              type="monotone" 
              dataKey={config.dataKey} 
              name={config.name} 
              stroke={config.stroke} 
              strokeWidth={config.strokeWidth || 2}
              dot={config.dot}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ScrollableChart>
  );
};

export default LineChartComponent;
