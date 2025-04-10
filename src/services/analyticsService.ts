
import { format, subDays } from 'date-fns';

// Sample data only - in a real app, this would fetch from an API
export const getAnalyticsData = (
  dateRange: { from: Date | undefined; to: Date | undefined }, 
  platform: string
) => {
  // Sample KPI metrics
  const overviewMetrics = {
    totalViewers: "1,245,789",
    viewersChange: 12.4,
    streamHours: "342",
    hoursChange: 5.2,
    newFollowers: "34,567",
    followersChange: 22.5,
    revenue: "8,452",
    revenueChange: 15.8
  };

  // Generate sample viewership data
  const viewershipData = generateTimeSeriesData(dateRange, [
    'twitch',
    'youtube',
    'facebook',
    'tiktok'
  ]);

  // Platform breakdown
  const platformBreakdown = [
    { name: 'Twitch', value: 55 },
    { name: 'YouTube', value: 25 },
    { name: 'Facebook', value: 15 },
    { name: 'TikTok', value: 5 }
  ];

  return {
    overviewMetrics,
    viewershipData,
    platformBreakdown
  };
};

export const getGrowthData = (
  dateRange: { from: Date | undefined; to: Date | undefined }, 
  platform: string
) => {
  // Generate sample data for each chart
  const followerGrowth = generateTimeSeriesData(dateRange, [
    'twitch',
    'youtube',
    'facebook',
    'tiktok'
  ], true);

  const subscriberGrowth = generateTimeSeriesData(dateRange, [
    'twitch',
    'youtube'
  ]);

  const viewsGrowth = generateTimeSeriesData(dateRange, ['total']);

  const retentionRate = generateTimeSeriesData(dateRange, [
    'twitch',
    'youtube',
    'facebook'
  ], false, 40, 90);

  return {
    followerGrowth,
    subscriberGrowth,
    viewsGrowth,
    retentionRate
  };
};

export const getEngagementData = (
  dateRange: { from: Date | undefined; to: Date | undefined }, 
  platform: string
) => {
  // Generate sample chat activity data
  const chatActivity = generateTimeSeriesData(dateRange, [
    'twitch',
    'youtube',
    'facebook'
  ], true);

  // Sample sentiment data
  const commentSentiment = [
    { name: 'Positive', value: 65 },
    { name: 'Neutral', value: 25 },
    { name: 'Negative', value: 10 }
  ];

  // Sample top emotes
  const topEmotes = [
    { name: 'PogChamp', icon: '😮', platform: 'Twitch', count: 12453 },
    { name: 'LUL', icon: '😂', platform: 'Twitch', count: 8932 },
    { name: 'Heart', icon: '❤️', platform: 'YouTube', count: 7841 },
    { name: 'Fire', icon: '🔥', platform: 'Facebook', count: 6532 },
    { name: 'GG', icon: '👍', platform: 'Twitch', count: 4321 }
  ];

  // Sample stream interactions
  const streamInteractions = generateTimeSeriesData(dateRange, [
    'likes',
    'comments',
    'shares'
  ]);

  // Sample stream highlights
  const streamHighlights = [
    {
      streamTitle: 'Valorant Championship Finals',
      platform: 'Twitch',
      timestamp: '01:24:32',
      engagementSpike: 245,
      likelyCause: 'Clutch play'
    },
    {
      streamTitle: 'Cyberpunk 2077 New DLC Review',
      platform: 'YouTube',
      timestamp: '00:32:18',
      engagementSpike: 189,
      likelyCause: 'Rare item discovery'
    },
    {
      streamTitle: 'Q&A with Fans',
      platform: 'Facebook',
      timestamp: '00:45:22',
      engagementSpike: 153,
      likelyCause: 'Personal story'
    },
    {
      streamTitle: 'Battle Royale Tournament',
      platform: 'Twitch',
      timestamp: '02:12:45',
      engagementSpike: 132,
      likelyCause: 'Tournament win'
    }
  ];

  return {
    chatActivity,
    commentSentiment,
    topEmotes,
    streamInteractions,
    streamHighlights
  };
};

