
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Database, HardDrive, Archive, Trash2, Clock, UploadCloud, Cloud } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const StorageSettings: React.FC = () => {
  const [storageSettings, setStorageSettings] = useState({
    autoCleanup: true,
    cleanupDays: 30,
    cloudBackup: false,
    backupFrequency: 'weekly',
    compressionLevel: 'medium',
    recordingsLocation: 'default',
    customPath: '',
    redundantStorage: false,
    cacheClearOnStart: false,
    lowSpaceWarning: true,
    lowSpaceThreshold: 15
  });
  
  const [storageUsage, setStorageUsage] = useState({
    total: 500, // GB
    used: 327,
    recordings: 145,
    cache: 62,
    logs: 23,
    other: 97
  });
  
  const [isClearing, setIsClearing] = useState(false);
  
  const handleToggle = (setting: string) => {
    setStorageSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
    
    toast({
      title: 'Storage Setting Updated',
      description: `${setting.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} has been ${!storageSettings[setting as keyof typeof storageSettings] ? 'enabled' : 'disabled'}.`,
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setStorageSettings(prev => ({
      ...prev,
      [name]: value
    }));
    
    toast({
      title: 'Storage Setting Updated',
      description: `${name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} has been set to ${value}.`,
    });
  };
  
  const handleSliderChange = (setting: string, value: number[]) => {
    setStorageSettings(prev => ({
      ...prev,
      [setting]: value[0]
    }));
  };
  
  const handleClearCache = () => {
    setIsClearing(true);
    
    // Simulate cache clearing
    setTimeout(() => {
      setStorageUsage(prev => ({
        ...prev,
        used: prev.used - prev.cache,
        cache: 0
      }));
      
      setIsClearing(false);
      
      toast({
        title: 'Cache Cleared',
        description: 'Application cache has been successfully cleared.',
      });
    }, 2000);
  };
  
  const handleClearLogs = () => {
    setIsClearing(true);
    
    // Simulate logs clearing
    setTimeout(() => {
      setStorageUsage(prev => ({
        ...prev,
        used: prev.used - prev.logs,
        logs: 0
      }));
      
      setIsClearing(false);
      
      toast({
        title: 'Logs Cleared',
        description: 'Application logs have been successfully cleared.',
      });
    }, 1500);
  };
  
  const calculatePercentage = (value: number) => {
    return (value / storageUsage.total) * 100;
  };
  
  const getUsedPercentage = () => {
    return Math.round((storageUsage.used / storageUsage.total) * 100);
  };
  
  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Storage Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Storage Used: {storageUsage.used} GB</span>
                <span className="text-sm">{getUsedPercentage()}% of {storageUsage.total} GB</span>
              </div>
              <Progress value={getUsedPercentage()} className="h-2" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <StorageUsageCard 
                  title="Recordings"
                  icon={<HardDrive className="h-5 w-5 text-purple-400" />}
                  used={storageUsage.recordings}
                  total={storageUsage.total}
                  color="bg-purple-500"
                />
                
                <StorageUsageCard 
                  title="Cache"
                  icon={<Database className="h-5 w-5 text-blue-400" />}
                  used={storageUsage.cache}
                  total={storageUsage.total}
                  color="bg-blue-500"
                />
                
                <StorageUsageCard 
                  title="Logs"
                  icon={<Archive className="h-5 w-5 text-orange-400" />}
                  used={storageUsage.logs}
                  total={storageUsage.total}
                  color="bg-orange-500"
                />
                
                <StorageUsageCard 
                  title="Other"
                  icon={<Database className="h-5 w-5 text-green-400" />}
                  used={storageUsage.other}
                  total={storageUsage.total}
                  color="bg-green-500"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Storage Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-meta-teal" />
                  <h3 className="text-base font-medium">Automatic Cleanup</h3>
                </div>
                <p className="text-xs text-gray-400">Delete old recordings and logs automatically</p>
              </div>
              <Switch 
                checked={storageSettings.autoCleanup}
                onCheckedChange={() => handleToggle('autoCleanup')}
              />
            </div>
            
            {storageSettings.autoCleanup && (
              <div className="pl-6 space-y-1">
                <label className="text-sm text-gray-400">Keep files for {storageSettings.cleanupDays} days</label>
                <Slider 
                  value={[storageSettings.cleanupDays]}
                  min={7}
                  max={365}
                  step={1}
                  onValueChange={(values) => handleSliderChange('cleanupDays', values)}
                />
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <UploadCloud className="h-4 w-4 text-meta-teal" />
                  <h3 className="text-base font-medium">Cloud Backup</h3>
                </div>
                <p className="text-xs text-gray-400">Automatically backup your recordings to the cloud</p>
              </div>
              <Switch 
                checked={storageSettings.cloudBackup}
                onCheckedChange={() => handleToggle('cloudBackup')}
              />
            </div>
            
            {storageSettings.cloudBackup && (
              <div className="pl-6 space-y-2">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Backup Frequency</label>
                  <Select
                    value={storageSettings.backupFrequency}
                    onValueChange={(value) => handleSelectChange('backupFrequency', value)}
                  >
                    <SelectTrigger className="w-full bg-meta-dark-blue border border-meta-teal/30 text-white">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-medium">Redundant Storage</h3>
                    <p className="text-xs text-gray-400">Store backups in multiple cloud locations</p>
                  </div>
                  <Switch 
                    checked={storageSettings.redundantStorage}
                    onCheckedChange={() => handleToggle('redundantStorage')}
                  />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Recordings Location</label>
              <Select
                value={storageSettings.recordingsLocation}
                onValueChange={(value) => handleSelectChange('recordingsLocation', value)}
              >
                <SelectTrigger className="w-full bg-meta-dark-blue border border-meta-teal/30 text-white">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default Location</SelectItem>
                  <SelectItem value="custom">Custom Path</SelectItem>
                  <SelectItem value="external">External Drive</SelectItem>
                </SelectContent>
              </Select>
              
              {storageSettings.recordingsLocation === 'custom' && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={storageSettings.customPath}
                    onChange={(e) => handleSelectChange('customPath', e.target.value)}
                    placeholder="Enter custom path"
                    className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white mt-1"
                  />
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Compression Level</label>
              <Select
                value={storageSettings.compressionLevel}
                onValueChange={(value) => handleSelectChange('compressionLevel', value)}
              >
                <SelectTrigger className="w-full bg-meta-dark-blue border border-meta-teal/30 text-white">
                  <SelectValue placeholder="Select compression" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (Best Quality)</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium (Balanced)</SelectItem>
                  <SelectItem value="high">High (Save Space)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">Clear Cache on Startup</h3>
                <p className="text-xs text-gray-400">Automatically clear cache when app starts</p>
              </div>
              <Switch 
                checked={storageSettings.cacheClearOnStart}
                onCheckedChange={() => handleToggle('cacheClearOnStart')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">Low Space Warning</h3>
                <p className="text-xs text-gray-400">Show alert when storage is running low</p>
              </div>
              <Switch 
                checked={storageSettings.lowSpaceWarning}
                onCheckedChange={() => handleToggle('lowSpaceWarning')}
              />
            </div>
            
            {storageSettings.lowSpaceWarning && (
              <div className="pl-6 space-y-1">
                <label className="text-sm text-gray-400">Alert when less than {storageSettings.lowSpaceThreshold}% space remains</label>
                <Slider 
                  value={[storageSettings.lowSpaceThreshold]}
                  min={5}
                  max={30}
                  step={1}
                  onValueChange={(values) => handleSliderChange('lowSpaceThreshold', values)}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Storage Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                onClick={handleClearCache}
                className="bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2"
                disabled={storageUsage.cache === 0 || isClearing}
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear Cache ({storageUsage.cache} GB)</span>
              </Button>
              
              <Button 
                onClick={handleClearLogs}
                className="bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center gap-2"
                disabled={storageUsage.logs === 0 || isClearing}
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear Logs ({storageUsage.logs} GB)</span>
              </Button>
              
              <Button 
                className="bg-purple-500 hover:bg-purple-600 text-white flex items-center justify-center gap-2 md:col-span-2"
                onClick={() => {
                  toast({
                    title: 'Storage Analysis',
                    description: 'Analyzing recordings for duplicate content...',
                  });
                }}
              >
                <Database className="h-4 w-4" />
                <span>Analyze Storage for Duplicates</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface StorageUsageCardProps {
  title: string;
  icon: React.ReactNode;
  used: number;
  total: number;
  color: string;
}

const StorageUsageCard: React.FC<StorageUsageCardProps> = ({
  title,
  icon,
  used,
  total,
  color
}) => {
  const percentage = Math.round((used / total) * 100);
  
  return (
    <div className="bg-meta-dark-blue/30 p-3 rounded-md border border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {icon}
          <span className="ml-2 font-medium">{title}</span>
        </div>
        <span className="text-sm">{used} GB</span>
      </div>
      <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-xs text-gray-400 mt-1">
        {percentage}% of total storage
      </div>
    </div>
  );
};

export default StorageSettings;
