import React from 'react';

const HomeCard = ({ title }) => {
    return (
        <div className="mx-auto rounded border border-gray-50 overflow-hidden shadow-lg bg-gray-700 hover:bg-gray-800 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 h-32 w-48 flex items-center justify-center">
            <div>
                <div className="font-bold text-3xl text-slate-300">{title}</div>
            </div>
        </div>
    );
};

export default HomeCard;
