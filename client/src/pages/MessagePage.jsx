import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';

const MessagePage = () => {
    const [selectedUser, setSelectedUser] = useState(null); // State to track the selected user ID
    // Variable to store the selected user object
    const users = [
        {
            _id: "65d7356ff8ff0749cf963602",
            name: "abc"
        },
        {
            _id: "660e7ac6094c0ab5e10e5ec4",
            name: "Chirag Garg"
        },
        {
            _id: "65d39690603e9fa6832b104b",
            name: "Dhawal Arora"
        }
    ]

    useEffect(() => {
        // Fetch users from the server
        
    }, []);


    const handleUserClick = (user) => {
        // Find the selected user object
        // console.log(user);
        setSelectedUser(user);
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Navbar at the top */}
            <Navbar title="Messages" />
            {/* Main content area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar on the left */}
                <div className="w-1/5">
                    <Sidebar users={users} onUserClick={handleUserClick} />
                </div>
                {/* Chat on the right */}
                <div className="w-4/5 flex flex-col">
                    <Chat selectedUser={selectedUser} />
                </div>
            </div>
        </div>
    );
};

export default MessagePage;
