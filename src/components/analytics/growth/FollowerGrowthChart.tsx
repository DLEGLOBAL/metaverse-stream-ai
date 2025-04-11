
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import BarChartComponent from '@/components/charts/BarChartComponent';

interface FollowerGrowthChartProps {
  followerGrowth: any[];
  activePlatform: string;
}

const FollowerGrowthChart = ({ followerGrowth, activePlatform }: FollowerGrowthChartProps) => {
  const barConfig = [];
  
  if (activePlatform === 'all' || activePlatform === 'twitch') {
    barConfig.push({
      dataKey: 'twitch',
      name: 'Twitch',
      fill: '#9146FF'
    });
  }
  
  if (activePlatform === 'all' || activePlatform === 'youtube') {
    barConfig.push({
      dataKey: 'youtube',
      name: 'YouTube',
      fill: '#FF0000'
    });
  }
  
  if (activePlatform === 'all' || activePlatform === 'facebook') {
    barConfig.push({
      dataKey: 'facebook',
      name: 'Facebook',
      fill: '#1877F2'
    });
  }
  
  if (activePlatform === 'all' || activePlatform === 'tiktok') {
    barConfig.push({
      dataKey: 'tiktok',
      name: 'TikTok',
      fill: '#69C9D0'
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Follower Growth</CardTitle>
        <CardDescription>New followers over time by platform</CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-1 pt-0 overflow-hidden">
        <div className="h-80 px-6">
          <BarChartComponent 
            data={followerGrowth}
            barConfig={barConfig}
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
              },
              tiktok: {
                label: 'TikTok',
                theme: {
                  light: '#69C9D0',
                  dark: '#69C9D0'
                }
              }
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FollowerGrowthChart;
