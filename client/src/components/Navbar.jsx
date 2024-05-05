import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setUser, setToken } from "../features/auth/authSlice";

const Navbar = ({ title }) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const naviagate = useNavigate();
    const handleLogout = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:3000/logout', {}, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }
            );
            setIsLoading(false);
            if (response.status !== 200) {
                const errorMessage = `An error has occured: ${response.status}`;
                throw new Error(errorMessage || 'Failed to logout');
            }
            dispatch(setUser({}));
            dispatch(setToken(null));
            naviagate('/');
        }
        catch (error) {
            throw new Error('Failed to logout: ' + error.message);
        }
    }
    return (
        <nav className="bg-gray-800 text-white shadow-lg">
            <div className="max-w-6xl px-3">
                <div className="flex justify-between items-center">
                    {/* Left section */}
                    <div className="flex items-center space-x-3">
                        <div>
                            <a href="#" className="flex items-center py-4 px-2">
                                <span className="font-semibold text-lg">{title}</span>
                            </a>
                        </div>
                        {/* Primary Navbar items */}
                        <div className="hidden md:flex items-center space-x-1">
                            {/* Updated classes for Home. Now it will also get underline on hover like others */}
                            <a href="/home" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 hover:border-green-500 border-b-4 border-transparent hover:border-b-4 transition duration-300">Home</a>
                            <a href="/Connect" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 hover:border-green-500 border-b-4 border-transparent hover:border-b-4 transition duration-300">Connect</a>
                            <a href="/feedback" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 hover:border-green-500 border-b-4 border-transparent hover:border-b-4 transition duration-300">Feedback</a>
                            <a href="/attendance" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 hover:border-green-500 border-b-4 border-transparent hover:border-b-4 transition duration-300">Attendance</a>
                        </div>
                    </div>
                    {/* Right section */}
                    <div>
                        <button
                            className=" hover:bg-red-400 hover:text-white text-gray-500 py-2 px-3 rounded-3xl w-full focus:outline-none hover:scale-105 duration-300  focus:shadow-outline"
                            type="submit"
                            id="logout-button"
                            onClick={() => handleLogout()}
                        >LogOut
                        </button>
                    </div>
                </div>
            </div>
        </nav>

    );
};

export default Navbar;
