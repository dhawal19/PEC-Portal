import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser, selectToken } from '../features/auth/authSlice';

const FriendsCard = ({ userName, userSID, userBio, userInterests, branch }) => {
    const token = useSelector(selectToken);
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-200">
            {/* <img className="w-full" src={profileImage} alt="User Profile" /> */}
            <div className="px-6 py-2">
                <div className="font-bold text-xl mb-2 text-center">{userName}</div>
                <div className="text-gray-700 text-base mb-2">SID: {userSID}</div>
                <div className="text-gray-700 text-base mb-2">Branch: {branch}</div>
                <p className="text-gray-700 text-base">{userBio}</p>
            </div>
            <div className="px-6 py-2">
                <span className="inline-block bg-gray-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    Interests
                </span>
                {userInterests && userInterests.length > 0 && userInterests.map((interest, index) => (
                    <span key={index} className="inline-block bg-gray-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {interest}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default FriendsCard;
