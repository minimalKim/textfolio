const path = require('path');

const { app, BrowserWindow, ipcMain, Notification: ElectronNotification } = require('electron');

const isDev = !app.isPackaged;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('./build/index.html');
  // eslint-disable-next-line no-unused-expressions
  isDev && win.webContents.openDevTools();
};

const showNotification = (message: string) =>
  new ElectronNotification({ title: 'Notification', body: message }).show();

app.whenReady().then(() => {
  ipcMain.on('notify', (_: Event, message: string) => showNotification(message));
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
