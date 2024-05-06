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
                        'authorization': `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    const attendance = response.data;
                    setCards(attendance);
                }
                if (response.status === 404) {
                    alert('No courses found');
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

    const addCourse = (newCard) => async () => {
        try {
            const response = await axios.post('http://localhost:3000/attendance/addCourse', {
                courseName: newCard.courseName.toUpperCase(),
                courseCode: newCard.courseCode,
                present: newCard.percentage.present,
                total: newCard.percentage.total
            }, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'authorization': `Bearer ${token}`,
                },
            });
            if (response.status !== 200) {
                alert('Failed to add course');
                return;
            }
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { courseName, courseCode } = formData;
        if (courseName && courseCode) {
            const newCard = { courseName, courseCode, percentage: { present: 0, total: 0 } };

            // Send the new card to the server
            await addCourse(newCard)();
            // Update the state with the new card
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

    const editAttendance = (card) => async () => {
        try {
            const response = await axios.patch(`http://localhost:3000/attendance/editAttendance/data?courseCode=${card.courseCode}`, {
                present: card.percentage.present,
                total: card.percentage.total,
            }, {
                withCredentials: true,
                headers: {
                    'authorization': `Bearer ${token}`,
                },
            });
            if (response.status !== 200) {
                alert('Failed to edit attendance');
                return;
            }
        } catch (error) {
            console.error('Error editing attendance:', error);
        }
    };

    const handleMarkAttendance = async (index, present) => {
        const updatedCards = cards.map((card, i) => {
            if (i === index) {
                const newPresent = present ? card.percentage.present + 1 : card.percentage.present;
                const newTotal = card.percentage.total + 1;
                return { ...card, percentage: { ...card.percentage, present: newPresent, total: newTotal } };
            }
            return card;
        });

        // Send the updated card to the server
        await editAttendance(updatedCards[index])();
        setCards(updatedCards);
    };

    const CircularProgress = ({ percentage }) => {
        const radius = 35; // Adjusted radius
        const circumference = 2 * Math.PI * radius; // Circumference of the circle
        const strokePct = ((100 - percentage) / 100) * circumference;

        // Define colors based on attendance percentage
        let strokeColor;
        if (percentage <= 1) {
            strokeColor = "rgb(255, 0, 0)"; // Red color
        } else if (percentage < 75) {
            const intensity = 255 - Math.round((percentage / 75) * 255); // Decrease intensity as percentage decreases
            strokeColor = `rgb(255, ${intensity}, ${intensity})`; // Reddish color
        } else {
            strokeColor = "rgb(16, 185, 129)"; // Tailwind green-500
        }

        return (
            <div className="flex justify-center items-center">
                <svg width="80" height="80">
                    <circle
                        fill="transparent"
                        stroke="#E5E7EB" // Light gray
                        cx="40"
                        cy="40"
                        r={radius}
                        strokeWidth="8"
                    />
                    <circle
                        fill="transparent"
                        stroke={strokeColor} // Dynamic stroke color
                        cx="40"
                        cy="40"
                        r={radius}
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokePct}
                        strokeLinecap="round"
                        transform="rotate(-90 40 40)"
                    />
                    <text
                        x="50%"
                        y="50%"
                        dy=".3em"
                        fill="#10B981" // Tailwind green-500
                        textAnchor="middle"
                        fontWeight="bold"
                        fontSize="12"
                        fontFamily="Arial, sans-serif"
                        dominantBaseline="middle"
                    >
                        {`${percentage.toFixed(2)}%`}
                    </text>
                </svg>
            </div>
        );
    };

    return (
        <div className='flex h-full'>
            <div className='w-1/5 h-full'>
                <UserProfile user={user} />
            </div>
            <div className='w-4/5 bg-gradient-to-tl from-zinc-900 to-gray-900 h-full'>
                <div className='h-full'>
                    <div className='mb-8'>
                        <h1 className='text-4xl font-bold text-center text-white mt-5 font-anta'>Attendance</h1>
                    </div>
                    <button
                        className='bg-blue-500 text-white py-3 px-6 rounded-full fixed bottom-8 right-8 z-10 shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        onClick={() => setShowForm(!showForm)}
                    >
                        +
                    </button>
                    {/* form for adding course */}
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
                    {/* cards */}
                    <div className="mt-3 flex flex-wrap mx-6 justify-center ">
                        {cards && cards.map((card, index) => (
                            <div key={index} className='flex flex-col items-center mb-4 mr-4 '>
                                <div className='bg-slate-300 text-gray-800 p-4 rounded-md shadow-md w-80'>
                                    <h2 className='text-xl font-bold mb-2 text-center'>{card.courseName}</h2>
                                    <p className='text-gray-600 mb-2 font-bold'>Course Code: {card.courseCode}</p>
                                    {card.percentage && (
                                        <div>
                                            <p className='text-gray-700 font-bold mb-2'>Attendance: {card.percentage.present} / {card.percentage.total}</p>
                                            <CircularProgress percentage={card.percentage.total !== 0 ? (card.percentage.present / card.percentage.total) * 100 : 0} />
                                        </div>
                                    )}
                                    <p className='text-gray-600 mb-2 mt-2 font-bold'>Attended class today?</p>
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
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
