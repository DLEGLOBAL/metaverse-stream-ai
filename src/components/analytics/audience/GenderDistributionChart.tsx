
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface GenderDistributionChartProps {
  genderDistribution: {
    name: string;
    value: number;
  }[];
}

const GenderDistributionChart = ({ genderDistribution }: GenderDistributionChartProps) => {
  const GENDER_COLORS = ['#3B82F6', '#EC4899', '#6366F1'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gender Distribution</CardTitle>
        <CardDescription>Viewer demographics by gender</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ChartContainer
            config={{
              gender: {
                label: 'Gender',
                theme: {
                  light: '#3B82F6',
                  dark: '#3B82F6'
                }
              }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {genderDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />
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

export default GenderDistributionChart;
