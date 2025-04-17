
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  isElectronEnvironment, 
  getPlatformInfo, 
  initializeDesktopEnvironment, 
  registerTrayEvents 
} from '@/utils/desktopUtils';
import { toast } from '@/hooks/use-toast';

type DesktopContextType = {
  isDesktop: boolean;
  platform: string;
  version: {
    app: string;
    electron: string;
    chrome: string;
    node: string;
  };
  isInitialized: boolean;
};

const defaultContext: DesktopContextType = {
  isDesktop: false,
  platform: 'browser',
  version: {
    app: '1.0.0',
    electron: 'N/A',
    chrome: 'N/A',
    node: 'N/A'
  },
  isInitialized: false
};

const DesktopContext = createContext<DesktopContextType>(defaultContext);

export const useDesktop = () => useContext(DesktopContext);

export const DesktopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [platform, setPlatform] = useState('browser');
  const [version, setVersion] = useState(defaultContext.version);
  const isDesktop = isElectronEnvironment();

  useEffect(() => {
    // Initialize desktop environment
    if (isDesktop) {
      setPlatform(getPlatformInfo());
      
      // Get version information
      if (window.electron?.getVersion) {
        setVersion(window.electron.getVersion());
      }
      
      // Initialize desktop environment
      initializeDesktopEnvironment({
        onSuccess: () => {
          setIsInitialized(true);
          console.log('Desktop environment initialized successfully');
        },
        onError: (error) => {
          console.error('Failed to initialize desktop environment:', error);
          toast({
            title: 'Desktop Initialization Error',
            description: 'Failed to initialize desktop features. Some functionality may be limited.',
            variant: 'destructive'
          });
        }
      });
      
      // Register for system tray events
      registerTrayEvents({
        onStartStreaming: () => {
          toast({
            title: "Stream Started",
            description: "Stream started from system tray",
          });
        },
        onStopStreaming: () => {
          toast({
            title: "Stream Stopped",
            description: "Stream stopped from system tray",
          });
        }
      });
    }
  }, [isDesktop]);
  
  return (
    <DesktopContext.Provider 
      value={{ 
        isDesktop, 
        platform, 
        version,
        isInitialized
      }}
    >
      {children}
    </DesktopContext.Provider>
  );
};
