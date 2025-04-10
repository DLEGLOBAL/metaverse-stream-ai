
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

import SettingsTabs from '@/components/settings/SettingsTabs';
import LayoutCustomization from '@/components/settings/LayoutCustomization';
import GeneralSettings from '@/components/settings/GeneralSettings';
import AccountSettings from '@/components/settings/AccountSettings';
import PrivacySettings from '@/components/settings/PrivacySettings';
import VideoSettings from '@/components/settings/VideoSettings';
import AudioSettingsPanel from '@/components/settings/AudioSettingsPanel';
import DisplaySettingsPanel from '@/components/settings/DisplaySettingsPanel';
import StorageSettings from '@/components/settings/StorageSettings';
import ApiKeysSettings from '@/components/settings/ApiKeysSettings';
import AdvancedSettings from '@/components/settings/AdvancedSettings';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('layout');
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <Button 
          className="bg-button-gradient text-meta-dark-blue hover:brightness-110"
          onClick={handleSaveSettings}
        >
          <Save className="h-4 w-4 mr-2" /> Save Changes
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings tabs */}
        <div>
          <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        
        {/* Settings content */}
        <div className="lg:col-span-3">
          {activeTab === 'layout' && <LayoutCustomization />}
          {activeTab === 'general' && <GeneralSettings />}
          {activeTab === 'account' && <AccountSettings />}
          {activeTab === 'privacy' && <PrivacySettings />}
          {activeTab === 'video' && <VideoSettings />}
          {activeTab === 'audio' && <AudioSettingsPanel />}
          {activeTab === 'display' && <DisplaySettingsPanel />}
          {activeTab === 'storage' && <StorageSettings />}
          {activeTab === 'api' && <ApiKeysSettings />}
          {activeTab === 'advanced' && <AdvancedSettings />}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
