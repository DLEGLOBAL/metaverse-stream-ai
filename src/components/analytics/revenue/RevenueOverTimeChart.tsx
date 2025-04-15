
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChartContainer } from '@/components/ui/chart';

interface RevenueOverTimeProps {
  revenueOverTime: {
    date: string;
    amount: number;
  }[];
}

const RevenueOverTimeChart = ({ revenueOverTime }: RevenueOverTimeProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Over Time</CardTitle>
        <CardDescription>Total earnings by date</CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-1 pt-0">
        <ScrollArea className="w-full pb-4">
          <div className="h-80 min-w-[500px] px-6">
            <ChartContainer
              config={{
                revenue: {
                  label: 'Revenue',
                  theme: {
                    light: '#10B981',
                    dark: '#10B981'
                  }
                }
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueOverTime}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    name="Revenue" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RevenueOverTimeChart;
