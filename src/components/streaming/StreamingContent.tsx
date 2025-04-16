
import React, { useState } from 'react';
import StreamingHeader from './StreamingHeader';
import StreamingTabs from './StreamingTabs';
import { useAppContext } from '@/contexts/AppContext';
import OBSInstructions from './OBSInstructions';

const StreamingContent = () => {
  const [activeTab, setActiveTab] = useState('stream');
  const { streamStatus } = useAppContext();
  
  return (
    <div className="container mx-auto p-4 space-y-4">
      <StreamingHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <StreamingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div>
          <OBSInstructions />
        </div>
      </div>
    </div>
  );
};

export default StreamingContent;
