import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser, selectToken } from '../features/auth/authSlice';

const UserCard = ({ userName, userSID, userBio, userInterests }) => {
    const token = useSelector(selectToken);
    const handleConnect = async () => {
        try {
            const response = await axios.post('http://localhost:3000/connect/sendRequest', { SID:userSID }, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            if (response.statusCode === 200) {
                alert("Connection request sent!");
            }
        } catch (error) {
            console.error('Error sending connection request:', error);
            if(error.response.status === 403) {
                alert("Request already sent.");
            }
            else if(error.response.status === 404) {
                alert("User not found.");
            }
            else {
                alert("Failed to send connection request.");
            }
        }
    };
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-200">
            {/* <img className="w-full" src={profileImage} alt="User Profile" /> */}
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-center">{userName}</div>
                <div className="text-gray-700 text-base mb-2">SID: {userSID}</div>
                <p className="text-gray-700 text-base">{userBio}</p>
            </div>
            <div className="px-6 py-4">
                <span className="inline-block bg-gray-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    Interests
                </span>
                {userInterests && userInterests.length > 0 && userInterests.map((interest, index) => (
                    <span key={index} className="inline-block bg-gray-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {interest}
                    </span>
                ))}
            </div>
            <div className="px-6 py-4">
                <button onClick={handleConnect} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Connect
                </button>
            </div>
        </div>
    );
};

export default UserCard;
