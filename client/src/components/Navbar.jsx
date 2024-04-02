import React from 'react';

const Navbar = ({ title }) => {
    return (
        <nav className="bg-gray-800 text-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-7">
                        <div>
                            <a href="#" className="flex items-center py-4 px-2">
                                <span className="font-semibold text-lg">{title}</span>
                            </a>
                        </div>
                        {/* Primary Navbar items */}
                        <div className="hidden md:flex items-center space-x-1">
                            {/* Updated classes for Home. Now it will also get underline on hover like others */}
                            <a href="#" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 hover:border-green-500 border-b-4 border-transparent hover:border-b-4 transition duration-300">Home</a>
                            <a href="#" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 hover:border-green-500 border-b-4 border-transparent hover:border-b-4 transition duration-300">Connect</a>
                            <a href="#" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 hover:border-green-500 border-b-4 border-transparent hover:border-b-4 transition duration-300">Feedback</a>
                            <a href="#" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 hover:border-green-500 border-b-4 border-transparent hover:border-b-4 transition duration-300">Attendance</a>
                        </div>
                    </div>
                    {/* Secondary Navbar Items */}
                    <div className="hidden md:flex items-center space-x-3 ">
                        <a href="#" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-gray-700 hover:text-white transition duration-300">Logout</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
