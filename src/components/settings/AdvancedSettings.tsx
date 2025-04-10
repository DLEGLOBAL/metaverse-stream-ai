
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { AlertTriangle, Code, Cpu, Download, FileJson, HardDrive, Save, Terminal, Upload, Wrench } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const AdvancedSettings: React.FC = () => {
  const [advancedSettings, setAdvancedSettings] = useState({
    experimentalFeatures: false,
    debugMode: false,
    hardwareAcceleration: true,
    multiprocessRendering: true,
    logLevel: 'warning',
    autoUpdate: true,
    checkForUpdatesOnStartup: true,
    sendCrashReports: true,
    autoRecover: true,
    autoSave: true,
    autoSaveInterval: 5,
    useProxy: false,
    proxyAddress: '',
    proxyPort: '',
    customWebhook: '',
    maxConcurrentOperations: 4,
    networkBufferSize: 8,
    allowRemoteConnections: false,
    useCustomPortRange: false,
    portRangeStart: 49152,
    portRangeEnd: 65535,
    customConfig: ''
  });
  
  const [openSection, setOpenSection] = useState<string | null>(null);
  
  const handleToggle = (setting: string) => {
    setAdvancedSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
    
    toast({
      title: 'Advanced Setting Updated',
      description: `${setting.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} has been ${!advancedSettings[setting as keyof typeof advancedSettings] ? 'enabled' : 'disabled'}.`,
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setAdvancedSettings(prev => ({
      ...prev,
      [name]: value
    }));
    
    toast({
      title: 'Advanced Setting Updated',
      description: `${name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} has been set to ${value}.`,
    });
  };
  
  const handleInputChange = (name: string, value: string | number) => {
    setAdvancedSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const exportSettings = () => {
    const settingsJson = JSON.stringify(advancedSettings, null, 2);
    const blob = new Blob([settingsJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'metastream-advanced-settings.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Settings Exported',
      description: 'Advanced settings have been exported successfully.',
    });
  };
  
  const importSettings = () => {
    // Simulating a file import
    toast({
      title: 'Settings Imported',
      description: 'Advanced settings have been imported successfully.',
    });
  };
  
  const resetSettings = () => {
    // Simplified reset without confirmation dialog
    setAdvancedSettings({
      experimentalFeatures: false,
      debugMode: false,
      hardwareAcceleration: true,
      multiprocessRendering: true,
      logLevel: 'warning',
      autoUpdate: true,
      checkForUpdatesOnStartup: true,
      sendCrashReports: true,
      autoRecover: true,
      autoSave: true,
      autoSaveInterval: 5,
      useProxy: false,
      proxyAddress: '',
      proxyPort: '',
      customWebhook: '',
      maxConcurrentOperations: 4,
      networkBufferSize: 8,
      allowRemoteConnections: false,
      useCustomPortRange: false,
      portRangeStart: 49152,
      portRangeEnd: 65535,
      customConfig: ''
    });
    
    toast({
      title: 'Settings Reset',
      description: 'Advanced settings have been reset to default values.',
    });
  };
  
  const saveCustomConfig = () => {
    toast({
      title: 'Custom Configuration Saved',
      description: 'Your custom configuration has been applied.',
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-yellow-900/20 text-yellow-400 p-4 rounded-md border border-yellow-900/40">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium mb-1">Advanced Settings Warning</h3>
            <p className="text-sm">
              These settings are intended for advanced users. Changing these values may impact application performance or stability.
              Only modify these settings if you understand the consequences.
            </p>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="system" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
          <TabsTrigger value="debug">Debug</TabsTrigger>
          <TabsTrigger value="custom">Custom Config</TabsTrigger>
        </TabsList>
        
        <TabsContent value="system">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">System Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <Wrench className="h-4 w-4 text-meta-teal" />
                      <h3 className="text-base font-medium">Experimental Features</h3>
                    </div>
                    <p className="text-xs text-gray-400">Enable in-development features that may not be stable</p>
                  </div>
                  <Switch 
                    checked={advancedSettings.experimentalFeatures}
                    onCheckedChange={() => handleToggle('experimentalFeatures')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-medium">Auto Update</h3>
                    <p className="text-xs text-gray-400">Automatically download and install updates</p>
                  </div>
                  <Switch 
                    checked={advancedSettings.autoUpdate}
                    onCheckedChange={() => handleToggle('autoUpdate')}
                  />
                </div>
                
                {advancedSettings.autoUpdate && (
                  <div className="pl-6 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-sm font-medium">Check for Updates on Startup</h3>
                      <p className="text-xs text-gray-400">Check for new versions when application starts</p>
                    </div>
                    <Switch 
                      checked={advancedSettings.checkForUpdatesOnStartup}
                      onCheckedChange={() => handleToggle('checkForUpdatesOnStartup')}
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-medium">Send Crash Reports</h3>
                    <p className="text-xs text-gray-400">Automatically send diagnostic data when the app crashes</p>
                  </div>
                  <Switch 
                    checked={advancedSettings.sendCrashReports}
                    onCheckedChange={() => handleToggle('sendCrashReports')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-medium">Auto Recover</h3>
                    <p className="text-xs text-gray-400">Attempt to recover work after unexpected shutdowns</p>
                  </div>
                  <Switch 
                    checked={advancedSettings.autoRecover}
                    onCheckedChange={() => handleToggle('autoRecover')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-medium">Auto Save</h3>
                    <p className="text-xs text-gray-400">Automatically save projects periodically</p>
                  </div>
                  <Switch 
                    checked={advancedSettings.autoSave}
                    onCheckedChange={() => handleToggle('autoSave')}
                  />
                </div>
                
                {advancedSettings.autoSave && (
                  <div className="pl-6">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Auto Save Interval (minutes)
                    </label>
                    <Select
                      value={advancedSettings.autoSaveInterval.toString()}
                      onValueChange={(value) => handleSelectChange('autoSaveInterval', value)}
                    >
                      <SelectTrigger className="w-full bg-meta-dark-blue border border-meta-teal/30 text-white">
                        <SelectValue placeholder="Select interval" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 minute</SelectItem>
                        <SelectItem value="2">2 minutes</SelectItem>
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="10">10 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <div className="flex justify-between mt-6 pt-4 border-t border-gray-700">
                  <Button 
                    variant="outline" 
                    className="flex items-center"
                    onClick={exportSettings}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Settings
                  </Button>
                  
                  <div className="space-x-2">
                    <Button 
                      variant="destructive" 
                      className="bg-red-900 hover:bg-red-800 text-white border-none"
                      onClick={resetSettings}
                    >
                      Reset to Default
                    </Button>
                    
                    <Button 
                      className="flex items-center bg-button-gradient text-meta-dark-blue hover:brightness-110"
                      onClick={importSettings}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Import Settings
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Performance Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <Cpu className="h-4 w-4 text-meta-teal" />
                      <h3 className="text-base font-medium">Hardware Acceleration</h3>
                    </div>
                    <p className="text-xs text-gray-400">Use GPU for rendering when available</p>
                  </div>
                  <Switch 
                    checked={advancedSettings.hardwareAcceleration}
                    onCheckedChange={() => handleToggle('hardwareAcceleration')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-medium">Multiprocess Rendering</h3>
                    <p className="text-xs text-gray-400">Use multiple CPU processes for rendering</p>
                  </div>
                  <Switch 
                    checked={advancedSettings.multiprocessRendering}
                    onCheckedChange={() => handleToggle('multiprocessRendering')}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Maximum Concurrent Operations
                  </label>
                  <Select
                    value={advancedSettings.maxConcurrentOperations.toString()}
                    onValueChange={(value) => handleSelectChange('maxConcurrentOperations', value)}
                  >
                    <SelectTrigger className="w-full bg-meta-dark-blue border border-meta-teal/30 text-white">
                      <SelectValue placeholder="Select count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 (Low CPU usage)</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="4">4 (Balanced)</SelectItem>
                      <SelectItem value="8">8 (High performance)</SelectItem>
                      <SelectItem value="16">16 (Maximum performance)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Network Buffer Size (MB)
                  </label>
                  <Select
                    value={advancedSettings.networkBufferSize.toString()}
                    onValueChange={(value) => handleSelectChange('networkBufferSize', value)}
                  >
                    <SelectTrigger className="w-full bg-meta-dark-blue border border-meta-teal/30 text-white">
                      <SelectValue placeholder="Select buffer size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 MB</SelectItem>
                      <SelectItem value="4">4 MB</SelectItem>
                      <SelectItem value="8">8 MB (Recommended)</SelectItem>
                      <SelectItem value="16">16 MB</SelectItem>
                      <SelectItem value="32">32 MB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <Collapsible
                    open={openSection === 'performance-advanced'}
                    onOpenChange={() => setOpenSection(openSection === 'performance-advanced' ? null : 'performance-advanced')}
                  >
                    <CollapsibleTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="p-0 h-auto flex items-center text-meta-teal underline-offset-4 hover:underline"
                      >
                        Show Advanced Performance Options
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Renderer Process Limit
                          </label>
                          <Input
                            type="number"
                            min="1"
                            max="16"
                            value="4"
                            className="bg-meta-dark-blue border border-meta-teal/30"
                            onChange={() => {
                              toast({
                                title: 'Advanced Setting',
                                description: 'This setting will be saved when you apply changes',
                              });
                            }}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Memory Limit (MB)
                          </label>
                          <Input
                            type="number"
                            min="1024"
                            max="8192"
                            step="256"
                            value="2048"
                            className="bg-meta-dark-blue border border-meta-teal/30"
                            onChange={() => {
                              toast({
                                title: 'Advanced Setting',
                                description: 'This setting will be saved when you apply changes',
                              });
                            }}
                          />
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="network">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Network Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-medium">Use Proxy</h3>
                    <p className="text-xs text-gray-400">Connect through a proxy server</p>
                  </div>
                  <Switch 
                    checked={advancedSettings.useProxy}
                    onCheckedChange={() => handleToggle('useProxy')}
                  />
                </div>
                
                {advancedSettings.useProxy && (
                  <div className="pl-6 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Proxy Address
                      </label>
                      <Input
                        value={advancedSettings.proxyAddress}
                        onChange={(e) => handleInputChange('proxyAddress', e.target.value)}
                        placeholder="127.0.0.1"
                        className="bg-meta-dark-blue border border-meta-teal/30"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Proxy Port
                      </label>
                      <Input
                        value={advancedSettings.proxyPort}
                        onChange={(e) => handleInputChange('proxyPort', e.target.value)}
                        placeholder="8080"
                        className="bg-meta-dark-blue border border-meta-teal/30"
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-medium">Allow Remote Connections</h3>
                    <p className="text-xs text-gray-400">Allow incoming connections from other networks</p>
                  </div>
                  <Switch 
                    checked={advancedSettings.allowRemoteConnections}
                    onCheckedChange={() => handleToggle('allowRemoteConnections')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-medium">Custom Port Range</h3>
                    <p className="text-xs text-gray-400">Use specific ports for network communication</p>
                  </div>
                  <Switch 
                    checked={advancedSettings.useCustomPortRange}
                    onCheckedChange={() => handleToggle('useCustomPortRange')}
                  />
                </div>
                
                {advancedSettings.useCustomPortRange && (
                  <div className="pl-6 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Start Port
                      </label>
                      <Input
                        type="number"
                        min="1024"
                        max="65534"
                        value={advancedSettings.portRangeStart}
                        onChange={(e) => handleInputChange('portRangeStart', parseInt(e.target.value))}
                        className="bg-meta-dark-blue border border-meta-teal/30"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        End Port
                      </label>
                      <Input
                        type="number"
                        min="1025"
                        max="65535"
                        value={advancedSettings.portRangeEnd}
                        onChange={(e) => handleInputChange('portRangeEnd', parseInt(e.target.value))}
                        className="bg-meta-dark-blue border border-meta-teal/30"
                      />
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Custom Webhook URL
                  </label>
                  <Input
                    value={advancedSettings.customWebhook}
                    onChange={(e) => handleInputChange('customWebhook', e.target.value)}
                    placeholder="https://example.com/webhook"
                    className="bg-meta-dark-blue border border-meta-teal/30"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Receive notifications about application events at this URL
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="debug">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Debug Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <Terminal className="h-4 w-4 text-meta-teal" />
                      <h3 className="text-base font-medium">Debug Mode</h3>
                    </div>
                    <p className="text-xs text-gray-400">Show extra debug information and developer tools</p>
                  </div>
                  <Switch 
                    checked={advancedSettings.debugMode}
                    onCheckedChange={() => handleToggle('debugMode')}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Log Level
                  </label>
                  <Select
                    value={advancedSettings.logLevel}
                    onValueChange={(value) => handleSelectChange('logLevel', value)}
                  >
                    <SelectTrigger className="w-full bg-meta-dark-blue border border-meta-teal/30 text-white">
                      <SelectValue placeholder="Select log level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="error">Error (Minimal)</SelectItem>
                      <SelectItem value="warning">Warning (Standard)</SelectItem>
                      <SelectItem value="info">Info (Detailed)</SelectItem>
                      <SelectItem value="debug">Debug (Verbose)</SelectItem>
                      <SelectItem value="trace">Trace (Maximum)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4">
                  <Button 
                    variant="outline"
                    className="w-full flex items-center justify-center"
                    onClick={() => {
                      toast({
                        title: 'Debug Log Generated',
                        description: 'Debug information has been copied to clipboard.',
                      });
                    }}
                  >
                    <HardDrive className="h-4 w-4 mr-2" />
                    Generate Debug Report
                  </Button>
                </div>
                
                <div className="pt-2">
                  <Button 
                    variant="outline"
                    className="w-full flex items-center justify-center"
                    onClick={() => {
                      toast({
                        title: 'Debug Console',
                        description: 'Developer console has been opened.',
                      });
                    }}
                  >
                    <Terminal className="h-4 w-4 mr-2" />
                    Open Developer Console
                  </Button>
                </div>
                
                {advancedSettings.debugMode && (
                  <div className="pt-4 border-t border-gray-700">
                    <h3 className="text-base font-medium mb-2">Debug Console Output</h3>
                    <div className="bg-black p-3 rounded-md text-green-400 font-mono text-xs h-32 overflow-y-auto">
                      <div>[INFO] Application started</div>
                      <div>[INFO] Initializing renderer process</div>
                      <div>[INFO] Loading configuration from default path</div>
                      <div>[DEBUG] Hardware acceleration: enabled</div>
                      <div>[DEBUG] Multi-process rendering: enabled</div>
                      <div>[INFO] Connected to update server</div>
                      <div>[INFO] Loading UI components</div>
                      <div>[DEBUG] Registering event handlers</div>
                      <div>[INFO] Application ready</div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="custom">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Custom Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-yellow-900/20 text-yellow-400 p-3 rounded-md border border-yellow-900/40 text-sm">
                  <div className="flex items-start">
                    <Code className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      Warning: Modifying these settings can cause application instability. 
                      Only edit if you know what you're doing.
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <FileJson className="h-4 w-4 mr-2 text-meta-teal" />
                    <h3 className="text-base font-medium">Custom Configuration JSON</h3>
                  </div>
                  <Textarea 
                    value={advancedSettings.customConfig}
                    onChange={(e) => handleInputChange('customConfig', e.target.value)}
                    placeholder={`{\n  "experimentalFeatures": {\n    "newCodec": true,\n    "p2pConnections": false\n  },\n  "networkSettings": {\n    "timeout": 30000\n  }\n}`}
                    className="font-mono text-sm h-64 bg-meta-dark-blue border border-meta-teal/30"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    These settings override any configurations set through the UI
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    className="bg-button-gradient text-meta-dark-blue hover:brightness-110 flex items-center"
                    onClick={saveCustomConfig}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Apply Custom Configuration
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedSettings;
