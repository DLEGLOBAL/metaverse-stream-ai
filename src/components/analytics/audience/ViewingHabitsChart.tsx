
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ViewingHabitsChartProps {
  viewingHabits: {
    hour: string;
    weekday: number;
    weekend: number;
  }[];
}

const ViewingHabitsChart = ({ viewingHabits }: ViewingHabitsChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Viewing Habits</CardTitle>
        <CardDescription>When your audience watches your streams</CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-1 pt-0">
        <ScrollArea className="w-full pb-4 touch-auto">
          <div className="h-80 min-w-[500px] px-6">
            <ChartContainer
              config={{
                weekday: {
                  label: 'Weekday',
                  theme: {
                    light: '#10B981',
                    dark: '#10B981'
                  }
                },
                weekend: {
                  label: 'Weekend',
                  theme: {
                    light: '#8B5CF6',
                    dark: '#8B5CF6'
                  }
                }
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={viewingHabits}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="weekday" name="Weekday" fill="#10B981" />
                  <Bar dataKey="weekend" name="Weekend" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ViewingHabitsChart;
