import UserProfile from '../components/UserProfile';
import FriendsCard from '../components/FriendsCard'; // Import FriendsCard
import { useState, useEffect } from 'react'; // Import useEffect and useState
import { useSelector } from 'react-redux';
import { selectUser, selectToken } from '../features/auth/authSlice';
import axios from 'axios';

const ConnectPage = () => {
    const user = useSelector(selectUser);
    const [friends, setFriends] = useState([]); // Initialize friends state with an empty array
    const token = useSelector(selectToken);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await axios.get('http://localhost:3000/connect/getFriends', {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFriends(response.data);
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        fetchFriends();
    }, [token]); // Call useEffect when token changes

    return (
        <div className="flex h-full" style={{ minHeight: '100vh' }}>
            <div className="w-1/5">
                <UserProfile user={user} />
            </div>
            <div className="flex flex-col w-4/5 bg-gradient-to-tl from-zinc-900 to-gray-900 h-full" style={{ minHeight: '100vh' }}>
                <h1 className="text-4xl font-bold mt-7 mb-2 text-center font-anta text-white">Connect with Colleagues</h1>
                {friends && friends.length > 0 && (
                    <div className="mt-6">
                        <h4 className="text-2xl font-semibold mb-4 text-white ml-3">Friends: {friends.length}</h4>
                        <div className="grid grid-cols-3 gap-4 ml-3">
                            {friends.map((friend) => (
                                <FriendsCard
                                    key={friend.SID}
                                    userName={friend.name}
                                    userSID={friend.SID}
                                    userBio={friend.Bio}
                                    userInterests={friend.societies}
                                    branch={friend.branch}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConnectPage;
