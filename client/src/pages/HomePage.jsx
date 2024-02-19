import React from 'react';
import UserProfile from "../components/UserProfile"
import HomeCard from "../components/HomeCard"
export default function HomePage() {
    const user = {
        picture: 'path/to/profile-picture.jpg',
        name: 'John Doe',
        email: 'john@example.com',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        connections: 100,
        sid: '123456789',
        branch: 'Computer Science',
    };
    return (
        <div className='flex h-screen'>
            <div className='w-1/5 h-full'>
                <UserProfile user={user} />
            </div>
            <div className='w-4/5 bg-slate-900 h-full'>
                <h1 className="mt-20 text-center font-semibold text-6xl text-slate-300">Hello, Welcome User</h1>
                <HomeCard />
            </div>
        </div>
    )
}

