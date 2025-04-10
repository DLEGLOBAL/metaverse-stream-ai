
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getAudienceData } from '@/services/analyticsService';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AnalyticsAudienceProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  activePlatform: string;
}

const AnalyticsAudience = ({ dateRange, activePlatform }: AnalyticsAudienceProps) => {
  // Get sample data
  const { ageGroups, genderDistribution, locationData, deviceData, viewingHabits, topLanguages } = getAudienceData(dateRange, activePlatform);

  const AGE_COLORS = ['#10B981', '#6366F1', '#F59E0B', '#8B5CF6', '#EF4444'];
  const GENDER_COLORS = ['#3B82F6', '#EC4899', '#6366F1'];
  const DEVICE_COLORS = ['#10B981', '#6366F1', '#F59E0B', '#8B5CF6'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Age Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Age Distribution</CardTitle>
            <CardDescription>Viewer demographics by age group</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartContainer
                config={{
                  age: {
                    label: 'Age Groups',
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
                      data={ageGroups}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {ageGroups.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={AGE_COLORS[index % AGE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gender Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Gender Distribution</CardTitle>
            <CardDescription>Viewer demographics by gender</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartContainer
                config={{
                  gender: {
                    label: 'Gender',
                    theme: {
                      light: '#3B82F6',
                      dark: '#3B82F6'
                    }
                  }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genderDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {genderDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Device Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Viewing Devices</CardTitle>
            <CardDescription>How viewers are watching your content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartContainer
                config={{
                  device: {
                    label: 'Device',
                    theme: {
                      light: '#6366F1',
                      dark: '#6366F1'
                    }
                  }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={DEVICE_COLORS[index % DEVICE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Geographic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Top Viewer Locations</CardTitle>
            <CardDescription>Geographic distribution of your audience</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-1 pt-0">
            <ScrollArea className="w-full pb-4">
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

        {/* Viewing Habits */}
        <Card>
          <CardHeader>
            <CardTitle>Viewing Habits</CardTitle>
            <CardDescription>When your audience watches your streams</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-1 pt-0">
            <ScrollArea className="w-full pb-4">
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
      </div>

      {/* Languages */}
      <Card>
        <CardHeader>
          <CardTitle>Top Languages</CardTitle>
          <CardDescription>Languages spoken by your audience</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="max-h-[400px] touch-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Language</TableHead>
                  <TableHead>Percentage</TableHead>
                  <TableHead>Total Viewers</TableHead>
                  <TableHead>Growth (30 days)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topLanguages.map((language, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{language.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2">
                          <div 
                            className="bg-meta-teal h-2.5 rounded-full" 
                            style={{ width: `${language.percentage}%` }}
                          ></div>
                        </div>
                        {language.percentage}%
                      </div>
                    </TableCell>
                    <TableCell>{language.viewers.toLocaleString()}</TableCell>
                    <TableCell className={language.growth > 0 ? 'text-green-500' : 'text-red-500'}>
                      {language.growth > 0 ? '+' : ''}{language.growth}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsAudience;
