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
          <Route path='/attendance' element={<AttendancePage />} />
          <Route path='/feedback' element={<FeedbackPage />} />
          <Route path='/messages' element={<MessagePage />} />
          <Route path='/connect' element={<ConnectPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;