
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface AgeDistributionChartProps {
  ageGroups: {
    name: string;
    value: number;
  }[];
}

const AgeDistributionChart = ({ ageGroups }: AgeDistributionChartProps) => {
  const AGE_COLORS = ['#10B981', '#6366F1', '#F59E0B', '#8B5CF6', '#EF4444'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Age Distribution</CardTitle>
        <CardDescription>Viewer demographics by age group</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ChartContainer
            config={{
              age: {
                label: 'Age Groups',
                theme: {
                  light: '#10B981',
                  dark: '#10B981'
                }
              }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ageGroups}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {ageGroups.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={AGE_COLORS[index % AGE_COLORS.length]} />
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

export default AgeDistributionChart;
