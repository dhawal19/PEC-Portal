import React, { useState } from 'react';

const SearchBar = ({ users, onSearch }) => {
    const [interestFilter, setInterestFilter] = useState('');
    const [yearFilter, setYearFilter] = useState('');

    const handleSearch = () => {
        const filteredUsers = users.filter(user => {
            // Check if the user's interests contain the interest filter
            const interestMatch = user.userInterests.includes(interestFilter);

            // Check if the first two characters of the SID match the year filter
            const yearMatch = user.userSID.slice(0, 2) === yearFilter;

            // Return true if both interest and year match, otherwise false
            return interestMatch && yearMatch;
        });

        onSearch(filteredUsers);
    };

    return (
        <div className="mb-4">
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Search by interest..."
                value={interestFilter}
                onChange={(e) => setInterestFilter(e.target.value)}
            />
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                type="text"
                placeholder="Search by year of passing out..."
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
            />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;
