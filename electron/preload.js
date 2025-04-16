
const { contextBridge, ipcRenderer } = require('electron');
const os = require('os');
const { exec } = require('child_process');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'electron', {
    openFileDialog: (options) => ipcRenderer.invoke('open-file-dialog', options),
    saveFileDialog: (options) => ipcRenderer.invoke('save-file-dialog', options),
    getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
    onStartStreaming: (callback) => ipcRenderer.on('start-streaming', callback),
    onStopStreaming: (callback) => ipcRenderer.on('stop-streaming', callback),
    platform: process.platform,
    getMediaDevices: async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        return devices.map(device => ({
          deviceId: device.deviceId,
          kind: device.kind,
          label: device.label,
          groupId: device.groupId
        }));
      } catch (error) {
        console.error('Error getting media devices:', error);
        return [];
      }
    },
    getScreenSources: async () => {
      if (process.platform === 'win32' || process.platform === 'darwin') {
        // For Windows and macOS, we'll use Electron's built-in functionality
        return [];
      } else {
        // For Linux, we might need a different approach
        return [];
      }
    },
    getVersion: () => {
      return {
        node: process.versions.node,
        chrome: process.versions.chrome,
        electron: process.versions.electron,
        app: '1.0.0' // This should be dynamically pulled from package.json
      };
    }
  }
);

// Add system information to window
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
  
  // Add platform-specific class to body
  document.body.classList.add(`platform-${process.platform}`);
});
