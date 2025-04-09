
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import StreamChat from '@/components/streaming/StreamChat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Settings, MessageSquare, Users, Shield } from 'lucide-react';

const Chat = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chatSettings, setChatSettings] = useState({
    slowMode: false,
    subscriberOnly: false,
    followersOnly: true,
    modOnly: false,
    wordFilters: true,
    linkBlocking: true,
    autoMod: true,
  });
  
  const handleSettingChange = (setting: string, value: boolean) => {
    setChatSettings(prev => ({ ...prev, [setting]: value }));
    
    toast({
      title: "Chat Setting Updated",
      description: `${setting.charAt(0).toUpperCase() + setting.slice(1).replace(/([A-Z])/g, ' $1').toLowerCase()} is now ${value ? 'enabled' : 'disabled'}.`,
    });
  };
  
  const handleAddModerator = () => {
    toast({
      title: "Feature In Development",
      description: "Adding moderators will be available in the next update.",
    });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Stream Chat</h1>
            <p className="text-gray-400 mt-1">Manage your chat across multiple platforms</p>
          </div>
          <Button className="bg-button-gradient text-meta-dark-blue hover:brightness-110">
            <Settings className="h-4 w-4 mr-2" /> Chat Settings
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StreamChat />
          </div>
          
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Chat Control</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300 cursor-pointer" htmlFor="slow-mode">
                      Slow Mode
                    </Label>
                    <Switch 
                      id="slow-mode" 
                      checked={chatSettings.slowMode}
                      onCheckedChange={(checked) => handleSettingChange('slowMode', checked)}
                    />
                  </div>
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300 cursor-pointer" htmlFor="subscriber-only">
                      Subscriber Only
                    </Label>
                    <Switch 
                      id="subscriber-only" 
                      checked={chatSettings.subscriberOnly}
                      onCheckedChange={(checked) => handleSettingChange('subscriberOnly', checked)}
                    />
                  </div>
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300 cursor-pointer" htmlFor="followers-only">
                      Followers Only
                    </Label>
                    <Switch 
                      id="followers-only" 
                      checked={chatSettings.followersOnly}
                      onCheckedChange={(checked) => handleSettingChange('followersOnly', checked)}
                    />
                  </div>
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300 cursor-pointer" htmlFor="mod-only">
                      Moderator Only
                    </Label>
                    <Switch 
                      id="mod-only" 
                      checked={chatSettings.modOnly}
                      onCheckedChange={(checked) => handleSettingChange('modOnly', checked)}
                    />
                  </div>
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300 cursor-pointer" htmlFor="word-filters">
                      Word Filters
                    </Label>
                    <Switch 
                      id="word-filters" 
                      checked={chatSettings.wordFilters}
                      onCheckedChange={(checked) => handleSettingChange('wordFilters', checked)}
                    />
                  </div>
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300 cursor-pointer" htmlFor="link-blocking">
                      Link Blocking
                    </Label>
                    <Switch 
                      id="link-blocking" 
                      checked={chatSettings.linkBlocking}
                      onCheckedChange={(checked) => handleSettingChange('linkBlocking', checked)}
                    />
                  </div>
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300 cursor-pointer" htmlFor="auto-mod">
                      Auto Moderation
                    </Label>
                    <Switch 
                      id="auto-mod" 
                      checked={chatSettings.autoMod}
                      onCheckedChange={(checked) => handleSettingChange('autoMod', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Moderators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex space-x-2">
                    <Input className="bg-meta-dark-blue/60 border-gray-700" placeholder="Add moderator username" />
                    <Button onClick={handleAddModerator}>
                      Add
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="p-3 border border-gray-800 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 text-yellow-400 mr-2" />
                      <span className="text-gray-300">StreamMod</span>
                    </div>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      Remove
                    </Button>
                  </div>
                  <div className="p-3 border border-gray-800 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 text-yellow-400 mr-2" />
                      <span className="text-gray-300">TrustedUser</span>
                    </div>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Chat Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border border-gray-800 rounded-lg text-center">
                    <MessageSquare className="h-5 w-5 text-meta-teal mx-auto mb-1" />
                    <div className="text-xl font-bold text-white">128</div>
                    <div className="text-xs text-gray-400">Messages Today</div>
                  </div>
                  <div className="p-3 border border-gray-800 rounded-lg text-center">
                    <Users className="h-5 w-5 text-meta-teal mx-auto mb-1" />
                    <div className="text-xl font-bold text-white">42</div>
                    <div className="text-xs text-gray-400">Unique Users</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chat;
