import React from 'react';
import UserProfile from "../components/UserProfile"
import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSlice';
export default function HomePage() {
    // const user = {
    //     picture: 'path/to/profile-picture.jpg',
    //     name: 'John Doe',
    //     email: 'john@example.com',
    //     bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    //     connections: 100,
    //     sid: '123456789',
    //     branch: 'Computer Science',
    // };
    const user = useSelector(selectUser);
    
    return (
        <UserProfile user={user} />
    )
}

