
import { updateAudioSettings as updateAudioSettingsUtil } from '../audioUtils';
import { AudioSettings } from '../types';

type UseAudioHandlersProps = {
  audioSettings: AudioSettings;
  setAudioSettings: (settings: AudioSettings) => void;
};

export const useAudioHandlers = ({ 
  audioSettings, 
  setAudioSettings 
}: UseAudioHandlersProps) => {
  const updateAudioSettings = (settings: Partial<AudioSettings>) => {
    updateAudioSettingsUtil(audioSettings, setAudioSettings, settings);
  };

  return { updateAudioSettings };
};
