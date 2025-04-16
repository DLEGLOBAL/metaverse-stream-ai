
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PlatformTabs from './keys/PlatformTabs';
import { useStreamKeys } from './keys/useStreamKeys';

const StreamKeyManager: React.FC = () => {
  const {
    streamKeys,
    activeTab,
    showKey,
    copiedUrl,
    copiedKey,
    setActiveTab,
    handleStreamKeyChange,
    handleSaveKeys,
    handleCopyUrl,
    handleCopyKey,
    toggleShowKey,
  } = useStreamKeys();
  
  return (
    <Card className="glass-card mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">Stream Keys</CardTitle>
      </CardHeader>
      <CardContent>
        <PlatformTabs
          streamKeys={streamKeys}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showKey={showKey}
          toggleShowKey={toggleShowKey}
          handleStreamKeyChange={handleStreamKeyChange}
          handleSaveKeys={handleSaveKeys}
          handleCopyUrl={handleCopyUrl}
          handleCopyKey={handleCopyKey}
          copiedUrl={copiedUrl}
          copiedKey={copiedKey}
        />
      </CardContent>
    </Card>
  );
};

export default StreamKeyManager;
