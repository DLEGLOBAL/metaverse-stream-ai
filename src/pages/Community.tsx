
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageSquare, Bell, User, Heart, Clock, Send, Plus, Video } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Community = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
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
  
  // Dummy data
  const followers = [
    { id: 1, name: 'Alex Johnson', image: '👤', active: true, following: true },
    { id: 2, name: 'Maria Garcia', image: '👤', active: false, following: true },
    { id: 3, name: 'Sam Taylor', image: '👤', active: true, following: false },
    { id: 4, name: 'Jamie Smith', image: '👤', active: false, following: true },
  ];
  
  const messages = [
    { id: 1, user: 'Alex Johnson', time: '5 min ago', message: 'Great stream today!' },
    { id: 2, user: 'Maria Garcia', time: '10 min ago', message: 'When is the next VR session?' },
    { id: 3, user: 'System', time: '30 min ago', message: 'Your stream went live.' },
  ];
  
  const announcements = [
    { id: 1, title: 'New AR Features Coming!', time: '2 hours ago', likes: 24 },
    { id: 2, title: 'Schedule Update: VR Sessions', time: '2 days ago', likes: 42 },
  ];

  return (
    <div className="min-h-screen bg-meta-slate">
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Header sidebarCollapsed={sidebarCollapsed} />
      
      <main className={`pt-20 px-4 pb-4 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Community</h1>
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
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-white">Community Members</CardTitle>
                <div className="bg-meta-teal/20 text-meta-teal text-xs px-2 py-1 rounded-full">
                  {followers.length} Members
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {followers.map((follower) => (
                    <div key={follower.id} className="flex items-center justify-between p-3 border border-gray-700 rounded-md">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-meta-teal/20 rounded-full flex items-center justify-center text-lg mr-3">
                          {follower.image}
                        </div>
                        <div>
                          <p className="font-medium text-white">{follower.name}</p>
                          <div className="flex items-center">
                            {follower.active && (
                              <div className="flex items-center mr-2">
                                <div className="h-2 w-2 rounded-full bg-meta-teal mr-1"></div>
                                <span className="text-xs text-meta-teal">Online</span>
                              </div>
                            )}
                            {follower.following && (
                              <div className="flex items-center">
                                <Heart className="h-3 w-3 text-pink-400 mr-1" />
                                <span className="text-xs text-gray-400">Following</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 hover:bg-meta-teal/10"
                        onClick={() => {
                          toast({
                            title: "Message Sent",
                            description: `Your message to ${follower.name} has been sent.`,
                          });
                        }}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full border-meta-teal/30 hover:bg-meta-teal/10 text-white">
                    <Users className="h-4 w-4 mr-2" /> View All Members
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-meta-dark-blue rounded-md border border-meta-teal/20">
                    <div className="flex items-center mb-1">
                      <Users className="h-4 w-4 text-meta-teal mr-2" />
                      <span className="text-sm text-gray-300">Followers</span>
                    </div>
                    <p className="text-2xl font-bold text-white">124</p>
                    <p className="text-xs text-green-400 mt-1">+12% this week</p>
                  </div>
                  
                  <div className="p-3 bg-meta-dark-blue rounded-md border border-meta-teal/20">
                    <div className="flex items-center mb-1">
                      <Video className="h-4 w-4 text-meta-teal mr-2" />
                      <span className="text-sm text-gray-300">Total Views</span>
                    </div>
                    <p className="text-2xl font-bold text-white">3.2K</p>
                    <p className="text-xs text-green-400 mt-1">+8% this week</p>
                  </div>
                  
                  <div className="p-3 bg-meta-dark-blue rounded-md border border-meta-teal/20">
                    <div className="flex items-center mb-1">
                      <MessageSquare className="h-4 w-4 text-meta-teal mr-2" />
                      <span className="text-sm text-gray-300">Comments</span>
                    </div>
                    <p className="text-2xl font-bold text-white">87</p>
                    <p className="text-xs text-green-400 mt-1">+5% this week</p>
                  </div>
                  
                  <div className="p-3 bg-meta-dark-blue rounded-md border border-meta-teal/20">
                    <div className="flex items-center mb-1">
                      <Clock className="h-4 w-4 text-meta-teal mr-2" />
                      <span className="text-sm text-gray-300">Watch Time</span>
                    </div>
                    <p className="text-2xl font-bold text-white">42hr</p>
                    <p className="text-xs text-green-400 mt-1">+15% this week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Chat */}
          <div>
            <Card className="glass-card h-full flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Live Chat</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <div className="flex-grow space-y-3 overflow-y-auto">
                  {messages.map((message) => (
                    <div key={message.id} className="p-3 rounded-md bg-meta-dark-blue border border-gray-700">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          {message.user !== 'System' ? (
                            <div className="w-6 h-6 bg-meta-teal/20 rounded-full flex items-center justify-center text-sm mr-2">
                              👤
                            </div>
                          ) : (
                            <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-sm mr-2">
                              <Bell className="h-3 w-3 text-meta-teal" />
                            </div>
                          )}
                          <p className="font-medium text-white">{message.user}</p>
                        </div>
                        <p className="text-xs text-gray-400">{message.time}</p>
                      </div>
                      <p className="text-sm text-gray-300 ml-8 mt-1">{message.message}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-700">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Type your message..." 
                      className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 pl-3 pr-10 text-white"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-1 top-1 h-8 w-8 hover:bg-meta-teal/10 text-gray-400"
                      onClick={handleSendMessage}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex justify-between mt-3">
                    <Button variant="outline" size="sm" className="border-meta-teal/30 hover:bg-meta-teal/10 text-white text-xs">
                      <Plus className="h-3 w-3 mr-1" /> Emoji
                    </Button>
                    <Button variant="outline" size="sm" className="border-meta-teal/30 hover:bg-meta-teal/10 text-white text-xs">
                      <User className="h-3 w-3 mr-1" /> Members
                    </Button>
                    <Button variant="outline" size="sm" className="border-meta-teal/30 hover:bg-meta-teal/10 text-white text-xs">
                      <Bell className="h-3 w-3 mr-1" /> Notifications
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Announcements */}
          <div>
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="p-4 border border-meta-teal/30 bg-meta-teal/5 rounded-md">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-white">{announcement.title}</h3>
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 text-pink-400 mr-1" />
                          <span className="text-xs text-gray-300">{announcement.likes}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{announcement.time}</p>
                      <div className="flex justify-between mt-3">
                        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-0 h-auto text-xs">
                          Read More
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-0 h-auto text-xs">
                          Share
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="p-4 rounded-md border border-dashed border-gray-700 text-center">
                    <p className="text-sm text-gray-400 mb-2">Create an announcement to notify your community</p>
                    <Button 
                      variant="outline" 
                      className="border-meta-teal/30 hover:bg-meta-teal/10 text-white"
                      onClick={handleShowAnnouncement}
                    >
                      <Plus className="h-4 w-4 mr-2" /> New Announcement
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Upcoming Streams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 border border-meta-teal/30 bg-meta-teal/5 rounded-md">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-white">VR Game Session</h3>
                    <div className="bg-meta-teal/20 text-meta-teal text-xs px-2 py-1 rounded-full">
                      Tomorrow
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">8:00 PM EST</p>
                  <div className="flex items-center mt-2">
                    <Bell className="h-4 w-4 text-meta-teal mr-2" />
                    <span className="text-xs text-gray-300">12 people interested</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-3 bg-button-gradient text-meta-dark-blue hover:brightness-110"
                  onClick={() => {
                    toast({
                      title: "Coming Soon",
                      description: "Schedule management will be available in the next update.",
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" /> Schedule New Stream
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Community;
