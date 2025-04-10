
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import VideoEditor from '@/components/video/VideoEditor';

const VideoEditing = () => {
  return (
    <>
      <Helmet>
        <title>Video Editor | MetaStream</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-6 p-6">
          <div className="rounded-lg bg-gradient-to-r from-meta-dark-blue to-meta-purple p-6 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold">Video Editor Suite</h1>
                <p className="mt-2 text-lg opacity-90">
                  Edit, trim, and enhance your livestream recordings and create professional content.
                </p>
              </div>
            </div>
          </div>
          
          <VideoEditor />
        </div>
      </DashboardLayout>
    </>
  );
};

export default VideoEditing;
