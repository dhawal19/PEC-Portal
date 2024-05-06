import { BrowserRouter, Route, Routes } from 'react-router-dom';
// Import your components
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginForm from './components/LoginForm';
import LandingPage from './pages/LandingPage';
import FeedbackPage from './pages/FeedbackPage';
import MessagePage from './pages/MessagePage';
import ConnectPage from './pages/ConnectPage';
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
          <Route path='/attendance' element={verify ? <AttendancePage /> : <LoginForm />} />
          <Route path='/feedback' element={verify ? <FeedbackPage /> : <LoginForm />} />
          <Route path='/messages' element={verify ? <MessagePage /> : <LoginForm />} />
          <Route path='/connect' element={verify ? <ConnectPage /> : <LoginForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;