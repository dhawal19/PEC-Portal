import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { useSelector } from 'react-redux';
import RegisterForm from "../components/RegisterForm";

const LandingPage = () => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const formType = useSelector(state => state.loginForm.type);

    const handleGetStartedClick = () => {
        setShowLoginForm(true);
    };

    return (
        <div className="relative min-h-screen bg-black text-white flex justify-center items-center">
            {/* Overlay for Form */}
            {showLoginForm && (
                <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center">
                    <div className="p-8 rounded-lg z-20">
                        {formType === "login" && <LoginForm />}
                        {formType === "register" && <RegisterForm />}
                    </div>
                </div>
            )}

            {/* Main Content - Blurred when Form is Active */}
            <div className={`flex flex-col items-center justify-center w-full ${showLoginForm ? 'blur-sm' : ''} transition duration-300 ease-in-out`}>
                <h1 className="text-8xl font-semibold mb-8 font-anta">Welcome to PEC-Connect</h1>
                <p className="text-xl text-center mb-8 font-semibold mt-4 font-anta">
                    This is a portal for college students to connect with their fellow classmates and to get information about courses. Click on the get started button to continue.
                </p>
                <button onClick={handleGetStartedClick} className="font-anta bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transform hover:scale-105 transition duration-150 ease-in-out mt-2">
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default LandingPage;