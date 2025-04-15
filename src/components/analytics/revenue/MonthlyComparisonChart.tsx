
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChartContainer } from '@/components/ui/chart';

interface MonthlyComparisonProps {
  monthlyComparison: {
    source: string;
    current: number;
    previous: number;
  }[];
}

const MonthlyComparisonChart = ({ monthlyComparison }: MonthlyComparisonProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Comparison</CardTitle>
        <CardDescription>Revenue changes month over month</CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-1 pt-0">
        <ScrollArea className="w-full pb-4">
          <div className="h-80 min-w-[500px] px-6">
            <ChartContainer
              config={{
                current: {
                  label: 'Current',
                  theme: {
                    light: '#10B981',
                    dark: '#10B981'
                  }
                },
                previous: {
                  label: 'Previous',
                  theme: {
                    light: '#6366F1',
                    dark: '#6366F1'
                  }
                }
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyComparison}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="source" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                  <Legend />
                  <Bar dataKey="current" name="Current Month" fill="#10B981" />
                  <Bar dataKey="previous" name="Previous Month" fill="#6366F1" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default MonthlyComparisonChart;
