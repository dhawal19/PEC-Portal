// UserProfileSidebar.js

import React from 'react';

const UserProfile = ({ user }) => {
    return (
        <div className="bg-gray-800 p-4 w-1/5 h-full fixed top-0 left-0 overflow-y-auto">
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
            <div className="mb-4 p-2">
                <p className="text-sm font-semibold mb-1 text-slate-400">SID:</p>
                <p className="text-sm text-slate-300">{user.sid}</p>
            </div>
            <div className="mb-4 p-2">
                <p className="text-sm font-semibold mb-1 text-slate-400">Branch:</p>
                <p className="text-sm text-slate-300">{user.branch}</p>
            </div>
        </div>
    );
};

export default UserProfile;
