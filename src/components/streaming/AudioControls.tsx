
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Mic, Volume2 } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

const AudioControls = () => {
  const { audioSettings, updateAudioSettings } = useAppContext();
  
  const handleVolumeChange = (values: number[]) => {
    updateAudioSettings({ volume: values[0] });
  };
  
  const handleNoiseSuppressionToggle = () => {
    updateAudioSettings({ noiseSuppression: !audioSettings.noiseSuppression });
  };
  
  const handleEchoCancellationToggle = () => {
    updateAudioSettings({ echoCancellation: !audioSettings.echoCancellation });
  };
  
  const handleAutoGainControlToggle = () => {
    updateAudioSettings({ autoGainControl: !audioSettings.autoGainControl });
  };
  
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center">
          <Mic className="h-5 w-5 mr-2 text-meta-teal" />
          Audio Controls
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-300">Volume</span>
              <span className="text-sm text-meta-teal">{audioSettings.volume}%</span>
            </div>
            <div className="flex items-center">
              <Volume2 className="h-4 w-4 text-gray-400 mr-2" />
              <Slider
                value={[audioSettings.volume]}
                max={100}
                step={1}
                className="flex-1"
                onValueChange={handleVolumeChange}
              />
            </div>
          </div>
          
          <div className="pt-2 border-t border-gray-700">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300">Noise Suppression</p>
                  <p className="text-xs text-gray-500">Reduce background noise</p>
                </div>
                <Switch
                  checked={audioSettings.noiseSuppression}
                  onCheckedChange={handleNoiseSuppressionToggle}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300">Echo Cancellation</p>
                  <p className="text-xs text-gray-500">Prevent audio feedback</p>
                </div>
                <Switch
                  checked={audioSettings.echoCancellation}
                  onCheckedChange={handleEchoCancellationToggle}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300">Auto Gain Control</p>
                  <p className="text-xs text-gray-500">Automatically adjust volume</p>
                </div>
                <Switch
                  checked={audioSettings.autoGainControl}
                  onCheckedChange={handleAutoGainControlToggle}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioControls;
