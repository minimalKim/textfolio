import { AnyAction, Dispatch } from '@reduxjs/toolkit';

import { updateNetworkConnection } from './slices';

export const listenToNetworkConnectionChanges = () => (dispatch: Dispatch<AnyAction>) => {
  const connectionHandler = () => {
    const isOnline = navigator.onLine;
    dispatch(updateNetworkConnection(isOnline));
  };

  window.addEventListener('online', connectionHandler);
  window.addEventListener('offline', connectionHandler);

  return () => {
    window.removeEventListener('online', connectionHandler);
    window.removeEventListener('offline', connectionHandler);
  };
};
