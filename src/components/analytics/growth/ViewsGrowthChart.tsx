
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LineChartComponent from '@/components/charts/LineChartComponent';

interface ViewsGrowthChartProps {
  viewsGrowth: any[];
}

const ViewsGrowthChart = ({ viewsGrowth }: ViewsGrowthChartProps) => {
  const lineConfig = [
    {
      dataKey: 'total',
      name: 'Total Views',
      stroke: '#10B981',
      dot: { r: 4 }
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Views Growth</CardTitle>
        <CardDescription>Total views over time by platform</CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-1 pt-0 overflow-hidden">
        <div className="h-80 px-6">
          <LineChartComponent 
            data={viewsGrowth}
            lineConfig={lineConfig}
            config={{
              total: {
                label: 'Total Views',
                theme: {
                  light: '#10B981',
                  dark: '#10B981'
                }
              }
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ViewsGrowthChart;
