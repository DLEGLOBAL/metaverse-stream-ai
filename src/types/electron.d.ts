
interface ElectronAPI {
  openFileDialog: (options: any) => Promise<string | null>;
  saveFileDialog: (options: any) => Promise<string | null>;
  getSystemInfo: () => Promise<any>;
  onStartStreaming: (callback: any) => void;
  onStopStreaming: (callback: any) => void;
  platform: string;
  getMediaDevices: () => Promise<any[]>;
  getScreenSources: () => Promise<any[]>;
  getVersion: () => {
    node: string;
    chrome: string;
    electron: string;
    app: string;
  };
}

interface Window {
  electron?: ElectronAPI;
}
