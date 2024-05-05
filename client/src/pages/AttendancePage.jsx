import React, { useState, useEffect } from 'react';
import UserProfile from "../components/UserProfile";
import { useSelector } from 'react-redux';
import { selectUser, selectToken } from '../features/auth/authSlice';
import axios from 'axios';

export default function AttendancePage({ courses }) {
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        courseName: '',
        courseCode: ''
    });
    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function fetchAttendance() {
            try {
                const response = await axios.get('http://localhost:3000/attendance/getUserAttendance', {
                    withCredentials: true,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'authorization': `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    const { attendance } = response.data;
                    setCards(attendance);
                } else {
                    throw new Error('Failed to fetch data');
                }
                console.log(response);
            } catch (error) {
                console.error('Error fetching attendance:', error);
            }
        }

        fetchAttendance();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { courseName, courseCode } = formData;
        if (courseName && courseCode) {
            const newCard = { courseName, courseCode, percentage: { present: 0, total: 0 } };
            setCards(prevCards => {
                if (Array.isArray(prevCards)) {
                    return [...prevCards, newCard];
                } else {
                    return [newCard];
                }
            });
            setFormData({ courseName: '', courseCode: '' });
            setShowForm(false);
        } else {
            alert('Please fill in all required fields.');
        }
    };


    const handleMarkAttendance = (index, present) => {
        const updatedCards = cards.map((card, i) => {
            if (i === index) {
                const newPresent = present ? card.percentage.present + 1 : card.percentage.present;
                const newTotal = card.percentage.total + 1;
                return { ...card, percentage: { ...card.percentage, present: newPresent, total: newTotal } };
            }
            return card;
        });
        setCards(updatedCards);
    };


    return (
        <div className='flex h-screen'>
            <div className='w-1/5 h-full'>
                <UserProfile user={user} />
            </div>
            <div className='w-4/5 bg-slate-950 h-full'>
                <div className='p-8'>
                    <div className='mb-8'>
                        <h1 className='text-4xl font-bold text-center text-white'>Attendance</h1>
                    </div>
                    <button
                        className='bg-blue-500 text-white py-3 px-6 rounded-full absolute bottom-8 right-8 shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        onClick={() => setShowForm(!showForm)}
                    >
                        +
                    </button>
                    <div className={`absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 ${showForm ? 'z-10' : 'hidden'}`}>
                        <div className='bg-white p-8 rounded-lg shadow-lg'>
                            <h2 className='text-xl font-semibold mb-4 text-black'>Add New Course</h2>
                            <form onSubmit={handleSubmit} className='space-y-4'>
                                <div>
                                    <input
                                        type='text'
                                        name='courseName'
                                        value={formData.courseName}
                                        onChange={handleChange}
                                        placeholder='Subject Name'
                                        className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black'
                                    />
                                </div>
                                <div>
                                    <input
                                        type='text'
                                        name='courseCode'
                                        value={formData.courseCode}
                                        onChange={handleChange}
                                        placeholder='Course Code'
                                        className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black'
                                    />
                                </div>
                                <button
                                    type='submit'
                                    className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-wrap mx-6">
                        {cards && cards.map((card, index) => (
                            <div key={index} className='bg-white text-gray-800 p-4 rounded-md shadow-md mb-4 mr-4 w-80'>
                                <h2 className='text-lg font-semibold mb-2'>{card.courseName}</h2>
                                <p className='text-gray-600 mb-2'>Course Code: {card.courseCode}</p>
                                {card.percentage && (
                                    <div>
                                        <p className='text-gray-700'>Attendance: {card.percentage.present} / {card.percentage.total}</p>
                                        <p className='text-gray-700'>Percentage: {card.percentage.total !== 0 ? ((card.percentage.present / card.percentage.total) * 100).toFixed(2) : 0}%</p>
                                    </div>
                                )}
                                <div className='mt-2 flex'>
                                    <button
                                        className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex-grow'
                                        onClick={() => handleMarkAttendance(index, true)}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex-grow ml-2'
                                        onClick={() => handleMarkAttendance(index, false)}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </div>
    );
}
