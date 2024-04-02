import React, { useState } from 'react';
import UserProfile from "../components/UserProfile";
import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSlice';

// const description = require('../../../api/langChain/description');

export default function CourseFeedbackPage({ courses }) {
    const user = useSelector(selectUser);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        courseCode: '',
        credits: '',
        experience: ''
    });
    const [cards, setCards] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, courseCode, credits, experience } = formData;
        const existingCourse = cards.find(card => card.courseCode === courseCode);
        if (existingCourse) {
            alert('Course already exists!! Please add experience to it.');
        } else {
            if (name && courseCode && credits) {
                const newCard = { name, courseCode, credits, experience: [experience] };
                setCards([...cards, newCard]);
                setFormData({ name: '', courseCode: '', credits: '', experience: '' });
                setShowForm(false);
            } else {
                alert('Please fill in all required fields.');
            }
        }
    };

    const handleAddExperience = (index) => {
        const newExperience = prompt('Enter additional experience:');
        if (newExperience) {
            const updatedCards = cards.map((card, i) => {
                if (i === index) {
                    return { ...card, experience: [...card.experience, newExperience] };
                }
                return card;
            });
            setCards(updatedCards);
        }
    };

    const handleViewMore = (index) => {
        const updatedCards = cards.map((card, i) => {
            if (i === index) {
                return { ...card, showAllExperience: true };
            }
            return card;
        });
        setCards(updatedCards);
    };
    const handleViewDescription = async (description) => {
        try {
            // Make API call to fetch description using description parameter
            // Example:
            // const response = await fetch(`API_ENDPOINT/${description}`);
            // const data = await response.json();
            // Handle data as needed, such as displaying it in a modal
            console.log('Description:', description);
        } catch (error) {
            console.error('Error fetching description:', error);
            // Handle error
        }
    };

    return (
        <div className='flex h-screen bg-slate-950 text-white'>
            <div className='w-1/5 h-full'>
                <UserProfile user={user} />
            </div>
            <div className='w-4/5 h-full relative overflow-y-auto'>
                <div className='p-8'>
                    <div className='mb-8'>
                        <h1 className='text-4xl font-bold text-center'>Course Feedback</h1>
                    </div>
                    {cards.map((card, index) => (
                        <div key={index} className='bg-white text-gray-800 p-4 rounded-md shadow-md mb-4 relative'>
                            <h2 className='text-lg font-semibold mb-2'>{card.name}</h2>
                            <p className='text-gray-600 mb-2'>Course Code: {card.courseCode}</p>
                            <p className='text-gray-600 mb-2'>Credits: {card.credits}</p>
                            <div className='flex items-center mb-2'>
                                <p className='text-gray-600 mr-2'>Description: {card.description}</p>
                                {card.description && (
                                    <button
                                        className='text-blue-500 hover:text-blue-700 focus:outline-none'
                                        onClick={() => handleViewDescription(card.description)}
                                    >
                                        View Description
                                    </button>
                                )}
                            </div>
                            <p className='text-gray-700'>Experience:</p>
                            <ul className='mb-4'>
                                {card.experience.slice(0, card.showAllExperience ? undefined : 2).map((exp, expIndex) => (
                                    <li key={expIndex} className='ml-4'>{exp}</li>
                                ))}
                            </ul>
                            {!card.showAllExperience && card.experience.length > 2 && (
                                <button
                                    className='text-blue-500 hover:text-blue-700 focus:outline-none'
                                    onClick={() => handleViewMore(index)}
                                >
                                    View More
                                </button>
                            )}
                            <button
                                className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 absolute top-4 right-4'
                                onClick={() => handleAddExperience(index)}
                            >
                                Add
                            </button>
                        </div>
                    ))}

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
