
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Eye, EyeOff } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PrivacySettings: React.FC = () => {
  const [privacySettings, setPrivacySettings] = useState({
    blockScreenshotting: false,
    anonymizeViewerData: true,
    hideViewerCount: false,
    autoModeration: true, 
    moderationLevel: 50,
    privateMode: false,
    blockListEnabled: true,
    chatFilters: true
  });
  
  const [blockedUsers, setBlockedUsers] = useState<string[]>([
    'toxicUser123', 
    'spammer456'
  ]);
  
  const [newBlockedUser, setNewBlockedUser] = useState('');
  
  const handleToggle = (setting: string) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
    
    toast({
      title: 'Privacy Setting Updated',
      description: `${setting.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} has been ${!privacySettings[setting as keyof typeof privacySettings] ? 'enabled' : 'disabled'}.`,
    });
  };
  
  const handleModerationLevelChange = (values: number[]) => {
    setPrivacySettings(prev => ({
      ...prev,
      moderationLevel: values[0]
    }));
  };
  
  const handleAddBlockedUser = () => {
    if (newBlockedUser && !blockedUsers.includes(newBlockedUser)) {
      setBlockedUsers(prev => [...prev, newBlockedUser]);
      setNewBlockedUser('');
      
      toast({
        title: 'User Blocked',
        description: `${newBlockedUser} has been added to your block list.`,
      });
    } else if (newBlockedUser && blockedUsers.includes(newBlockedUser)) {
      toast({
        title: 'Already Blocked',
        description: `${newBlockedUser} is already in your block list.`,
        variant: 'destructive'
      });
    }
  };
  
  const handleRemoveBlockedUser = (user: string) => {
    setBlockedUsers(prev => prev.filter(u => u !== user));
    
    toast({
      title: 'User Unblocked',
      description: `${user} has been removed from your block list.`,
    });
  };
  
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="general">General Privacy</TabsTrigger>
        <TabsTrigger value="moderation">Moderation</TabsTrigger>
        <TabsTrigger value="blocklist">Block List</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-white">General Privacy Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-meta-teal" />
                    <h3 className="text-base font-medium">Block Screenshots</h3>
                  </div>
                  <p className="text-xs text-gray-400">Prevent viewers from taking screenshots of your content</p>
                </div>
                <Switch 
                  checked={privacySettings.blockScreenshotting}
                  onCheckedChange={() => handleToggle('blockScreenshotting')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-meta-teal" />
                    <h3 className="text-base font-medium">Anonymize Viewer Data</h3>
                  </div>
                  <p className="text-xs text-gray-400">Collect only essential analytics data from viewers</p>
                </div>
                <Switch 
                  checked={privacySettings.anonymizeViewerData}
                  onCheckedChange={() => handleToggle('anonymizeViewerData')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <EyeOff className="h-4 w-4 text-meta-teal" />
                    <h3 className="text-base font-medium">Hide Viewer Count</h3>
                  </div>
                  <p className="text-xs text-gray-400">Prevent viewers from seeing how many people are watching</p>
                </div>
                <Switch 
                  checked={privacySettings.hideViewerCount}
                  onCheckedChange={() => handleToggle('hideViewerCount')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4 text-meta-teal" />
                    <h3 className="text-base font-medium">Private Mode</h3>
                  </div>
                  <p className="text-xs text-gray-400">Only approved users can view your content</p>
                </div>
                <Switch 
                  checked={privacySettings.privateMode}
                  onCheckedChange={() => handleToggle('privateMode')}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="moderation">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-white">Content Moderation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-base font-medium">Auto Moderation</h3>
                  <p className="text-xs text-gray-400">Automatically filter inappropriate content in chat</p>
                </div>
                <Switch 
                  checked={privacySettings.autoModeration}
                  onCheckedChange={() => handleToggle('autoModeration')}
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-base font-medium">Moderation Level</h3>
                <p className="text-xs text-gray-400">Adjust how strict content filtering will be</p>
                
                <div className="pt-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>Lenient</span>
                    <span>Strict</span>
                  </div>
                  <Slider
                    value={[privacySettings.moderationLevel]}
                    max={100}
                    step={1}
                    onValueChange={handleModerationLevelChange}
                    disabled={!privacySettings.autoModeration}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-base font-medium">Chat Filters</h3>
                  <p className="text-xs text-gray-400">Filter profanity and inappropriate language</p>
                </div>
                <Switch 
                  checked={privacySettings.chatFilters}
                  onCheckedChange={() => handleToggle('chatFilters')}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="blocklist">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-white">User Block List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-base font-medium">Enable Block List</h3>
                  <p className="text-xs text-gray-400">Prevent blocked users from interacting with your content</p>
                </div>
                <Switch 
                  checked={privacySettings.blockListEnabled}
                  onCheckedChange={() => handleToggle('blockListEnabled')}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-400 mb-1">Add User to Block List</label>
                    <Input
                      value={newBlockedUser}
                      onChange={(e) => setNewBlockedUser(e.target.value)}
                      placeholder="Enter username"
                      className="bg-meta-dark-blue border border-meta-teal/30"
                    />
                  </div>
                  <Button 
                    onClick={handleAddBlockedUser}
                    className="bg-button-gradient text-meta-dark-blue hover:brightness-110"
                    disabled={!newBlockedUser}
                  >
                    Block User
                  </Button>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Blocked Users</h3>
                  {blockedUsers.length > 0 ? (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {blockedUsers.map(user => (
                        <div key={user} className="flex items-center justify-between bg-meta-dark-blue/50 rounded-md p-2">
                          <span className="text-sm">{user}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleRemoveBlockedUser(user)}
                            className="text-xs h-6 hover:bg-red-900/20 hover:text-red-400"
                          >
                            Unblock
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">No users are currently blocked</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default PrivacySettings;
