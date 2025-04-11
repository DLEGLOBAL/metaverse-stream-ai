
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LineChartComponent from '@/components/charts/LineChartComponent';

interface RetentionRateChartProps {
  retentionRate: any[];
  activePlatform: string;
}

const RetentionRateChart = ({ retentionRate, activePlatform }: RetentionRateChartProps) => {
  const lineConfig = [];
  
  if (activePlatform === 'all' || activePlatform === 'twitch') {
    lineConfig.push({
      dataKey: 'twitch',
      name: 'Twitch',
      stroke: '#9146FF'
    });
  }
  
  if (activePlatform === 'all' || activePlatform === 'youtube') {
    lineConfig.push({
      dataKey: 'youtube',
      name: 'YouTube',
      stroke: '#FF0000'
    });
  }
  
  if (activePlatform === 'all' || activePlatform === 'facebook') {
    lineConfig.push({
      dataKey: 'facebook',
      name: 'Facebook',
      stroke: '#1877F2'
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audience Retention</CardTitle>
        <CardDescription>Average percentage of stream watched</CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-1 pt-0 overflow-hidden">
        <div className="h-80 px-6">
          <LineChartComponent 
            data={retentionRate}
            lineConfig={lineConfig}
            config={{
              twitch: {
                label: 'Twitch',
                theme: {
                  light: '#9146FF',
                  dark: '#9146FF'
                }
              },
              youtube: {
                label: 'YouTube',
                theme: {
                  light: '#FF0000',
                  dark: '#FF0000'
                }
              },
              facebook: {
                label: 'Facebook',
                theme: {
                  light: '#1877F2',
                  dark: '#1877F2'
                }
              }
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RetentionRateChart;
