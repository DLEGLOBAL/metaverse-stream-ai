
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MessageSquare, ThumbsUp, UserRound, Search, SendHorizontal, Twitch, Youtube, Facebook, Instagram, Globe } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  message: string;
  time: string;
  platform: 'twitch' | 'youtube' | 'facebook' | 'instagram' | 'custom';
  isHighlighted?: boolean;
  isAnswered?: boolean;
  likes?: number;
}

const CommentsDashboard = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  
  const [replyText, setReplyText] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const highlightComment = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, isHighlighted: !comment.isHighlighted }
        : comment
    ));
  };
  
  const markAsAnswered = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, isAnswered: true }
        : comment
    ));
  };
  
  const sendReply = (commentId: string) => {
    if (replyText.trim() === '') return;
    
    // In a real app, this would send the reply to the appropriate platform API
    console.log(`Replying to comment ${commentId}: ${replyText}`);
    
    // Mark as answered after reply
    markAsAnswered(commentId);
    setReplyText('');
  };
  
  const filteredComments = comments.filter(comment => {
    // Filter by platform if not on "all" tab
    if (activeTab !== 'all' && comment.platform !== activeTab) return false;
    
    // Filter by search query
    if (searchQuery && !comment.message.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !comment.author.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });
  
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitch':
        return <Twitch className="h-4 w-4 text-purple-400" />;
      case 'youtube':
        return <Youtube className="h-4 w-4 text-red-500" />;
      case 'facebook':
        return <Facebook className="h-4 w-4 text-blue-500" />;
      case 'instagram':
        return <Instagram className="h-4 w-4 text-pink-500" />;
      default:
        return <Globe className="h-4 w-4 text-gray-400" />;
    }
  };
  
  return (
    <Card className="h-full glass-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-white">Live Comments</CardTitle>
          <Badge variant="secondary" className="bg-meta-purple text-white">
            {comments.length} Comments
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <div className="relative mb-3">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search comments..." 
            className="pl-8 bg-gray-800/50 border-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 mb-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="twitch">Twitch</TabsTrigger>
            <TabsTrigger value="youtube">YouTube</TabsTrigger>
            <TabsTrigger value="facebook">Facebook</TabsTrigger>
            <TabsTrigger value="instagram">Instagram</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {filteredComments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                  <MessageSquare className="h-12 w-12 mb-2 opacity-20" />
                  <p>No comments found</p>
                </div>
              ) : (
                filteredComments.map(comment => (
                  <div 
                    key={comment.id} 
                    className={`p-3 rounded-md border ${
                      comment.isHighlighted 
                        ? 'border-meta-teal bg-meta-teal/10' 
                        : comment.isAnswered
                          ? 'border-green-600/30 bg-green-900/10'
                          : 'border-gray-700 hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                          <UserRound className="h-5 w-5 text-gray-300" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-sm">{comment.author}</span>
                            {getPlatformIcon(comment.platform)}
                          </div>
                          <div className="text-xs text-gray-400">{comment.time}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {comment.likes !== undefined && (
                          <div className="flex items-center text-xs text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {comment.likes}
                          </div>
                        )}
                        
                        {comment.isAnswered && (
                          <Badge variant="outline" className="text-xs bg-green-900/20 text-green-400 border-green-700">
                            Answered
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <p className="mt-2 text-sm">{comment.message}</p>
                    
                    <div className="mt-3 flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-7 text-xs"
                        onClick={() => highlightComment(comment.id)}
                      >
                        {comment.isHighlighted ? 'Unhighlight' : 'Highlight'}
                      </Button>
                      
                      {!comment.isAnswered && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-7 text-xs"
                          onClick={() => markAsAnswered(comment.id)}
                        >
                          Mark Answered
                        </Button>
                      )}
                    </div>
                    
                    {!comment.isAnswered && (
                      <div className="mt-3 flex gap-2">
                        <Input 
                          placeholder="Reply to this comment..." 
                          className="h-7 text-xs bg-gray-800/70 border-gray-700"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && sendReply(comment.id)}
                        />
                        <Button 
                          size="sm" 
                          className="h-7 bg-meta-teal text-meta-dark-blue hover:bg-meta-teal/90"
                          onClick={() => sendReply(comment.id)}
                        >
                          <SendHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CommentsDashboard;
