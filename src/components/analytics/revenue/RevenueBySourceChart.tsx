
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

interface RevenueBySourceProps {
  revenueBySource: {
    name: string;
    value: number;
  }[];
}

const RevenueBySourceChart = ({ revenueBySource }: RevenueBySourceProps) => {
  const REVENUE_COLORS = ['#10B981', '#6366F1', '#F59E0B', '#8B5CF6', '#EF4444', '#EC4899'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue By Source</CardTitle>
        <CardDescription>Breakdown of revenue streams</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer
            config={{
              source: {
                label: 'Source',
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
                  data={revenueBySource}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {revenueBySource.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={REVENUE_COLORS[index % REVENUE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueBySourceChart;
