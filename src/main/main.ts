const path = require('path');

const { app, BrowserWindow } = require('electron');

const isDev = !app.isPackaged;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('./build/index.html');
  // eslint-disable-next-line no-unused-expressions
  isDev && win.webContents.openDevTools();
};

// if (isDev) {
//   require('electron-reload')(__dirname, {
//     electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron'),
//   });
// }

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
