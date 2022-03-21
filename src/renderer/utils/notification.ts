/* eslint-disable no-console */
/* eslint-disable no-new */
export default {
  setup() {
    if (!('Notification' in window)) {
      console.error("This browser window doesn't support HTML5 Notification API");
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          // console.log('Permission has been granted');
        }
      });
    }
  },
  show({ title, body }: { title: string; body: string }) {
    new Notification(title, { body });
  },
};
