import {useRef, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import axios from 'axios';
import { selectToken } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';
const MessagePage = () => {
    const [selectedUser, setSelectedUser] = useState(null); // State to track the selected user ID
    const token = useSelector(selectToken); 
    // Variable to store the selected user object
    let users = useRef([]);

    useEffect(() => {
        // Fetch users from the server
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/connect/getFriends', {
                    withCredentials: true,
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    users.current = response.data;
                }
                } catch (error) {
                    console.error("Error fetching users:", error.message);
                }

        }
        fetchUsers();
    }, [token]);


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
                    <Sidebar users={users.current} onUserClick={handleUserClick} />
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
