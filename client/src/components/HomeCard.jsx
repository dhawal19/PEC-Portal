import React from 'react';

const HomeCard = ({ title, description }) => {
    return (
        <div className="mx-auto rounded-lg border border-gray-50 overflow-hidden shadow-lg bg-gray-800 hover:bg-gray-950 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 h-auto w-80 flex flex-col items-center justify-center p-4">
            <div className="font-bold text-3xl text-slate-300 mb-2">{title}</div>
            <div className="text-white text-sm text-center">{description}</div>
        </div>
    );
};

export default HomeCard;
