
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import PlatformTabContent from './PlatformTabContent';
import { PlatformKey } from './types';

interface PlatformTabsProps {
  streamKeys: PlatformKey[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showKey: boolean;
  toggleShowKey: () => void;
  handleStreamKeyChange: (value: string) => void;
  handleSaveKeys: () => void;
  handleCopyUrl: (url: string) => void;
  handleCopyKey: (key: string) => void;
  copiedUrl: boolean;
  copiedKey: boolean;
}

const PlatformTabs: React.FC<PlatformTabsProps> = ({
  streamKeys,
  activeTab,
  setActiveTab,
  showKey,
  toggleShowKey,
  handleStreamKeyChange,
  handleSaveKeys,
  handleCopyUrl,
  handleCopyKey,
  copiedUrl,
  copiedKey,
}) => {
  return (
    <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-4">
        {streamKeys.map(platform => (
          <TabsTrigger key={platform.platform} value={platform.platform}>
            {platform.platform}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {streamKeys.map(platform => (
        <TabsContent key={platform.platform} value={platform.platform}>
          <PlatformTabContent
            platform={platform}
            showKey={showKey}
            toggleShowKey={toggleShowKey}
            handleStreamKeyChange={handleStreamKeyChange}
            handleCopyUrl={handleCopyUrl}
            handleCopyKey={handleCopyKey}
            copiedUrl={copiedUrl}
            copiedKey={copiedKey}
            activeTab={activeTab}
          />
        </TabsContent>
      ))}
      
      <Button 
        onClick={handleSaveKeys}
        className="mt-4 w-full bg-button-gradient text-meta-dark-blue hover:brightness-110"
      >
        <Save className="h-4 w-4 mr-2" /> Save All Stream Keys
      </Button>
    </Tabs>
  );
};

export default PlatformTabs;
