
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send, Settings, User, Youtube, Twitch, Facebook } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/hooks/use-toast';

type ChatMessage = {
  id: number;
  platform: 'youtube' | 'twitch' | 'facebook';
  username: string;
  message: string;
  timestamp: Date;
  isModerator: boolean;
  isSubscriber: boolean;
};

// Mock data for the chat demonstration
const mockChatMessages: ChatMessage[] = [
  {
    id: 1,
    platform: 'youtube',
    username: 'ViewerOne',
    message: 'Hi everyone! Excited for today\'s stream!',
    timestamp: new Date(Date.now() - 300000),
    isModerator: false,
    isSubscriber: true
  },
  {
    id: 2,
    platform: 'twitch',
    username: 'StreamMod',
    message: 'Welcome to the stream! Remember to follow the rules.',
    timestamp: new Date(Date.now() - 280000),
    isModerator: true,
    isSubscriber: true
  },
  {
    id: 3,
    platform: 'facebook',
    username: 'FacebookFan',
    message: 'Just shared this with my friends!',
    timestamp: new Date(Date.now() - 240000),
    isModerator: false,
    isSubscriber: false
  },
  {
    id: 4,
    platform: 'youtube',
    username: 'SuperFan',
    message: 'When are you going to play the new game you mentioned?',
    timestamp: new Date(Date.now() - 180000),
    isModerator: false,
    isSubscriber: true
  },
  {
    id: 5,
    platform: 'twitch',
    username: 'TwitchViewer',
    message: 'First time catching your stream live!',
    timestamp: new Date(Date.now() - 120000),
    isModerator: false,
    isSubscriber: false
  }
];

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case 'youtube':
      return <Youtube className="h-4 w-4 text-red-500" />;
    case 'twitch':
      return <Twitch className="h-4 w-4 text-purple-500" />;
    case 'facebook':
      return <Facebook className="h-4 w-4 text-blue-500" />;
    default:
      return <MessageSquare className="h-4 w-4" />;
  }
};

const StreamChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [newMessage, setNewMessage] = useState('');
  const [activePlatform, setActivePlatform] = useState<'all' | 'youtube' | 'twitch' | 'facebook'>('all');
  
  // For demonstration, let's add a mock message every 15 seconds
  useEffect(() => {
    const platforms: Array<'youtube' | 'twitch' | 'facebook'> = ['youtube', 'twitch', 'facebook'];
    const interval = setInterval(() => {
      const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
      const newMsg: ChatMessage = {
        id: Date.now(),
        platform: randomPlatform,
        username: `Viewer${Math.floor(Math.random() * 1000)}`,
        message: `This is a mock message ${Math.floor(Math.random() * 100)}`,
        timestamp: new Date(),
        isModerator: Math.random() > 0.9,
        isSubscriber: Math.random() > 0.5
      };
      
      setMessages(prev => [...prev, newMsg]);
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // In a real app, this would send to the selected platform
    toast({
      title: 'Message Sent',
      description: `Your message has been sent to ${activePlatform === 'all' ? 'all platforms' : activePlatform}`,
    });
    
    // Clear the input
    setNewMessage('');
  };
  
  const filteredMessages = activePlatform === 'all' 
    ? messages 
    : messages.filter(msg => msg.platform === activePlatform);

  return (
    <Card className="glass-card h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-white">Live Chat</CardTitle>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="all" className="w-full">
          <div className="px-4 border-b border-gray-800">
            <TabsList className="bg-transparent h-9">
              <TabsTrigger 
                value="all" 
                className="text-xs h-8 data-[state=active]:bg-transparent data-[state=active]:text-meta-teal"
                onClick={() => setActivePlatform('all')}
              >
                All Platforms
              </TabsTrigger>
              <TabsTrigger 
                value="youtube" 
                className="text-xs h-8 data-[state=active]:bg-transparent data-[state=active]:text-red-500"
                onClick={() => setActivePlatform('youtube')}
              >
                <Youtube className="h-3 w-3 mr-1" />
                YouTube
              </TabsTrigger>
              <TabsTrigger 
                value="twitch" 
                className="text-xs h-8 data-[state=active]:bg-transparent data-[state=active]:text-purple-500"
                onClick={() => setActivePlatform('twitch')}
              >
                <Twitch className="h-3 w-3 mr-1" />
                Twitch
              </TabsTrigger>
              <TabsTrigger 
                value="facebook" 
                className="text-xs h-8 data-[state=active]:bg-transparent data-[state=active]:text-blue-500"
                onClick={() => setActivePlatform('facebook')}
              >
                <Facebook className="h-3 w-3 mr-1" />
                Facebook
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="m-0">
            <ScrollArea className="h-[400px] px-4 py-2">
              {filteredMessages.map((msg) => (
                <div key={msg.id} className="mb-3">
                  <div className="flex items-start">
                    <div className="mr-2 mt-1">{getPlatformIcon(msg.platform)}</div>
                    <div>
                      <div className="flex items-center space-x-1">
                        <span className={`font-medium text-sm ${
                          msg.isModerator ? 'text-yellow-400' : 
                          msg.isSubscriber ? 'text-green-400' : 'text-gray-300'
                        }`}>
                          {msg.username}
                        </span>
                        {msg.isModerator && (
                          <span className="bg-yellow-500/20 text-yellow-400 text-[10px] px-1 rounded">MOD</span>
                        )}
                        {msg.isSubscriber && !msg.isModerator && (
                          <span className="bg-green-500/20 text-green-400 text-[10px] px-1 rounded">SUB</span>
                        )}
                      </div>
                      <p className="text-white text-sm mt-0.5">{msg.message}</p>
                      <span className="text-gray-500 text-xs">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
            
            <div className="p-4 border-t border-gray-800">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Input 
                  className="bg-meta-dark-blue/60 border-gray-700"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button type="submit" className="bg-meta-teal/80 hover:bg-meta-teal text-black">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </TabsContent>
          
          <TabsContent value="youtube" className="m-0">
            <ScrollArea className="h-[400px] px-4 py-2">
              {filteredMessages.map((msg) => (
                <div key={msg.id} className="mb-3">
                  <div className="flex items-start">
                    <div className="mr-2 mt-1">{getPlatformIcon(msg.platform)}</div>
                    <div>
                      <div className="flex items-center space-x-1">
                        <span className={`font-medium text-sm ${
                          msg.isModerator ? 'text-yellow-400' : 
                          msg.isSubscriber ? 'text-green-400' : 'text-gray-300'
                        }`}>
                          {msg.username}
                        </span>
                        {msg.isModerator && (
                          <span className="bg-yellow-500/20 text-yellow-400 text-[10px] px-1 rounded">MOD</span>
                        )}
                        {msg.isSubscriber && !msg.isModerator && (
                          <span className="bg-green-500/20 text-green-400 text-[10px] px-1 rounded">SUB</span>
                        )}
                      </div>
                      <p className="text-white text-sm mt-0.5">{msg.message}</p>
                      <span className="text-gray-500 text-xs">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
            
            <div className="p-4 border-t border-gray-800">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Input 
                  className="bg-meta-dark-blue/60 border-gray-700"
                  placeholder="Type a message to YouTube..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button type="submit" className="bg-red-500/80 hover:bg-red-500 text-white">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </TabsContent>
          
          <TabsContent value="twitch" className="m-0">
            <ScrollArea className="h-[400px] px-4 py-2">
              {filteredMessages.map((msg) => (
                <div key={msg.id} className="mb-3">
                  <div className="flex items-start">
                    <div className="mr-2 mt-1">{getPlatformIcon(msg.platform)}</div>
                    <div>
                      <div className="flex items-center space-x-1">
                        <span className={`font-medium text-sm ${
                          msg.isModerator ? 'text-yellow-400' : 
                          msg.isSubscriber ? 'text-green-400' : 'text-gray-300'
                        }`}>
                          {msg.username}
                        </span>
                        {msg.isModerator && (
                          <span className="bg-yellow-500/20 text-yellow-400 text-[10px] px-1 rounded">MOD</span>
                        )}
                        {msg.isSubscriber && !msg.isModerator && (
                          <span className="bg-green-500/20 text-green-400 text-[10px] px-1 rounded">SUB</span>
                        )}
                      </div>
                      <p className="text-white text-sm mt-0.5">{msg.message}</p>
                      <span className="text-gray-500 text-xs">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
            
            <div className="p-4 border-t border-gray-800">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Input 
                  className="bg-meta-dark-blue/60 border-gray-700"
                  placeholder="Type a message to Twitch..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button type="submit" className="bg-purple-500/80 hover:bg-purple-500 text-white">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </TabsContent>
          
          <TabsContent value="facebook" className="m-0">
            <ScrollArea className="h-[400px] px-4 py-2">
              {filteredMessages.map((msg) => (
                <div key={msg.id} className="mb-3">
                  <div className="flex items-start">
                    <div className="mr-2 mt-1">{getPlatformIcon(msg.platform)}</div>
                    <div>
                      <div className="flex items-center space-x-1">
                        <span className={`font-medium text-sm ${
                          msg.isModerator ? 'text-yellow-400' : 
                          msg.isSubscriber ? 'text-green-400' : 'text-gray-300'
                        }`}>
                          {msg.username}
                        </span>
                        {msg.isModerator && (
                          <span className="bg-yellow-500/20 text-yellow-400 text-[10px] px-1 rounded">MOD</span>
                        )}
                        {msg.isSubscriber && !msg.isModerator && (
                          <span className="bg-green-500/20 text-green-400 text-[10px] px-1 rounded">SUB</span>
                        )}
                      </div>
                      <p className="text-white text-sm mt-0.5">{msg.message}</p>
                      <span className="text-gray-500 text-xs">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
            
            <div className="p-4 border-t border-gray-800">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Input 
                  className="bg-meta-dark-blue/60 border-gray-700"
                  placeholder="Type a message to Facebook..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button type="submit" className="bg-blue-500/80 hover:bg-blue-500 text-white">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StreamChat;
