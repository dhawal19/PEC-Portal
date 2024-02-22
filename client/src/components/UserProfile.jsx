// UserProfileSidebar.js
import { useDispatch } from 'react-redux';
import { setUser, setToken } from "../features/auth/authSlice";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const UserProfile = ({ user }) => {
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
        naviagate('/');                     
    }
    catch (error) {
        throw new Error('Failed to logout: ' + error.message);
    }
}
   


    return (
        <div className="bg-black p-4 w-1/5 h-full fixed top-0 left-0 overflow-y-auto">
            <div className="flex items-center justify-center mb-4">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTazqf7Ow72BkH5xm0t8vfXx-OPgNBYqjYYKQ&usqp=CAU" alt="Profile" className="w-20 h-20" />
            </div>
            <div className='mt-5 p-2'>
                <h2 className="text-lg font-semibold text-slate-300">{user.name}</h2>
                <p className="text-sm  text-slate-300 mt-2">{user.email}</p>
            </div>
            <p className="text-sm text-slate-300 mb-2 mt-3 p-2">{user.bio}</p>
            <div className="mb-4 p-2 mt-3">
                <p className="text-sm font-semibold mb-1 text-slate-400">Number of Connections:</p>
                <p className="text-sm text-slate-300">{user.connections}</p>
            </div>
            <div className="mb-4">
                <p className="text-sm font-semibold mb-1">SID:</p>
                <p className="text-sm text-gray-600">{user.SID}</p>
            </div>
            <div className="mb-4 p-2">
                <p className="text-sm font-semibold mb-1 text-slate-400">Branch:</p>
                <p className="text-sm text-slate-300">{user.branch}</p>
            </div>
            <div className="flex justify-center">
                <button
                    className="bg-blue-500 hover:bg-green-700 text-white py-2 px-3 rounded-3xl w-full focus:outline-none hover:scale-105 duration-300  focus:shadow-outline"
                    type="submit"
                    id="logout-button"
                    onClick={() => handleLogout()}
                >
                    {isLoading ? 'Logging out...' : 'Logout'}
                </button>
            </div>
        </div>
    );
};


export default UserProfile;
