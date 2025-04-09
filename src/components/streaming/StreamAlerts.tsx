
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppContext } from '@/contexts/AppContext';
import { Bell, Volume2, Eye, Timer } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const StreamAlerts = () => {
  const { streamAlerts, toggleStreamAlert, updateStreamAlert } = useAppContext();
  const [testingAlert, setTestingAlert] = useState<number | null>(null);

  const handleTestAlert = (id: number) => {
    const alert = streamAlerts.find(a => a.id === id);
    if (alert) {
      setTestingAlert(id);
      toast({
        title: 'Testing Alert',
        description: `Testing ${alert.type} alert...`,
      });
      
      // Simulate alert displaying for a few seconds
      setTimeout(() => {
        setTestingAlert(null);
        toast({
          title: 'Test Complete',
          description: 'Alert test has finished',
        });
      }, 3000);
    }
  };

  const alertTypeIcons = {
    'follower': <Bell className="h-4 w-4 text-blue-400" />,
    'subscriber': <Bell className="h-4 w-4 text-green-400" />,
    'donation': <Bell className="h-4 w-4 text-yellow-400" />,
    'host': <Bell className="h-4 w-4 text-purple-400" />,
    'raid': <Bell className="h-4 w-4 text-red-400" />,
  };

  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">Stream Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {streamAlerts.map((alert) => (
            <div key={alert.id} className="p-4 border border-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {alertTypeIcons[alert.type]}
                  <span className="ml-2 font-medium text-white capitalize">{alert.type} Alert</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={alert.enabled} 
                    onCheckedChange={() => toggleStreamAlert(alert.id)} 
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-meta-teal/30 hover:bg-meta-teal/10 text-meta-teal"
                    onClick={() => handleTestAlert(alert.id)}
                    disabled={testingAlert === alert.id}
                  >
                    {testingAlert === alert.id ? 'Testing...' : 'Test'}
                  </Button>
                </div>
              </div>
              
              {alert.enabled && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor={`message-${alert.id}`} className="text-sm text-gray-400">Alert Message</Label>
                      <Input 
                        id={`message-${alert.id}`}
                        value={alert.message}
                        onChange={(e) => updateStreamAlert(alert.id, { message: e.target.value })}
                        className="mt-1 bg-meta-dark-blue/60 border-gray-700"
                      />
                      <p className="text-xs text-gray-500 mt-1">Use {'{username}'}, {'{amount}'}, etc. as placeholders</p>
                    </div>
                    <div>
                      <Label htmlFor={`duration-${alert.id}`} className="text-sm text-gray-400">
                        <div className="flex items-center">
                          <Timer className="h-4 w-4 mr-1" />
                          <span>Display Duration: {alert.duration}s</span>
                        </div>
                      </Label>
                      <Slider
                        id={`duration-${alert.id}`}
                        value={[alert.duration]}
                        min={1}
                        max={10}
                        step={1}
                        className="mt-3"
                        onValueChange={(values) => updateStreamAlert(alert.id, { duration: values[0] })}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id={`sound-${alert.id}`} 
                        checked={alert.sound} 
                        onCheckedChange={(checked) => updateStreamAlert(alert.id, { sound: checked })} 
                      />
                      <Label htmlFor={`sound-${alert.id}`} className="text-sm text-gray-300">
                        <div className="flex items-center">
                          <Volume2 className="h-4 w-4 mr-1" />
                          <span>Sound</span>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id={`visual-${alert.id}`} 
                        checked={alert.visual} 
                        onCheckedChange={(checked) => updateStreamAlert(alert.id, { visual: checked })} 
                      />
                      <Label htmlFor={`visual-${alert.id}`} className="text-sm text-gray-300">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          <span>Visual</span>
                        </div>
                      </Label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StreamAlerts;
