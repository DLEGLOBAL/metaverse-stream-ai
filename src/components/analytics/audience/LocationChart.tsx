
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LocationChartProps {
  locationData: {
    country: string;
    viewers: number;
  }[];
}

const LocationChart = ({ locationData }: LocationChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Viewer Locations</CardTitle>
        <CardDescription>Geographic distribution of your audience</CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-1 pt-0">
        <ScrollArea className="w-full pb-4 touch-auto">
          <div className="h-80 min-w-[500px] px-6">
            <ChartContainer
              config={{
                viewers: {
                  label: 'Viewers',
                  theme: {
                    light: '#6366F1',
                    dark: '#6366F1'
                  }
                }
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={locationData}
                  margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={false} />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="country" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="viewers" name="Viewers" fill="#6366F1" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default LocationChart;
