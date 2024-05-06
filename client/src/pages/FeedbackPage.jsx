import React, { useState, useEffect } from 'react';
import UserProfile from "../components/UserProfile";
import { useSelector } from 'react-redux';
import { selectUser, selectToken } from '../features/auth/authSlice';
import axios from 'axios';

// const description = require('../../../api/langChain/description');

export default function CourseFeedbackPage({ courses }) {
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        courseCode: '',
        credits: '',
        experience: ''
    });
    const [cards, setCards] = useState([]);
    useEffect(() => {
        async function fetchFeedback() {
            try {
                const response = await axios.get('http://localhost:3000/feedback/get-feedback', {
                    withCredentials: true,
                    headers: {
                        'authorization': `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    const { feedback } = response.data;
                    setCards(feedback);
                    console.log(feedback);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching feedback:', error);
                // Handle error
            }
        }

        fetchFeedback();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, courseCode, credits, experience } = formData;
        const existingCourse = cards.find(card => card.courseCode === courseCode);
        if (existingCourse) {
            alert('Course already exists!! Please add experience to it.');
        }
        if (name && courseCode && credits) {
            try {
                const response = await axios.post('http://localhost:3000/feedback/add-course', {
                    name: name,
                    courseCode: courseCode,
                    credits: credits,
                    experience: [experience]
                }, {
                    withCredentials: true,
                    headers: {
                        'authorization': `Bearer ${token}`,
                    },
                });
                alert(response.status);
                if (response.status === 201) {
                    const newCard = { name, courseCode, credits, experience: [experience] };
                    setCards([...cards, newCard]);  // Add the new card to the state
                    setFormData({ name: '', courseCode: '', credits: '', experience: '' });
                    setShowForm(false);
                    alert('Feedback added successfully!');
                } else {
                    throw new Error('Failed to submit feedback');
                }
            } catch (error) {
                console.error('Error submitting feedback:', error);
                alert('Failed to submit feedback: ' + error.message);
            }

        } else {
            alert('Please fill in all required fields.');
        }
    };

    const handleAddExperience = async (courseCode) => {
        const newExperience = prompt('Enter additional experience:');
        if (newExperience) {
            try {
                // Make an API call to update the experience
                const response = await axios.patch(`http://localhost:3000/feedback/update-exp?courseCode=${courseCode}`,
                    { experience: newExperience },  // data being patched
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': `Bearer ${token}`,
                        }
                    }
                );

                // Update local state only after successful backend update
                const updatedCards = cards.map((card) => {
                    if (card.courseCode === courseCode) {
                        return { ...card, experience: [...card.experience, newExperience] };
                    }
                    return card;
                });

                setCards(updatedCards);

                // Optionally, fetch fresh data from server here or show a success message
                console.log('Experience added successfully');
            } catch (error) {
                console.error('Error adding experience:', error);
                alert(`Failed to update experience: ${error.response ? error.response.data.message : error.message}`);
            }
        }
    };

    const handleViewMore = (index) => {
        const updatedCards = cards.map((card, i) => {
            if (cards[i].courseCode === index) {
                return { ...card, showAllExperience: true };
            }
            return card;
        });
        setCards(updatedCards);
    };
    const handleViewLess = (index) => {
        const updatedCards = cards.map((card, i) => {
            if (cards[i].courseCode === index) {
                return { ...card, showAllExperience: false };
            }
            return card;
        });
        setCards(updatedCards);
    };

    return (
        <div className='flex h-screen bg-gradient-to-tl from-zinc-900 to-gray-900 text-white'>
            <div className='w-1/5 h-full'>
                <UserProfile user={user} />
            </div>
            <div className='w-4/5 h-full relative overflow-y-auto'>
                <div className='p-8'>
                    <div className='mb-8'>
                        <h1 className='text-4xl font-bold text-center'>Course Feedback</h1>
                    </div>
                    <div className="mt-8 flex flex-wrap mx-4 justify-center space-x-8">
                        {cards && cards.map((card, index) => (
                            <div
                                key={card.courseCode}
                                className={`bg-slate-300 text-gray-800 p-6 rounded-md shadow-md w-72 flex flex-col justify-between mb-5`}
                                style={{ height: '24rem' }}
                            >
                                <div>
                                    <h2 className='text-xl font-bold mb-4 text-center'>{card.name.toUpperCase()}</h2>
                                    <p className='text-black mb-4 font-semibold'>Course Code: {card.courseCode}</p>
                                    <p className='text-black mb-4 font-semibold'>Credits: {card.credits}</p>
                                    <p className='text-black mb-4 font-semibold'>Experience:</p>
                                    <ul className='mb-4 text-black'>
                                        {card.experience.slice(0, card.showAllExperience ? undefined : 2).map((exp, expIndex) => (
                                            <li key={expIndex} className='ml-4'>
                                                {`${expIndex + 1}. ${exp.toLowerCase().split('. ').map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1)).join('. ')}`}
                                            </li>
                                        ))}
                                        {card.showAllExperience &&
                                            <button className='text-blue-500 hover:text-blue-700 focus:outline-none pt-2'
                                                onClick={() => handleViewLess(card.courseCode)}>
                                                View less
                                            </button>}
                                    </ul>

                                    {!card.showAllExperience && card.experience.length > 2 && (
                                        <button
                                            className='text-blue-500 hover:text-blue-700 focus:outline-none mb-4'
                                            onClick={() => handleViewMore(card.courseCode)}
                                        >
                                            View More
                                        </button>
                                    )}
                                </div>
                                <button
                                    className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    onClick={() => handleAddExperience(card.courseCode)}
                                >
                                    Add
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* form for adding course */}
                    <div className={`absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 ${showForm ? 'z-10' : 'hidden'}`}>
                        <div className='bg-white p-8 rounded-lg shadow-lg'>
                            <h2 className='text-xl font-semibold mb-4 text-black'>Add New Feedback</h2>
                            <form onSubmit={handleSubmit} className='space-y-4'>
                                <div>
                                    <input
                                        type='text'
                                        name='name'
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder='Course Name'
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
                                <div>
                                    <input
                                        type='number'
                                        name='credits'
                                        value={formData.credits}
                                        onChange={handleChange}
                                        placeholder='Credits'
                                        className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black'
                                    />
                                </div>
                                <div>
                                    <textarea
                                        name='experience'
                                        value={formData.experience}
                                        onChange={handleChange}
                                        placeholder='Please provide an accurate description of your experience.'
                                        className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black'
                                        rows='4'
                                    ></textarea>
                                </div>
                                <button
                                    type='submit'
                                    className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    onSubmit={handleSubmit}
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                    <button
                        className='bg-blue-500 text-white py-3 px-6 rounded-full fixed bottom-8 right-8 shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        onClick={() => setShowForm(!showForm)}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}
