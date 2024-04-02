import React from 'react';

const UserCard = ({ userName, userSID, userBio, userInterests }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            {/* <img className="w-full" src={profileImage} alt="User Profile" /> */}
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{userName}</div>
                <div className="text-gray-700 text-base mb-2">SID: {userSID}</div>
                <p className="text-gray-700 text-base">{userBio}</p>
            </div>
            <div className="px-6 py-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    Interests
                </span>
                {userInterests.map((interest, index) => (
                    <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {interest}
                    </span>
                ))}
            </div>
            <div className="px-6 py-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Connect
                </button>
            </div>
        </div>
    );
};

export default UserCard;
