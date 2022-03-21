import React, { useEffect } from 'react';

import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import * as api from './features/auth/api';
import { updateUser } from './features/auth/slices';
import { listenToNetworkConnectionChanges } from './features/network/actions';
import BaseLayout from './Layout/BaseLayout';
import DocumentsPage from './pages/DocumentsPage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import SettingPage from './pages/SettingPage';
import WelcomePage from './pages/WelcomePage';
import { useAppDispatch, useAppSelector } from './store';
import notification from './utils/notification';

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribeAuthStateChanges = api.onAuthStateChanges(async (user) => {
      const userProfile = user ? await api.getUserProfile(user.uid) : null;
      dispatch(updateUser(userProfile));
    });

    const unsubscribeNetworkConnectionChanges = dispatch(listenToNetworkConnectionChanges());
    notification.setup();

    return () => {
      unsubscribeAuthStateChanges();
      unsubscribeNetworkConnectionChanges();
    };
  }, [dispatch]);

  return (
    <HashRouter>
      <BaseLayout>
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/home' element={<AuthRoute component={HomePage} />} />
          <Route path='/docs' element={<AuthRoute component={DocumentsPage} />}>
            <Route path=':docId' element={<AuthRoute component={DocumentsPage} />} />
          </Route>
          <Route path='/search' element={<AuthRoute component={SearchPage} />} />
          <Route path='/setting' element={<AuthRoute component={SettingPage} />} />
        </Routes>
      </BaseLayout>
    </HashRouter>
  );
}

function AuthRoute({ component: RouteComponent }: { component: () => JSX.Element }) {
  const user = useAppSelector(({ auth }) => auth.user);
  return user ? <RouteComponent /> : <Navigate to='/' />;
}
