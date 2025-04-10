
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getEngagementData } from '@/services/analyticsService';

interface AnalyticsEngagementProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  activePlatform: string;
}

const AnalyticsEngagement = ({ dateRange, activePlatform }: AnalyticsEngagementProps) => {
  // Get sample data
  const { chatActivity, commentSentiment, topEmotes, streamInteractions, streamHighlights } = getEngagementData(dateRange, activePlatform);

  const SENTIMENT_COLORS = ['#EF4444', '#F59E0B', '#10B981'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chat Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Chat Activity</CardTitle>
            <CardDescription>Messages per stream by platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
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
                  <BarChart
                    data={chatActivity}
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
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Comment Sentiment */}
        <Card>
          <CardHeader>
            <CardTitle>Comment Sentiment</CardTitle>
            <CardDescription>Overall tone of viewer comments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer
                config={{
                  negative: {
                    label: 'Negative',
                    theme: {
                      light: '#EF4444',
                      dark: '#EF4444'
                    }
                  },
                  neutral: {
                    label: 'Neutral',
                    theme: {
                      light: '#F59E0B',
                      dark: '#F59E0B'
                    }
                  },
                  positive: {
                    label: 'Positive',
                    theme: {
                      light: '#10B981',
                      dark: '#10B981'
                    }
                  }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={commentSentiment}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {commentSentiment.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[index % SENTIMENT_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stream Interactions */}
        <Card>
          <CardHeader>
            <CardTitle>Stream Interactions</CardTitle>
            <CardDescription>Likes, shares, and comments over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer
                config={{
                  likes: {
                    label: 'Likes',
                    theme: {
                      light: '#10B981',
                      dark: '#10B981'
                    }
                  },
                  comments: {
                    label: 'Comments',
                    theme: {
                      light: '#6366F1',
                      dark: '#6366F1'
                    }
                  },
                  shares: {
                    label: 'Shares',
                    theme: {
                      light: '#F59E0B',
                      dark: '#F59E0B'
                    }
                  }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={streamInteractions}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="likes" 
                      name="Likes" 
                      stroke="#10B981" 
                      strokeWidth={2} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="comments" 
                      name="Comments" 
                      stroke="#6366F1" 
                      strokeWidth={2} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="shares" 
                      name="Shares" 
                      stroke="#F59E0B" 
                      strokeWidth={2} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Emotes/Reactions */}
        <Card>
          <CardHeader>
            <CardTitle>Top Emotes & Reactions</CardTitle>
            <CardDescription>Most used emotes across platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Emote</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead className="text-right">Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topEmotes.map((emote, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="w-8 h-8 mr-2 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                          {emote.icon}
                        </div>
                        {emote.name}
                      </div>
                    </TableCell>
                    <TableCell>{emote.platform}</TableCell>
                    <TableCell className="text-right">{emote.count.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Stream Highlights */}
      <Card>
        <CardHeader>
          <CardTitle>Stream Highlights</CardTitle>
          <CardDescription>Moments with highest engagement by timestamp</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stream Title</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Engagement Spike</TableHead>
                <TableHead>Likely Cause</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {streamHighlights.map((highlight, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{highlight.streamTitle}</TableCell>
                  <TableCell>{highlight.platform}</TableCell>
                  <TableCell>{highlight.timestamp}</TableCell>
                  <TableCell>{highlight.engagementSpike}%</TableCell>
                  <TableCell>{highlight.likelyCause}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsEngagement;
