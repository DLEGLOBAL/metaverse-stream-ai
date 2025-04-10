
import React from 'react';
import { 
  Settings, User, Shield, Monitor, 
  Headphones, Camera, Database, Key, 
  Cpu, Palette 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SettingsTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SettingsTabs: React.FC<SettingsTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'layout', name: 'Layout Customization', icon: Palette },
    { id: 'general', name: 'General', icon: Settings },
    { id: 'account', name: 'Account', icon: User },
    { id: 'privacy', name: 'Privacy', icon: Shield },
    { id: 'video', name: 'Video', icon: Camera },
    { id: 'audio', name: 'Audio', icon: Headphones },
    { id: 'display', name: 'Display', icon: Monitor },
    { id: 'storage', name: 'Storage', icon: Database },
    { id: 'api', name: 'API Keys', icon: Key },
    { id: 'advanced', name: 'Advanced', icon: Cpu },
  ];

  return (
    <Card className="glass-card h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">Settings Menu</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <nav className="flex flex-col">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center p-4 text-left hover:bg-meta-teal/10 transition-colors ${
                activeTab === tab.id ? 'bg-meta-teal/20 border-l-4 border-meta-teal' : ''
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className={`h-5 w-5 mr-3 ${activeTab === tab.id ? 'text-meta-teal' : 'text-gray-400'}`} />
              <span className={`${activeTab === tab.id ? 'text-white font-medium' : 'text-gray-300'}`}>
                {tab.name}
              </span>
            </button>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
};

export default SettingsTabs;
