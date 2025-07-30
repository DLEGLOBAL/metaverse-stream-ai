const { app, BrowserWindow, ipcMain, dialog, Menu, Tray, shell } = require('electron');
const path = require('path');
const url = require('url');
const os = require('os');
const fs = require('fs');
const { startRelayServer } = require('./relay-server');

// Keep a global reference of the window object to avoid garbage collection
let mainWindow;
let tray = null;
let isQuitting = false;
let relayServer = null;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1024,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: true,
      preload: path.join(__dirname, 'preload.js')
    },
    backgroundColor: '#121212',
    icon: path.join(__dirname, '../public/favicon.ico'),
    show: false, // Don't show the window until it's ready
    frame: true,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#121212',
      symbolColor: '#74febd',
      height: 40
    }
  });

  // Load the built app
  mainWindow.loadURL(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8080'
      : url.format({
          pathname: path.join(__dirname, '../dist/index.html'),
          protocol: 'file:',
          slashes: true
        })
  );

  // Show window when it's ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // Handle window being closed
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
  
  // Handle close event
  mainWindow.on('close', (e) => {
    if (!isQuitting) {
      e.preventDefault();
      mainWindow.hide();
      return false;
    }
  });
  
  // Create system tray
  createTray();
  
  // Set up IPC handlers
  setupIpcHandlers();
}

function createTray() {
  tray = new Tray(path.join(__dirname, '../public/favicon.ico'));
  const contextMenu = Menu.buildFromTemplate([
    { 
      label: 'Open MetaStream', 
      click: () => { 
        if (mainWindow) {
          mainWindow.show();
        }
      } 
    },
    { 
      label: 'Start Streaming',
      click: () => {
        if (mainWindow) {
          mainWindow.webContents.send('start-streaming');
        }
      }
    },
    { 
      label: 'Stop Streaming',
      click: () => {
        if (mainWindow) {
          mainWindow.webContents.send('stop-streaming');
        }
      }
    },
    { type: 'separator' },
    { 
      label: 'Quit', 
      click: () => {
        isQuitting = true;
        app.quit();
      } 
    }
  ]);
  
  tray.setToolTip('MetaStream Desktop');
  tray.setContextMenu(contextMenu);
  
  tray.on('click', () => {
    if (mainWindow) {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    }
  });
}

function setupIpcHandlers() {
  // Handle opening file browser
  ipcMain.handle('open-file-dialog', async (event, options) => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, options);
    if (canceled) {
      return null;
    } else {
      return filePaths[0];
    }
  });
  
  // Handle saving files
  ipcMain.handle('save-file-dialog', async (event, options) => {
    const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, options);
    if (canceled) {
      return null;
    } else {
      return filePath;
    }
  });
  
  // Handle system info requests
  ipcMain.handle('get-system-info', () => {
    return {
      platform: os.platform(),
      release: os.release(),
      arch: os.arch(),
      cpus: os.cpus(),
      totalMemory: os.totalmem(),
      freeMemory: os.freemem()
    };
  });
}

// Create window when Electron app is ready
app.on('ready', () => {
  // Start the relay server
  try {
    relayServer = startRelayServer(3000);
    console.log('Relay server started successfully');
  } catch (error) {
    console.error('Failed to start relay server:', error);
  }
  
  createWindow();
});

// Quit when all windows are closed
app.on('window-all-closed', function () {
  // On macOS applications keep their menu bar active until Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open
  if (mainWindow === null) createWindow();
});

// Set app to quit completely when quitting is triggered
app.on('before-quit', () => {
  isQuitting = true;
});
