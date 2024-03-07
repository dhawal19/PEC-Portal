import { BrowserRouter, Route, Routes } from 'react-router-dom';
// Import your components
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginForm from './components/LoginForm';
import LandingPage from './pages/LandingPage';
import { useVerify } from './hooks/useVerify';
import AttendancePage from './pages/AttendancePage';

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
          <Route path='/attendance' element={<AttendancePage />} />
          <Route path='/messages' element={<AttendancePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;