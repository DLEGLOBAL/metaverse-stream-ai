
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { Camera, Mail, UserRound } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8">
        <div className="grid gap-8">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-24 w-24 border-4 border-meta-teal/20">
                <AvatarImage src="" />
                <AvatarFallback className="bg-meta-dark-blue text-meta-teal text-2xl">
                  {user?.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">Profile</CardTitle>
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail className="h-4 w-4" />
                  <span>{user?.email}</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="border-meta-teal/30 hover:bg-meta-teal/10"
              >
                <Camera className="h-4 w-4 mr-2" />
                Change Avatar
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Profile Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Display Name</label>
                      <input
                        type="text"
                        className="w-full rounded-md bg-meta-dark-blue border border-meta-teal/30 px-4 py-2"
                        placeholder="Enter your display name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Username</label>
                      <input
                        type="text"
                        className="w-full rounded-md bg-meta-dark-blue border border-meta-teal/30 px-4 py-2"
                        placeholder="Choose a username"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button className="bg-meta-teal hover:bg-meta-teal/90">
                    Save Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
