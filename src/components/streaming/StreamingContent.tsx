
import React, { useState } from 'react';
import StreamingHeader from './StreamingHeader';
import StreamingTabs from './StreamingTabs';
import StreamKeyManager from './StreamKeyManager';
import { useAppContext } from '@/contexts/AppContext';
import ServerRelayInfo from './ServerRelayInfo';

const StreamingContent = () => {
  const [activeTab, setActiveTab] = useState('stream-setup');
  const { 
    streamStatus, 
    startStream, 
    stopStream,
    testStream,
    platforms,
    platformStates,
    onPlatformToggle,
    onConnectPlatform,
    getActivePlatformsCount,
    isRelayServerAvailable
  } = useAppContext();
  
  const activePlatformsCount = getActivePlatformsCount();
  
  return (
    <div className="container mx-auto p-4 space-y-4">
      <StreamingHeader 
        streamStatus={streamStatus}
        startStream={startStream}
        stopStream={stopStream}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <StreamKeyManager />
          
          <StreamingTabs 
            streamStatus={streamStatus}
            platforms={platforms}
            platformStates={platformStates}
            onPlatformToggle={onPlatformToggle}
            onConnectPlatform={onConnectPlatform}
            activePlatformsCount={activePlatformsCount}
            startStream={startStream}
            stopStream={stopStream}
            testStream={testStream}
          />
        </div>
        <div>
          <ServerRelayInfo />
        </div>
      </div>
    </div>
  );
};

export default StreamingContent;
