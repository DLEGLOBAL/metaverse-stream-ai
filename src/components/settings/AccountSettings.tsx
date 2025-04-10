
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const AccountSettings = () => {
  return (
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
  );
};

export default AccountSettings;
