
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { getGrowthData } from '@/services/analyticsService';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AnalyticsGrowthProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  activePlatform: string;
}

const AnalyticsGrowth = ({ dateRange, activePlatform }: AnalyticsGrowthProps) => {
  // Get sample data
  const { followerGrowth, subscriberGrowth, viewsGrowth, retentionRate } = getGrowthData(dateRange, activePlatform);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Follower Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Follower Growth</CardTitle>
            <CardDescription>New followers over time by platform</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-1 pt-0">
            <ScrollArea className="w-full pb-4">
              <div className="h-80 min-w-[500px] px-6">
                <ChartContainer
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
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={followerGrowth}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {activePlatform === 'all' || activePlatform === 'twitch' ? (
                        <Bar dataKey="twitch" name="Twitch" fill="#9146FF" />
                      ) : null}
                      {activePlatform === 'all' || activePlatform === 'youtube' ? (
                        <Bar dataKey="youtube" name="YouTube" fill="#FF0000" />
                      ) : null}
                      {activePlatform === 'all' || activePlatform === 'facebook' ? (
                        <Bar dataKey="facebook" name="Facebook" fill="#1877F2" />
                      ) : null}
                      {activePlatform === 'all' || activePlatform === 'tiktok' ? (
                        <Bar dataKey="tiktok" name="TikTok" fill="#69C9D0" />
                      ) : null}
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Subscriber Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Subscriber Growth</CardTitle>
            <CardDescription>Paid subscribers over time by platform</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-1 pt-0">
            <ScrollArea className="w-full pb-4">
              <div className="h-80 min-w-[500px] px-6">
                <ChartContainer
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
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={subscriberGrowth}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {activePlatform === 'all' || activePlatform === 'twitch' ? (
                        <Line type="monotone" dataKey="twitch" name="Twitch" stroke="#9146FF" strokeWidth={2} />
                      ) : null}
                      {activePlatform === 'all' || activePlatform === 'youtube' ? (
                        <Line type="monotone" dataKey="youtube" name="YouTube" stroke="#FF0000" strokeWidth={2} />
                      ) : null}
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Views Growth */}
        <Card>
          <CardHeader>
            <CardTitle>Total Views Growth</CardTitle>
            <CardDescription>Total views over time by platform</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-1 pt-0">
            <ScrollArea className="w-full pb-4">
              <div className="h-80 min-w-[500px] px-6">
                <ChartContainer
                  config={{
                    total: {
                      label: 'Total Views',
                      theme: {
                        light: '#10B981',
                        dark: '#10B981'
                      }
                    }
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={viewsGrowth}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="total" 
                        name="Total Views" 
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

        {/* Audience Retention */}
        <Card>
          <CardHeader>
            <CardTitle>Audience Retention</CardTitle>
            <CardDescription>Average percentage of stream watched</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-1 pt-0">
            <ScrollArea className="w-full pb-4">
              <div className="h-80 min-w-[500px] px-6">
                <ChartContainer
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
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={retentionRate}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {activePlatform === 'all' || activePlatform === 'twitch' ? (
                        <Line type="monotone" dataKey="twitch" name="Twitch" stroke="#9146FF" strokeWidth={2} />
                      ) : null}
                      {activePlatform === 'all' || activePlatform === 'youtube' ? (
                        <Line type="monotone" dataKey="youtube" name="YouTube" stroke="#FF0000" strokeWidth={2} />
                      ) : null}
                      {activePlatform === 'all' || activePlatform === 'facebook' ? (
                        <Line type="monotone" dataKey="facebook" name="Facebook" stroke="#1877F2" strokeWidth={2} />
                      ) : null}
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsGrowth;
