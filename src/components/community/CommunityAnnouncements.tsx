
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CommunityAnnouncementsProps {
  announcements: any[];
  handleShowAnnouncement: () => void;
}

const CommunityAnnouncements = ({ announcements, handleShowAnnouncement }: CommunityAnnouncementsProps) => {
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">Announcements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {announcements.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-gray-400">
              <Bell className="h-12 w-12 mb-2 opacity-20" />
              <p>No announcements found</p>
            </div>
          ) : (
            announcements.map((announcement) => (
              <div key={announcement.id} className="p-4 border border-meta-teal/30 bg-meta-teal/5 rounded-md">
                {/* Announcement content would go here */}
              </div>
            ))
          )}
          
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
  );
};

export default CommunityAnnouncements;
