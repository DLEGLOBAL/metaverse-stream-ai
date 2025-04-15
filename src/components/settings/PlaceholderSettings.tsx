
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Camera, Headphones, Monitor, Database, Key, Cpu } from 'lucide-react';

interface PlaceholderSettingsProps {
  tabId: string;
}

const PlaceholderSettings: React.FC<PlaceholderSettingsProps> = ({ tabId }) => {
  const getIcon = () => {
    switch (tabId) {
      case 'privacy': return <Shield className="h-8 w-8 text-meta-teal" />;
      case 'video': return <Camera className="h-8 w-8 text-meta-teal" />;
      case 'audio': return <Headphones className="h-8 w-8 text-meta-teal" />;
      case 'display': return <Monitor className="h-8 w-8 text-meta-teal" />;
      case 'storage': return <Database className="h-8 w-8 text-meta-teal" />;
      case 'api': return <Key className="h-8 w-8 text-meta-teal" />;
      case 'advanced': return <Cpu className="h-8 w-8 text-meta-teal" />;
      default: return <Cpu className="h-8 w-8 text-meta-teal" />;
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">{tabId.charAt(0).toUpperCase() + tabId.slice(1)} Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-10">
          <div className="bg-meta-teal/20 p-4 rounded-full mb-4">
            {getIcon()}
          </div>
          <h3 className="text-xl font-medium text-white mb-2">
            {tabId.charAt(0).toUpperCase() + tabId.slice(1)} Settings
          </h3>
          <p className="text-gray-400 text-center max-w-md">
            Configure your {tabId.toLowerCase()} settings here.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaceholderSettings;
