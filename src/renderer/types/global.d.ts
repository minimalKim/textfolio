export {};
declare global {
  interface Window {
    electronAPI: {
      notificationAPI: {
        sendNotification: (message: string) => void;
      };
    };
  }
}
