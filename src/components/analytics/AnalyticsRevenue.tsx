
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getRevenueData } from '@/services/analyticsService';
import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';

interface AnalyticsRevenueProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  activePlatform: string;
}

const AnalyticsRevenue = ({ dateRange, activePlatform }: AnalyticsRevenueProps) => {
  // Get sample data
  const { 
    revenueOverTime, 
    revenueBySource, 
    topDonations,
    monthlyComparison,
    revenueSummary
  } = getRevenueData(dateRange, activePlatform);

  const REVENUE_COLORS = ['#10B981', '#6366F1', '#F59E0B', '#8B5CF6', '#EF4444', '#EC4899'];

  return (
    <div className="space-y-6">
      {/* Revenue Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Revenue"
          value={`$${revenueSummary.total.toLocaleString()}`}
          change={revenueSummary.totalChange}
          icon={<DollarSign className="h-4 w-4" />}
          positive={revenueSummary.totalChange > 0}
        />
        <MetricCard 
          title="Subscriptions"
          value={`$${revenueSummary.subscriptions.toLocaleString()}`}
          change={revenueSummary.subscriptionsChange}
          icon={<DollarSign className="h-4 w-4" />}
          positive={revenueSummary.subscriptionsChange > 0}
        />
        <MetricCard 
          title="Donations"
          value={`$${revenueSummary.donations.toLocaleString()}`}
          change={revenueSummary.donationsChange}
          icon={<DollarSign className="h-4 w-4" />}
          positive={revenueSummary.donationsChange > 0}
        />
        <MetricCard 
          title="Ad Revenue"
          value={`$${revenueSummary.ads.toLocaleString()}`}
          change={revenueSummary.adsChange}
          icon={<DollarSign className="h-4 w-4" />}
          positive={revenueSummary.adsChange > 0}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
            <CardDescription>Total earnings by date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer
                config={{
                  revenue: {
                    label: 'Revenue',
                    theme: {
                      light: '#10B981',
                      dark: '#10B981'
                    }
                  }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={revenueOverTime}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      name="Revenue" 
                      stroke="#10B981" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue By Source */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue By Source</CardTitle>
            <CardDescription>Breakdown of revenue streams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer
                config={{
                  source: {
                    label: 'Source',
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
                      data={revenueBySource}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {revenueBySource.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={REVENUE_COLORS[index % REVENUE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Comparison</CardTitle>
            <CardDescription>Revenue changes month over month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer
                config={{
                  current: {
                    label: 'Current',
                    theme: {
                      light: '#10B981',
                      dark: '#10B981'
                    }
                  },
                  previous: {
                    label: 'Previous',
                    theme: {
                      light: '#6366F1',
                      dark: '#6366F1'
                    }
                  }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyComparison}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="source" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                    <Legend />
                    <Bar dataKey="current" name="Current Month" fill="#10B981" />
                    <Bar dataKey="previous" name="Previous Month" fill="#6366F1" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Donations/Supporters */}
        <Card>
          <CardHeader>
            <CardTitle>Top Supporters</CardTitle>
            <CardDescription>Highest donations in the period</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topDonations.map((donation, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{donation.username}</TableCell>
                    <TableCell>{donation.platform}</TableCell>
                    <TableCell>{donation.date}</TableCell>
                    <TableCell className="text-right font-mono text-green-500">
                      ${donation.amount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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

export default AnalyticsRevenue;
