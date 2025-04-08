
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface EpilepsySafeModeContextType {
  epilepsySafeMode: boolean;
  toggleEpilepsySafeMode: () => void;
  EpilepsySafeModeToggle: React.FC;
}

const EpilepsySafeModeContext = createContext<EpilepsySafeModeContextType | undefined>(undefined);

export const EpilepsySafeModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [epilepsySafeMode, setEpilepsySafeMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('metastream-epilepsy-safe-mode');
    return savedMode === 'true';
  });

  useEffect(() => {
    if (epilepsySafeMode) {
      document.documentElement.classList.add('epilepsy-safe');
    } else {
      document.documentElement.classList.remove('epilepsy-safe');
    }
    localStorage.setItem('metastream-epilepsy-safe-mode', epilepsySafeMode.toString());
  }, [epilepsySafeMode]);

  const toggleEpilepsySafeMode = () => {
    setEpilepsySafeMode(prev => {
      const newValue = !prev;
      if (newValue) {
        toast({
          title: "Epilepsy Safe Mode Enabled",
          description: "Animations and flashing effects have been reduced for a safer viewing experience.",
        });
      }
      return newValue;
    });
  };

  const EpilepsySafeModeToggle: React.FC = () => (
    <div className="flex items-center space-x-2">
      <Eye className="h-4 w-4 text-meta-teal" />
      <Switch 
        checked={epilepsySafeMode}
        onCheckedChange={toggleEpilepsySafeMode}
      />
      <span className="text-xs text-gray-400">Epilepsy Safe</span>
    </div>
  );

  return (
    <EpilepsySafeModeContext.Provider value={{ epilepsySafeMode, toggleEpilepsySafeMode, EpilepsySafeModeToggle }}>
      {children}
    </EpilepsySafeModeContext.Provider>
  );
};

export const useEpilepsySafeMode = (): EpilepsySafeModeContextType => {
  const context = useContext(EpilepsySafeModeContext);
  if (!context) {
    throw new Error('useEpilepsySafeMode must be used within an EpilepsySafeModeProvider');
  }
  return context;
};
