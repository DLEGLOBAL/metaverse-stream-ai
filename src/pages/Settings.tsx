import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon, User, Shield, Monitor, Headphones, Camera, Database, Key, Save, Cpu, Globe } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-meta-slate">
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Header sidebarCollapsed={sidebarCollapsed} />
      
      <main className={`pt-20 px-4 pb-4 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <Button 
            className="bg-button-gradient text-meta-dark-blue hover:brightness-110"
            onClick={handleSaveSettings}
          >
            <Save className="h-4 w-4 mr-2" /> Save Changes
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings tabs */}
          <div>
            <Card className="glass-card h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">Settings Menu</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  {[
                    { id: 'general', name: 'General', icon: SettingsIcon },
                    { id: 'account', name: 'Account', icon: User },
                    { id: 'privacy', name: 'Privacy', icon: Shield },
                    { id: 'video', name: 'Video', icon: Camera },
                    { id: 'audio', name: 'Audio', icon: Headphones },
                    { id: 'display', name: 'Display', icon: Monitor },
                    { id: 'storage', name: 'Storage', icon: Database },
                    { id: 'api', name: 'API Keys', icon: Key },
                    { id: 'advanced', name: 'Advanced', icon: Cpu },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      className={`flex items-center p-4 text-left hover:bg-meta-teal/10 transition-colors ${
                        activeTab === tab.id ? 'bg-meta-teal/20 border-l-4 border-meta-teal' : ''
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <tab.icon className={`h-5 w-5 mr-3 ${activeTab === tab.id ? 'text-meta-teal' : 'text-gray-400'}`} />
                      <span className={`${activeTab === tab.id ? 'text-white font-medium' : 'text-gray-300'}`}>
                        {tab.name}
                      </span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>
          
          {/* Settings content */}
          <div className="lg:col-span-3">
            {activeTab === 'general' && (
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white">General Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-white font-medium mb-4">Application Settings</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white">Start MetaStream on system startup</p>
                            <p className="text-xs text-gray-400">Automatically start when you login</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white">Auto-restore previous session</p>
                            <p className="text-xs text-gray-400">Remember your last open scenes and sources</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white">Show system tray icon</p>
                            <p className="text-xs text-gray-400">Display MetaStream in your system tray</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-white font-medium mb-4">Performance</h3>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Process Priority
                            </label>
                            <select className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white">
                              <option>Normal</option>
                              <option selected>High</option>
                              <option>Realtime</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Color Format
                            </label>
                            <select className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white">
                              <option>NV12</option>
                              <option selected>I444</option>
                              <option>RGB</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white">Enable hardware acceleration</p>
                            <p className="text-xs text-gray-400">Use GPU for encoding and processing</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white">Use multiple CPU cores</p>
                            <p className="text-xs text-gray-400">Distribute processing across available cores</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-white font-medium mb-4">Language & Region</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Language
                          </label>
                          <select className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white">
                            <option selected>English (US)</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                            <option>Japanese</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Time Format
                          </label>
                          <select className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white">
                            <option selected>12-hour (AM/PM)</option>
                            <option>24-hour</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {activeTab === 'account' && (
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white">Account Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-meta-teal/20 rounded-full flex items-center justify-center text-3xl mr-4">
                      👤
                    </div>
                    <div>
                      <h3 className="text-white font-medium">MetaStreamer</h3>
                      <p className="text-sm text-gray-400">metastreamer@example.com</p>
                      <div className="mt-1">
                        <Button variant="outline" size="sm" className="border-meta-teal/30 hover:bg-meta-teal/10 text-white">
                          Change Profile Picture
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Display Name
                        </label>
                        <input 
                          type="text" 
                          value="MetaStreamer"
                          className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Email
                        </label>
                        <input 
                          type="email" 
                          value="metastreamer@example.com"
                          className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Bio
                      </label>
                      <textarea 
                        className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white min-h-[100px]"
                        placeholder="Tell your viewers a bit about yourself..."
                      ></textarea>
                    </div>
                    
                    <div>
                      <h3 className="text-white font-medium mb-3">Password</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Current Password
                          </label>
                          <input 
                            type="password" 
                            placeholder="••••••••••"
                            className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            New Password
                          </label>
                          <input 
                            type="password" 
                            placeholder="••••••••••"
                            className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white"
                          />
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="mt-2 border-meta-teal/30 hover:bg-meta-teal/10 text-white"
                      >
                        Change Password
                      </Button>
                    </div>
                    
                    <div>
                      <h3 className="text-white font-medium mb-3">Connected Accounts</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 border border-gray-700 rounded-md">
                          <div className="flex items-center">
                            <Globe className="h-5 w-5 text-meta-teal mr-3" />
                            <span className="text-white">YouTube</span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-meta-teal/30 hover:bg-meta-teal/10 text-white"
                          >
                            Connect
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border border-gray-700 rounded-md">
                          <div className="flex items-center">
                            <Globe className="h-5 w-5 text-meta-teal mr-3" />
                            <span className="text-white">Twitch</span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-meta-teal/30 hover:bg-meta-teal/10 text-white"
                          >
                            Connect
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Other tabs would go here with similar structure */}
            {activeTab !== 'general' && activeTab !== 'account' && (
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-10">
                    <div className="bg-meta-teal/20 p-4 rounded-full mb-4">
                      {activeTab === 'privacy' && <Shield className="h-8 w-8 text-meta-teal" />}
                      {activeTab === 'video' && <Camera className="h-8 w-8 text-meta-teal" />}
                      {activeTab === 'audio' && <Headphones className="h-8 w-8 text-meta-teal" />}
                      {activeTab === 'display' && <Monitor className="h-8 w-8 text-meta-teal" />}
                      {activeTab === 'storage' && <Database className="h-8 w-8 text-meta-teal" />}
                      {activeTab === 'api' && <Key className="h-8 w-8 text-meta-teal" />}
                      {activeTab === 'advanced' && <Cpu className="h-8 w-8 text-meta-teal" />}
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">
                      {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings
                    </h3>
                    <p className="text-gray-400 text-center max-w-md mb-4">
                      These settings will be implemented in the next update. Check back soon for advanced customization options.
                    </p>
                    <Button 
                      className="bg-button-gradient text-meta-dark-blue hover:brightness-110"
                      onClick={() => {
                        toast({
                          title: "Coming Soon",
                          description: "This settings panel will be available in the next update.",
                        });
                      }}
                    >
                      Notify Me When Available
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
