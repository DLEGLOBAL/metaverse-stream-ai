
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageSquare, Bell, User, Heart, Clock, Send, Plus, Video } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useDesktop } from '@/contexts/DesktopContext';
import CommunityMembers from '@/components/community/CommunityMembers';
import LiveChat from '@/components/community/LiveChat';
import CommunityAnnouncements from '@/components/community/CommunityAnnouncements';
import AnalyticsCard from '@/components/community/AnalyticsCard';
import UpcomingStreams from '@/components/community/UpcomingStreams';

const Community = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isDesktop, platform } = useDesktop();
  
  // Empty data structures
  const followers = [];
  const messages = [];
  const announcements = [];
  
  const handleShowAnnouncement = () => {
    toast({
      title: "Coming Soon",
      description: "Creating announcements will be available in the next update.",
    });
  };
  
  const handleSendMessage = () => {
    toast({
      title: "Coming Soon",
      description: "Chat functionality will be available in the next update.",
    });
  };
  
  return (
    <div className="min-h-screen bg-meta-slate">
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Header sidebarCollapsed={sidebarCollapsed} />
      
      <main className={`pt-20 px-4 pb-4 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Community</h1>
          {isDesktop && (
            <span className="text-sm text-meta-teal px-2 py-1 rounded-full bg-meta-teal/10">
              Desktop Mode: {platform}
            </span>
          )}
          <Button 
            className="bg-button-gradient text-meta-dark-blue hover:brightness-110"
            onClick={handleShowAnnouncement}
          >
            <Bell className="h-4 w-4 mr-2" /> New Announcement
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Followers/Subscribers */}
          <div>
            <CommunityMembers followers={followers} />
            <AnalyticsCard className="mt-4" />
          </div>
          
          {/* Chat */}
          <LiveChat 
            messages={messages} 
            handleSendMessage={handleSendMessage} 
          />
          
          {/* Announcements */}
          <div>
            <CommunityAnnouncements 
              announcements={announcements} 
              handleShowAnnouncement={handleShowAnnouncement} 
            />
            <UpcomingStreams className="mt-4" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Community;
