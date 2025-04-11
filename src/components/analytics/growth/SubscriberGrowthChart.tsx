
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LineChartComponent from '@/components/charts/LineChartComponent';

interface SubscriberGrowthChartProps {
  subscriberGrowth: any[];
  activePlatform: string;
}

const SubscriberGrowthChart = ({ subscriberGrowth, activePlatform }: SubscriberGrowthChartProps) => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscriber Growth</CardTitle>
        <CardDescription>Paid subscribers over time by platform</CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-1 pt-0 overflow-hidden">
        <div className="h-80 px-6">
          <LineChartComponent 
            data={subscriberGrowth}
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
              }
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriberGrowthChart;
