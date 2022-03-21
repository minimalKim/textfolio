const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  notificationAPI: {
    sendNotification(message: string) {
      ipcRenderer.send('notify', message);
    },
  },
});
