import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom';
import React from 'react';

// Import your components
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

// Define your routes
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;