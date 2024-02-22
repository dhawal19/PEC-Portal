import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom';
import React from 'react';
// Import your components
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import LandingPage from './pages/LandingPage';
import { useSelector } from 'react-redux';
import { selectToken } from './features/auth/authSlice';
import { useVerify } from './hooks/useVerify';

// Define your routes
const App = () => {
  // const token = useSelector(selectToken);
  const verify = useVerify();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={verify ? <HomePage /> : <LoginForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;