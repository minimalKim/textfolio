import notification from '../../utils/notification';

const networkMiddleware = () => (next: any) => (action: any) => {
  if (action.type === 'network/updateNetworkConnection') {
    const isOnline = action.payload;

    // Electron - notification API
    // window.electronAPI.notificationAPI.sendNotification(isOnline ? 'Online' : 'Offline');

    //  HTML5 Notification API
    notification.show({ title: 'Connection status: ', body: isOnline ? 'Online' : 'Offline' });
  }
  next(action);
};

export default networkMiddleware;
