
import React from 'react';
import PlatformKeyInput from './PlatformKeyInput';
import { PlatformKey } from './types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, Settings } from 'lucide-react';
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
  onUpdatePlatformConfig?: (platform: string, config: Partial<PlatformKey>) => void;
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
  onUpdatePlatformConfig
}) => {
  const handleRtmpUrlChange = (value: string) => {
    onUpdatePlatformConfig?.(platform.platform, { rtmpUrl: value });
  };

  const handleProxyToggle = (enabled: boolean) => {
    onUpdatePlatformConfig?.(platform.platform, {
      customConfig: {
        ...platform.customConfig,
        proxyEnabled: enabled
      }
    });
  };

  const handleProxyTypeChange = (value: 'yellowduck' | 'android-emulator' | 'custom') => {
    onUpdatePlatformConfig?.(platform.platform, {
      customConfig: {
        ...platform.customConfig,
        proxyType: value
      }
    });
  };

  const handleProxyUrlChange = (value: string) => {
    onUpdatePlatformConfig?.(platform.platform, {
      customConfig: {
        ...platform.customConfig,
        proxyUrl: value
      }
    });
  };

  const handleBetaProgramToggle = (enabled: boolean) => {
    onUpdatePlatformConfig?.(platform.platform, {
      customConfig: {
        ...platform.customConfig,
        betaProgram: enabled
      }
    });
  };

  return (
    <div className="space-y-4">
      <PlatformKeyInput
        label={`${platform.platform} RTMP URL`}
        value={platform.rtmpUrl}
        readOnly={!platform.isAdvanced}
        onChange={handleRtmpUrlChange}
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
      
      {platform.isAdvanced && (
        <Collapsible className="w-full mt-2 border border-meta-teal/20 rounded-md p-2">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex w-full justify-between">
              <span className="flex items-center">
                <Settings className="h-4 w-4 mr-2" /> 
                Advanced Settings
              </span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 pt-3">
            {platform.platform === 'TikTok' && (
              <>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="beta-program" 
                    checked={platform.customConfig?.betaProgram || false}
                    onCheckedChange={handleBetaProgramToggle}
                  />
                  <Label htmlFor="beta-program" className="text-sm text-gray-300">
                    Enable TikTok Custom RTMP Beta Program
                  </Label>
                </div>
                {platform.customConfig?.betaProgram && (
                  <div className="p-3 rounded-md bg-meta-teal/10 border border-meta-teal/30">
                    <h4 className="text-white text-sm font-medium mb-1">TikTok Beta Program Notes:</h4>
                    <p className="text-xs text-gray-400 mb-2">
                      The custom RTMP feature allows you to use MetaStream directly with TikTok's Beta streaming program.
                    </p>
                    <ol className="text-xs text-gray-400 list-decimal pl-4 space-y-1">
                      <li>Request access to TikTok's custom RTMP feature</li>
                      <li>Use the server URL and stream key provided by TikTok</li>
                      <li>Ensure your account is approved for the beta program</li>
                    </ol>
                  </div>
                )}
              </>
            )}
            
            {platform.platform === 'Instagram' && (
              <>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="proxy-enabled" 
                    checked={platform.customConfig?.proxyEnabled || false}
                    onCheckedChange={handleProxyToggle}
                  />
                  <Label htmlFor="proxy-enabled" className="text-sm text-gray-300">
                    Enable Instagram Streaming Proxy
                  </Label>
                </div>
                
                {platform.customConfig?.proxyEnabled && (
                  <>
                    <div>
                      <Label htmlFor="proxy-type" className="block text-sm font-medium text-gray-300 mb-1">
                        Proxy Type
                      </Label>
                      <Select 
                        value={platform.customConfig?.proxyType} 
                        onValueChange={handleProxyTypeChange as any}
                      >
                        <SelectTrigger className="w-full bg-meta-dark-blue border border-meta-teal/30">
                          <SelectValue placeholder="Select proxy type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yellowduck">Yellow Duck</SelectItem>
                          <SelectItem value="android-emulator">Android Emulator</SelectItem>
                          <SelectItem value="custom">Custom Proxy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <PlatformKeyInput
                      label="Proxy RTMP URL"
                      value={platform.customConfig?.proxyUrl || ''}
                      placeholder={
                        platform.customConfig?.proxyType === 'yellowduck' 
                          ? "rtmp://localhost:1935/rtmp" 
                          : platform.customConfig?.proxyType === 'android-emulator'
                            ? "rtmp://127.0.0.1:1935/live"
                            : "rtmp://your-proxy-url"
                      }
                      onChange={handleProxyUrlChange}
                      inputType="custom"
                    />
                    
                    <div className="p-3 rounded-md bg-meta-teal/10 border border-meta-teal/30">
                      <h4 className="text-white text-sm font-medium mb-1">Instagram Streaming Note:</h4>
                      <p className="text-xs text-gray-400">
                        Instagram requires a mobile client for streaming. These proxies mimic a mobile device to enable browser-based streaming.
                      </p>
                    </div>
                  </>
                )}
              </>
            )}
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};

export default PlatformTabContent;
