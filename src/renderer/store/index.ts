import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import authReducer from '../features/auth/slices';
import docsReducer from '../features/docs/slices';
import networkMiddleware from '../features/network/middleware';
import networkReducer from '../features/network/slices';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    docs: docsReducer,
    network: networkReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(networkMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
