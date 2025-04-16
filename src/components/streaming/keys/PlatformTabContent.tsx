
import React from 'react';
import PlatformKeyInput from './PlatformKeyInput';
import { PlatformKey } from './types';

interface PlatformTabContentProps {
  platform: PlatformKey;
  showKey: boolean;
  toggleShowKey: () => void;
  handleStreamKeyChange: (value: string) => void;
  handleCopyUrl: (url: string) => void;
  handleCopyKey: (key: string) => void;
  copiedUrl: boolean;
  copiedKey: boolean;
  activeTab: string;
}

const PlatformTabContent: React.FC<PlatformTabContentProps> = ({
  platform,
  showKey,
  toggleShowKey,
  handleStreamKeyChange,
  handleCopyUrl,
  handleCopyKey,
  copiedUrl,
  copiedKey,
  activeTab,
}) => {
  return (
    <div className="space-y-4">
      <PlatformKeyInput
        label={`${platform.platform} RTMP URL`}
        value={platform.rtmpUrl}
        readOnly={true}
        onCopy={handleCopyUrl}
        copied={copiedUrl && activeTab === platform.platform}
        inputType="url"
      />
      
      <PlatformKeyInput
        label={`${platform.platform} Stream Key`}
        value={platform.streamKey}
        isPassword={true}
        showPassword={showKey}
        onTogglePassword={toggleShowKey}
        onChange={handleStreamKeyChange}
        onCopy={handleCopyKey}
        copied={copiedKey && activeTab === platform.platform}
        inputType="key"
        helperText="Keep your stream key private! Never share it with others."
      />
    </div>
  );
};

export default PlatformTabContent;
