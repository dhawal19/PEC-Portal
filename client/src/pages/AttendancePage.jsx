import UserProfile from "../components/UserProfile"
import { useSelector } from 'react-redux';
import { selectToken, selectUser } from '../features/auth/authSlice';
import { useVerify } from "../hooks/useVerify";
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import AttendanceCard from '../components/AttendanceCard';

export default function AttendancePage({ courses }) {
    const user = useSelector(selectUser);
    const [cards, setCards] = useState([]);

    const handleAddCard = (subject, courseCode) => {
        const newCard = { id: cards.length + 1, subject, courseCode };
        setCards([...cards, newCard]);
    }
    return (
        <div className='flex h-screen'>
            <div className='w-1/5 h-full'>
                <UserProfile user={user} />
            </div>
            <div className='w-4/5 bg-slate-950 h-full'>
                <div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow"
                        onClick={() => handleAddCard('New Subject', 'NEW101')} // Default values for subject and course code
                    >
                        +
                    </button>
                    <div className="mt-4">
                        {cards.map(card => (
                            <AttendanceCard key={card.id} subject={card.subject} courseCode={card.courseCode} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

