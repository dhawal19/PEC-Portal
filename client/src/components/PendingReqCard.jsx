import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser, selectToken } from '../features/auth/authSlice';
const PendingReqCard = ({ userName, userSID, userBio, userInterests }) => {
    const token = useSelector(selectToken);
    const handleAccept = async () => {
        try {
            const response = await axios.patch(`http://localhost:3000/connect/acceptRequest`, { SID: userSID }, {
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                console.log('Request Accepted:', response.data);
                // reload the page
                window.location.reload();
            }
        } catch (error) {
            console.error('Error accepting request:',  error.message);
        }
    };

    const handleDecline = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/connect/rejectRequest`, {
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${token}`,
                },
                data: { SID: userSID},
            },
            );
            if (response.status === 200) {
                console.log('Request Declined:', response.data);
                // reload the page
                window.location.reload();
            }
        } catch (error) {
            console.error('Error declining request:', error.response ? error.response.data : error.message);
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
                <button className="bg-red-300 hover:bg-red-500 text-white font-bold py-2 px-4 rounded mr-3"
                        onClick={handleDecline}
                >
                    Decline
                </button>
                <button
                    className="bg-green-300 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
                    onClick={handleAccept}
                >
                    Accept
                </button>
            </div>
        </div>
    );
};

export default PendingReqCard;