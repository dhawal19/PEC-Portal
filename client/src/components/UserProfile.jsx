// UserProfileSidebar.js
import { useDispatch } from 'react-redux';
import { setUser, setToken, selectToken } from "../features/auth/authSlice";
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const UserProfile = ({ user }) => {
    const token = useSelector(selectToken);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const naviagate = useNavigate();
    const [showEditForm, setShowEditForm] = useState(false); // Step 1
    const [formData, setFormData] = useState({
        email: user.email,
        bio: user.bio,
        SID: user.SID,
        branch: user.branch,
        societies: user.societies,
    });

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:3000/logout', {}, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }
            );
            setIsLoading(false);
            if (response.status !== 200) {
                const errorMessage = `An error has occured: ${response.status}`;
                throw new Error(errorMessage || 'Failed to logout');
            }
            dispatch(setUser({}));
            dispatch(setToken(null));
            naviagate('/');
        }
        catch (error) {
            throw new Error('Failed to logout: ' + error.message);
        }
    }

    const handleEditProfile = async () => {
        try {
            const response = await axios.patch(
                'http://localhost:3000/updateProfile',
                formData, // Use formData to send all updated fields
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            if (response.status !== 200) {
                const errorMessage = `An error has occurred: ${response.status}`;
                throw new Error(errorMessage || 'Failed to update profile');
            }
            // Assuming the response contains updated user data, update the user in the Redux store
            dispatch(setUser(response.data));
        } catch (error) {
            console.error('Failed to update profile:', error);
            // Handle error
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                'http://localhost:3000/delete',
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            if (response.status !== 200) {
                const errorMessage = `An error has occurred: ${response.status}`;
                throw new Error(errorMessage || 'Failed to delete profile');
            }
            console.log('Profile deleted successfully');
            dispatch(setUser({}));
            dispatch(setToken(null));
            naviagate('/');
        } catch (error) {
            console.error('Failed to delete profile:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-black p-4 w-1/5 h-full fixed top-0 left-0 overflow-y-auto border-white border-r">
            <div className="flex items-center justify-center mb-4">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTazqf7Ow72BkH5xm0t8vfXx-OPgNBYqjYYKQ&usqp=CAU" alt="Profile" className="w-20 h-20" />
            </div>
            <div className='mt-5 p-2'>
                <h2 className="text-lg font-semibold text-slate-300 ">{user.name}</h2>
                <p className="text-sm  text-slate-300 mt-2">{user.email}</p>
            </div>
            <p className="text-sm text-slate-300 px-2 mt-1"><strong>User Bio :</strong> {user.bio}</p>
            <div className="mb-1 p-2 mt-3">
                <p className="text-sm font-semibold text-slate-300">Number of Connections: {user.connections ? user.connections.length : 0}</p>
            </div>
            <div className="mb-1 p-2">
                <p className="text-sm font-semibold mb-1 text-slate-300">SID: {user.SID}</p>
            </div>
            <div className="mb-1 p-2">
                <p className="text-sm font-semibold text-slate-300">Branch: {user.branch}</p>
            </div>
            <div className="mb-4 p-2">
                <p className="text-sm font-semibold mb-1 text-slate-300">Societies and Interests:</p>
                <div className="flex flex-wrap">
                    {user.societies.map((society, index) => (
                        <span key={index} className="bg-slate-400 text-sm font-semibold text-black px-2 py-1 rounded-full mr-2 mb-2 inline-block">
                            {society}
                        </span>
                    ))}
                </div>
            </div>
            {/* edit Profile */}
            <div className="flex justify-center mt-3 mb-3">
                <button
                    className="bg-blue-500 hover:bg-green-700 text-white py-2 px-3 rounded-3xl w-full focus:outline-none hover:scale-105 duration-300  focus:shadow-outline"
                    type="submit"
                    id="edit-button"
                    onClick={() => setShowEditForm(true)}
                >
                    Edit Profile
                </button>
            </div>
            {/* logout button */}
            <div className="flex justify-center">
                <button
                    className="bg-blue-500 hover:bg-red-300 text-white py-2 px-3 rounded-3xl w-full focus:outline-none hover:scale-105 duration-300  focus:shadow-outline"
                    type="submit"
                    id="logout-button"
                    onClick={() => handleLogout()}
                >
                    {isLoading ? 'Logging out...' : 'Logout'}
                </button>
            </div>
            {/* delete button */}
            <div className="flex justify-center mt-3">
                <button
                    className="bg-blue-500 hover:bg-red-600 text-white py-2 px-3 rounded-3xl w-full focus:outline-none hover:scale-105 duration-300  focus:shadow-outline"
                    type="submit"
                    id="logout-button"
                    onClick={() => handleDelete()}
                >
                    Delete Profile
                </button>
            </div>
            {showEditForm && (
                <div className="bg-gray-100 p-4 rounded-md mt-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 p-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    />
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mt-4">Bio:</label>
                    <textarea
                        id="bio"
                        name="bio"
                        rows="3"
                        value={formData.bio}
                        onChange={handleChange}
                        className="mt-1 p-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    />
                    <label htmlFor="SID" className="block text-sm font-medium text-gray-700 mt-4">SID:</label>
                    <input
                        type="text"
                        id="SID"
                        name="SID"
                        value={formData.SID}
                        onChange={handleChange}
                        className="mt-1 p-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    />
                    <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mt-4">Branch:</label>
                    <input
                        type="text"
                        id="branch"
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        className="mt-1 p-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    />
                    <label htmlFor="societies" className="block text-sm font-medium text-gray-700 mt-4">Societies:</label>
                    <input
                        type="text"
                        id="societies"
                        name="societies"
                        value={formData.societies}
                        onChange={handleChange}
                        className="mt-1 p-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    />
                    <button
                        className="bg-blue-500 hover:bg-green-700 text-white py-2 px-3 rounded-3xl w-full mt-4 focus:outline-none hover:scale-105 duration-300 focus:shadow-outline"
                        type="submit"
                        onClick={() => {
                            handleEditProfile();
                            setShowEditForm(false);
                        }}
                    >
                        Save Changes
                    </button>
                </div>
            )}
        </div>
    );
};


export default UserProfile;
