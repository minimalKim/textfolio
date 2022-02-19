import React from 'react';

import { Link, HashRouter, Route, Routes } from 'react-router-dom';

import DocumentsPage from './pages/DocumentsPage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import WelcomePage from './pages/WelcomePage';

export default function App() {
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
