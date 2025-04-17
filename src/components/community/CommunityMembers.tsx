
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CommunityMembersProps {
  followers: any[];
}

const CommunityMembers = ({ followers }: CommunityMembersProps) => {
  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-white">Community Members</CardTitle>
        <div className="bg-meta-teal/20 text-meta-teal text-xs px-2 py-1 rounded-full">
          {followers.length} Members
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {followers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-gray-400">
              <Users className="h-12 w-12 mb-2 opacity-20" />
              <p>No community members found</p>
            </div>
          ) : (
            followers.map((follower) => (
              <div key={follower.id} className="flex items-center justify-between p-3 border border-gray-700 rounded-md">
                {/* Follower item content would go here */}
              </div>
            ))
          )}
          
          <Button variant="outline" className="w-full border-meta-teal/30 hover:bg-meta-teal/10 text-white">
            <Users className="h-4 w-4 mr-2" /> View All Members
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityMembers;
