import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Users, Play, Clock, DollarSign } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { getAnalyticsData } from '@/services/analyticsService';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AnalyticsOverviewProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  activePlatform: string;
}

const AnalyticsOverview = ({ dateRange, activePlatform }: AnalyticsOverviewProps) => {
  // For demo purposes, we'll use sample data
  const { overviewMetrics, viewershipData, platformBreakdown } = getAnalyticsData(dateRange, activePlatform);

  return (
    <div className="space-y-6 w-full">
      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Viewers"
          value={overviewMetrics.totalViewers}
          change={overviewMetrics.viewersChange}
          icon={<Users className="h-4 w-4" />}
          positive={overviewMetrics.viewersChange > 0}
        />
        <MetricCard 
          title="Stream Hours"
          value={overviewMetrics.streamHours}
          change={overviewMetrics.hoursChange}
          icon={<Clock className="h-4 w-4" />}
          positive={overviewMetrics.hoursChange > 0}
        />
        <MetricCard 
          title="New Followers"
          value={overviewMetrics.newFollowers}
          change={overviewMetrics.followersChange}
          icon={<TrendingUp className="h-4 w-4" />}
          positive={overviewMetrics.followersChange > 0}
        />
        <MetricCard 
          title="Revenue"
          value={`$${overviewMetrics.revenue}`}
          change={overviewMetrics.revenueChange}
          icon={<DollarSign className="h-4 w-4" />}
          positive={overviewMetrics.revenueChange > 0}
        />
      </div>

      {/* Viewership Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Viewership Trends</CardTitle>
          <CardDescription>Average viewers over time across all platforms</CardDescription>
        </CardHeader>
        <CardContent className="px-0 pb-1 pt-0">
          <ScrollArea className="w-full pb-4">
            <div className="h-80 min-w-[700px] px-6">
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
                      light: '#000000',
                      dark: '#FFFFFF'
                    }
                  }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={viewershipData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend wrapperStyle={{ paddingTop: 10, fontSize: 12 }} />
                    {activePlatform === 'all' || activePlatform === 'twitch' ? (
                      <Area 
                        type="monotone" 
                        dataKey="twitch" 
                        stackId="1"
                        stroke="#9146FF" 
                        fill="#9146FF" 
                        fillOpacity={0.5} 
                      />
                    ) : null}
                    {activePlatform === 'all' || activePlatform === 'youtube' ? (
                      <Area 
                        type="monotone" 
                        dataKey="youtube" 
                        stackId="1"
                        stroke="#FF0000" 
                        fill="#FF0000" 
                        fillOpacity={0.5} 
                      />
                    ) : null}
                    {activePlatform === 'all' || activePlatform === 'facebook' ? (
                      <Area 
                        type="monotone" 
                        dataKey="facebook" 
                        stackId="1"
                        stroke="#1877F2" 
                        fill="#1877F2" 
                        fillOpacity={0.5} 
                      />
                    ) : null}
                    {activePlatform === 'all' || activePlatform === 'tiktok' ? (
                      <Area 
                        type="monotone" 
                        dataKey="tiktok" 
                        stackId="1"
                        stroke="#69C9D0" 
                        fill="#69C9D0" 
                        fillOpacity={0.5} 
                      />
                    ) : null}
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Platform Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Stream</CardTitle>
            <CardDescription>Your most viewed stream in this time period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="aspect-video bg-meta-dark-blue/40 rounded-md flex items-center justify-center">
                <Play className="h-12 w-12 text-meta-teal opacity-60" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Valorant Championship Finals</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Platform</p>
                    <p className="font-medium">Twitch</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="font-medium">Aug 15, 2023</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Peak Viewers</p>
                    <p className="font-medium">4,289</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Average Viewers</p>
                    <p className="font-medium">2,856</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Milestones</CardTitle>
            <CardDescription>Your latest achievements across platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-meta-teal/10 rounded-md">
                <div className="h-10 w-10 rounded-full bg-meta-teal/20 flex items-center justify-center mr-3">
                  <Users className="h-5 w-5 text-meta-teal" />
                </div>
                <div>
                  <h4 className="font-medium">10,000 Followers Milestone</h4>
                  <p className="text-sm text-muted-foreground">Reached on Twitch - Aug 12, 2023</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-meta-purple/10 rounded-md">
                <div className="h-10 w-10 rounded-full bg-meta-purple/20 flex items-center justify-center mr-3">
                  <Play className="h-5 w-5 text-meta-purple" />
                </div>
                <div>
                  <h4 className="font-medium">1,000 Hours Streamed</h4>
                  <p className="text-sm text-muted-foreground">Total across all platforms</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-yellow-500/10 rounded-md">
                <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center mr-3">
                  <DollarSign className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <h4 className="font-medium">$1,000 Monthly Revenue</h4>
                  <p className="text-sm text-muted-foreground">First time reached in July 2023</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  positive: boolean;
}

const MetricCard = ({ title, value, change, icon, positive }: MetricCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="text-2xl font-bold mt-1">{value}</div>
          </div>
          <div className={`p-2 rounded-full ${positive ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
            {icon}
          </div>
        </div>
        
        <div className="flex items-center mt-3">
          <div className={`text-sm font-medium flex items-center ${positive ? 'text-green-500' : 'text-red-500'}`}>
            {positive ? <ArrowUpRight className="mr-1 h-4 w-4" /> : <ArrowDownRight className="mr-1 h-4 w-4" />}
            {Math.abs(change)}%
          </div>
          <div className="text-sm text-muted-foreground ml-2">vs. previous period</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsOverview;
