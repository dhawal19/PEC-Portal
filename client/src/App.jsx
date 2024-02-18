import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom';
import React from 'react';
// Import your components
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import Form from './components/Form';
import LandingPage from './pages/LandingPage';

// Define your routes
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path='/login' element={<Form type='login' />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/register' element={<Form type='register' />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;