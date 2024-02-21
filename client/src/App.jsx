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

// Define your routes
const App = () => {
  const token = useSelector(selectToken);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={token ? <HomePage /> : <LoginForm />} />
          {/* <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} /> */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;