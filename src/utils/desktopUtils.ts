
/**
 * Desktop environment utilities for MetaStream
 * Provides helper functions for Electron-specific functionality
 */

// Check if running in Electron environment
export const isElectronEnvironment = (): boolean => {
  return window.electron !== undefined;
};

// Get platform information
export const getPlatformInfo = (): string => {
  if (isElectronEnvironment()) {
    return window.electron?.platform || 'unknown';
  }
  return 'browser';
};

// Handle platform-specific paths
export const getAppDataPath = (): string => {
  if (isElectronEnvironment()) {
    // In a real implementation, this would use electron's app.getPath API
    // Currently stub implementation for compatibility
    return 'app-data';
  }
  return '';
};

// Get system information
export const getSystemInfo = async (): Promise<any> => {
  if (isElectronEnvironment()) {
    return await window.electron?.getSystemInfo();
  }
  return {
    platform: navigator.platform,
    cpus: [{model: 'Browser Environment', speed: 0}],
    totalMemory: 8000000000,
    freeMemory: 4000000000
  };
};

// Format memory sizes
export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// Register for system tray events
export const registerTrayEvents = (callbacks: {
  onStartStreaming?: () => void;
  onStopStreaming?: () => void;
}) => {
  if (isElectronEnvironment()) {
    if (callbacks.onStartStreaming) {
      window.electron?.onStartStreaming(callbacks.onStartStreaming);
    }
    
    if (callbacks.onStopStreaming) {
      window.electron?.onStopStreaming(callbacks.onStopStreaming);
    }
  }
};

// Function to handle desktop window management
export const handleWindowControls = () => {
  // This would handle desktop window controls like minimize, maximize, close
  // For now, it's a stub implementation
  console.log('Window controls handled in desktop environment');
};

// Initialize desktop environment
export const initializeDesktopEnvironment = (
  callbacks: {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
  } = {}
) => {
  try {
    if (isElectronEnvironment()) {
      // Log platform information
      console.log(`Initializing desktop environment on ${getPlatformInfo()}`);
      
      // Add platform-specific classes to document body
      document.body.classList.add(`platform-${getPlatformInfo()}`);
      
      if (callbacks.onSuccess) {
        callbacks.onSuccess();
      }
      
      return true;
    }
  } catch (error) {
    console.error('Failed to initialize desktop environment:', error);
    if (callbacks.onError && error instanceof Error) {
      callbacks.onError(error);
    }
  }
  
  return false;
};
