
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Send, Plus, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDesktop } from '@/contexts/DesktopContext';

interface LiveChatProps {
  messages: any[];
  handleSendMessage: () => void;
}

const LiveChat = ({ messages, handleSendMessage }: LiveChatProps) => {
  const [replyText, setReplyText] = useState('');
  const { isDesktop, platform } = useDesktop();
  
  return (
    <Card className="glass-card h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-white">Live Chat</CardTitle>
          {isDesktop && (
            <span className="text-xs text-meta-teal">Desktop Mode Active</span>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <div className="flex-grow space-y-3 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-gray-400">
              <MessageSquare className="h-12 w-12 mb-2 opacity-20" />
              <p>No messages found</p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className="p-3 rounded-md bg-meta-dark-blue border border-gray-700">
                {/* Message content would go here */}
              </div>
            ))
          )}
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-700">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 pl-3 pr-10 text-white"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1 h-8 w-8 hover:bg-meta-teal/10 text-gray-400"
              onClick={() => {
                handleSendMessage();
                setReplyText('');
              }}
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
  );
};

export default LiveChat;
