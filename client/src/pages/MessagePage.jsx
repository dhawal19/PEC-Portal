import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';

const MessagePage = () => {
    const [selectedUserId, setSelectedUserId] = useState(null); // State to track the selected user ID

    const users = [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
        { id: 3, name: 'User 3' },
        // Add more users as needed
    ];

    const handleUserClick = (userId) => {
        setSelectedUserId(userId); // Update the selected user ID when a user is clicked
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Navbar at the top */}
            <Navbar title="My Chat App" />
            {/* Main content area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar on the left */}
                <div className="w-1/5">
                    <Sidebar users={users} onUserClick={handleUserClick} />
                </div>
                {/* Chat on the right */}
                <div className="w-4/5 flex flex-col">
                    <Chat selectedUserId={selectedUserId} />
                </div>
            </div>
        </div>
    );
};

export default MessagePage;