export const getAudienceData = (
  dateRange: { from: Date | undefined; to: Date | undefined }, 
  platform: string
) => {
  // Sample audience data
  const ageGroups = [
    { name: '18-24', value: 35 },
    { name: '25-34', value: 40 },
    { name: '35-44', value: 15 },
    { name: '45-54', value: 7 },
    { name: '55+', value: 3 }
  ];

  const genderDistribution = [
    { name: 'Male', value: 65 },
    { name: 'Female', value: 32 },
    { name: 'Other', value: 3 }
  ];

  const locationData = [
    { country: 'United States', viewers: 450000 },
    { country: 'United Kingdom', viewers: 220000 },
    { country: 'Canada', viewers: 180000 },
    { country: 'Germany', viewers: 150000 },
    { country: 'Australia', viewers: 120000 },
    { country: 'France', viewers: 95000 },
    { country: 'Brazil', viewers: 80000 }
  ];

  const deviceData = [
    { name: 'Desktop', value: 45 },
    { name: 'Mobile', value: 35 },
    { name: 'Tablet', value: 12 },
    { name: 'Smart TV', value: 8 }
  ];

  // Generate viewing habits by hour
  const viewingHabits = Array.from({ length: 24 }, (_, i) => ({
    hour: i < 10 ? `0${i}:00` : `${i}:00`,
    weekday: Math.floor(Math.random() * 500) + 100,
    weekend: Math.floor(Math.random() * 800) + 200
  }));

  const topLanguages = [
    { name: 'English', percentage: 65, viewers: 812500, growth: 8 },
    { name: 'Spanish', percentage: 12, viewers: 150000, growth: 15 },
    { name: 'German', percentage: 8, viewers: 100000, growth: 5 },
    { name: 'French', percentage: 6, viewers: 75000, growth: 3 },
    { name: 'Portuguese', percentage: 5, viewers: 62500, growth: 12 },
    { name: 'Japanese', percentage: 2, viewers: 25000, growth: -2 },
    { name: 'Korean', percentage: 2, viewers: 25000, growth: 20 }
  ];

  return {
    ageGroups,
    genderDistribution,
    locationData,
    deviceData,
    viewingHabits,
    topLanguages
  };
};

export const getRevenueData = (
  dateRange: { from: Date | undefined; to: Date | undefined }, 
  platform: string
) => {
  // Generate sample revenue over time
  const revenueOverTime = generateTimeSeriesData(dateRange, ['amount'], false, 100, 1000);

  // Sample revenue by source
  const revenueBySource = [
    { name: 'Subscriptions', value: 4500 },
    { name: 'Donations', value: 2200 },
    { name: 'Ads', value: 1500 },
    { name: 'Sponsorships', value: 1200 },
    { name: 'Merch Sales', value: 800 },
    { name: 'Affiliate Links', value: 450 }
  ];

  // Sample top donations
  const topDonations = [
    { username: 'GameMaster42', platform: 'Twitch', date: '2023-08-15', amount: 250.00 },
    { username: 'StreamQueen', platform: 'YouTube', date: '2023-08-12', amount: 150.00 },
    { username: 'EpicGamer123', platform: 'Twitch', date: '2023-08-10', amount: 100.00 },
    { username: 'ContentCreator', platform: 'Facebook', date: '2023-08-08', amount: 75.00 },
    { username: 'GamingWizard', platform: 'Twitch', date: '2023-08-05', amount: 50.00 }
  ];

  // Sample monthly comparison data
  const monthlyComparison = [
    { source: 'Subscriptions', current: 4500, previous: 4200 },
    { source: 'Donations', current: 2200, previous: 1800 },
    { source: 'Ads', current: 1500, previous: 1350 },
    { source: 'Sponsorships', current: 1200, previous: 1000 }
  ];

  // Sample revenue summary
  const revenueSummary = {
    total: 10200,
    totalChange: 12,
    subscriptions: 4500,
    subscriptionsChange: 7,
    donations: 2200,
    donationsChange: 22,
    ads: 1500,
    adsChange: -3
  };

  return {
    revenueOverTime,
    revenueBySource,
    topDonations,
    monthlyComparison,
    revenueSummary
  };
};

// Helper function to generate time series data
const generateTimeSeriesData = (
  dateRange: { from: Date | undefined; to: Date | undefined },
  keys: string[],
  useIntegers = false,
  min = 10,
  max = 100
) => {
  if (!dateRange.from || !dateRange.to) return [];

  const days = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24));
  const step = Math.max(1, Math.floor(days / 15)); // Limit to about 15 data points
  
  const result = [];
  
  for (let i = 0; i <= days; i += step) {
    const currentDate = subDays(dateRange.to, days - i);
    const dataPoint: any = { date: format(currentDate, 'MMM dd') };
    
    keys.forEach(key => {
      const value = min + Math.random() * (max - min);
      dataPoint[key] = useIntegers ? Math.floor(value) : parseFloat(value.toFixed(2));
    });
    
    result.push(dataPoint);
  }
  
  return result;
};
