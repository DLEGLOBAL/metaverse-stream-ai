
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DeviceDistributionChartProps {
  deviceData: {
    name: string;
    value: number;
  }[];
}

const DeviceDistributionChart = ({ deviceData }: DeviceDistributionChartProps) => {
  const DEVICE_COLORS = ['#10B981', '#6366F1', '#F59E0B', '#8B5CF6'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Viewing Devices</CardTitle>
        <CardDescription>How viewers are watching your content</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ChartContainer
            config={{
              device: {
                label: 'Device',
                theme: {
                  light: '#6366F1',
                  dark: '#6366F1'
                }
              }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={DEVICE_COLORS[index % DEVICE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceDistributionChart;
