
import { AudioSettings } from './types';
import { toast } from '@/hooks/use-toast';

export const updateAudioSettings = (
  currentSettings: AudioSettings,
  setAudioSettings: (settings: AudioSettings) => void,
  newSettings: Partial<AudioSettings>
) => {
  const updatedSettings = { ...currentSettings, ...newSettings };
  setAudioSettings(updatedSettings);
  
  toast({
    title: 'Audio Settings Updated',
    description: 'Your audio settings have been updated',
  });
  
  return updatedSettings;
};
