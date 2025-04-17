
// This file provides mock analytics data for demonstration purposes

interface OverviewMetrics {
  totalViewers: number;
  viewersChange: number;
  streamHours: number;
  hoursChange: number;
  newFollowers: number;
  followersChange: number;
  revenue: number;
  revenueChange: number;
}

interface ViewershipData {
  date: string;
  twitch: number;
  youtube: number;
  facebook: number;
  tiktok: number;
}

interface PlatformBreakdown {
  platform: string;
  viewers: number;
  percentage: number;
}

interface AnalyticsData {
  overviewMetrics: OverviewMetrics;
  viewershipData: ViewershipData[];
  platformBreakdown: PlatformBreakdown[];
}

interface ChatActivity {
  date: string;
  twitch: number;
  youtube: number;
  facebook: number;
}

interface CommentSentiment {
  name: string;
  value: number;
}

interface Emote {
  name: string;
  platform: string;
  count: number;
  icon: string;
}

interface StreamInteraction {
  date: string;
  likes: number;
  comments: number;
  shares: number;
}

interface StreamHighlight {
  streamTitle: string;
  platform: string;
  timestamp: string;
  engagementSpike: number;
  likelyCause: string;
}

interface EngagementData {
  chatActivity: ChatActivity[];
  commentSentiment: CommentSentiment[];
  topEmotes: Emote[];
  streamInteractions: StreamInteraction[];
  streamHighlights: StreamHighlight[];
}

// Mock data generators
export const getAnalyticsData = (
  dateRange: { from: Date | undefined; to: Date | undefined },
  activePlatform: string
): AnalyticsData => {
  // For demo purposes, generate random data
  return {
    overviewMetrics: {
      totalViewers: 25489,
      viewersChange: 12.5,
      streamHours: 87,
      hoursChange: 5.2,
      newFollowers: 1254,
      followersChange: 8.7,
      revenue: 3245.78,
      revenueChange: 15.3
    },
    viewershipData: Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        twitch: Math.floor(Math.random() * 3000) + 1000,
        youtube: Math.floor(Math.random() * 2500) + 800,
        facebook: Math.floor(Math.random() * 1500) + 500,
        tiktok: Math.floor(Math.random() * 2000) + 600
      };
    }),
    platformBreakdown: [
      { platform: 'Twitch', viewers: 12453, percentage: 42 },
      { platform: 'YouTube', viewers: 9872, percentage: 31 },
      { platform: 'Facebook', viewers: 4567, percentage: 18 },
      { platform: 'TikTok', viewers: 2389, percentage: 9 }
    ]
  };
};

export const getEngagementData = (
  dateRange: { from: Date | undefined; to: Date | undefined },
  activePlatform: string
): EngagementData => {
  // Generate chat activity data
  const chatActivity = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      twitch: Math.floor(Math.random() * 2000) + 1000,
      youtube: Math.floor(Math.random() * 1500) + 800,
      facebook: Math.floor(Math.random() * 1000) + 500
    };
  });

  // Comment sentiment data
  const commentSentiment = [
    { name: 'Negative', value: 15 },
    { name: 'Neutral', value: 35 },
    { name: 'Positive', value: 50 }
  ];

  // Top emotes data
  const topEmotes = [
    { name: 'PogChamp', platform: 'Twitch', count: 5432, icon: '😮' },
    { name: 'LUL', platform: 'Twitch', count: 4289, icon: '😂' },
    { name: '❤️', platform: 'YouTube', count: 3876, icon: '❤️' },
    { name: '👍', platform: 'Facebook', count: 2945, icon: '👍' },
    { name: 'Kappa', platform: 'Twitch', count: 2387, icon: '😏' }
  ];

  // Stream interactions
  const streamInteractions = Array.from({ length: 10 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (9 - i));
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      likes: Math.floor(Math.random() * 1000) + 500,
      comments: Math.floor(Math.random() * 500) + 200,
      shares: Math.floor(Math.random() * 300) + 100
    };
  });

  // Stream highlights
  const streamHighlights = [
    {
      streamTitle: 'Valorant Championship Finals',
      platform: 'Twitch',
      timestamp: '01:23:45',
      engagementSpike: 245,
      likelyCause: 'Game-winning play'
    },
    {
      streamTitle: 'Minecraft Building Challenge',
      platform: 'YouTube',
      timestamp: '00:42:18',
      engagementSpike: 187,
      likelyCause: 'Explosive trap triggered'
    },
    {
      streamTitle: 'Q&A with Special Guest',
      platform: 'Facebook',
      timestamp: '00:58:32',
      engagementSpike: 162,
      likelyCause: 'Celebrity appearance'
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
