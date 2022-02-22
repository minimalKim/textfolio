import React, { useEffect } from 'react';

import { Link, HashRouter, Route, Routes } from 'react-router-dom';

import * as api from './features/auth/api';
import { updateUser } from './features/auth/slices';
import DocumentsPage from './pages/DocumentsPage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import WelcomePage from './pages/WelcomePage';
import { useAppDispatch } from './store';

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribeAuthStateChanges = api.onAuthStateChanges(async (user) => {
      const userProfile = user ? await api.getUserProfile(user.uid) : null;
      dispatch(updateUser(userProfile));
    });

    return () => {
      unsubscribeAuthStateChanges();
    };
  }, [dispatch]);

  return (
    <HashRouter>
      <nav>
        <Link to='/'>welcome</Link>
        <Link to='/home'>home</Link>
        <Link to='/docs'>docs</Link>
        <Link to='/search'>search</Link>
      </nav>
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/docs' element={<DocumentsPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/search' element={<SearchPage />} />
      </Routes>
    </HashRouter>
  );
}
