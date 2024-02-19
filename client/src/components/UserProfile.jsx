// UserProfileSidebar.js

import React from 'react';

const UserProfile = ({ user }) => {
    return (
        <div className="bg-slate-950 p-4 w-1/5 h-full fixed top-0 left-0 overflow-y-auto">
            <div className="flex items-center mb-4">
                <img src={user.picture} alt="Profile" className="w-12 h-12 rounded-full mr-2" />
            </div>
            <div>
                <h2 className="text-lg font-semibold text-slate-300">{user.name}</h2>
                <p className="text-sm  text-slate-300">{user.email}</p>
            </div>
            <p className="text-sm text-slate-300 mb-2">{user.bio}</p>
            <div className="mb-4">
                <p className="text-sm font-semibold mb-1 text-slate-400">Number of Connections:</p>
                <p className="text-sm text-slate-300">{user.connections}</p>
            </div>
            <div className="mb-4">
                <p className="text-sm font-semibold mb-1 text-slate-400">SID:</p>
                <p className="text-sm text-slate-300">{user.sid}</p>
            </div>
            <div className="mb-4">
                <p className="text-sm font-semibold mb-1 text-slate-400">Branch:</p>
                <p className="text-sm text-slate-300">{user.branch}</p>
            </div>
        </div>
    );
};

export default UserProfile;
