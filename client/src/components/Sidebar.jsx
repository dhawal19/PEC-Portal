import PropTypes from 'prop-types';
import { useState } from 'react';
const Sidebar = ({ users, onUserClick, loading }) => {

    const [searchTerm, setSearchTerm] = useState('');

    // Filter users based on search term
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-gray-900 h-full p-4">
            <h2 className="text-xl font-semibold mb-4 text-white text-center">Users</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search users..."
                className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
            {loading ? <div className='text-slate-100 '>Loading...</div> :
                <div>
                {filteredUsers.map((user, index) => (
                    <div
                        key={index}
                        onClick={() => onUserClick(user)}
                        className="cursor-pointer p-2 mb-2 bg-white rounded-md shadow-md hover:bg-gray-100 transition duration-300"
                    >
                        {user.name}
                    </div>
                ))}
            </div>}
        </div>
    );
};

export default Sidebar;
