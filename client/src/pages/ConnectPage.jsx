import UserProfile from '../components/UserProfile';
import SearchBar from '../components/SearchBar';
import UserCard from '../components/UserCard';
import PendingReqCard from '../components/PendingReqCard';
import { useState, useEffect } from 'react'; // Import useEffect and useState
import { useSelector } from 'react-redux';
import { selectUser, selectToken } from '../features/auth/authSlice';
import axios from 'axios';

const ConnectPage = () => {
    const user = useSelector(selectUser);
    const [users, setUsers] = useState([]); // Initialize users state with an empty array
    const [pendingRequests, setPendingRequests] = useState([]);
    const token = useSelector(selectToken);

    useEffect(() => {

        const fetchPendingRequests = async () => {
            try {
                const response = await axios.get('http://localhost:3000/connect/getPendingRequests', {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setPendingRequests(response.data);
            } catch (error) {
                console.error('Error fetching pending requests:', error.message);
                // Handle error
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/connect/getUsers', {
                    withCredentials: true,
                    headers: {
                        'authorization': `Bearer ${token}`,
                    },
                });
                setUsers(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching users:', error.message);
                // Handle error (e.g., show error message)
            }
        };

        fetchPendingRequests();
        fetchUsers();
    }, []);

    return (
        <div className="flex h-full" style={{ minHeight: '100vh' }}>
            <div className="w-1/5">
                <UserProfile user={user} />
            </div>
            <div className="flex flex-col w-4/5 bg-gradient-to-tl from-zinc-900 to-gray-900 h-full" style={{ minHeight: '100vh' }}>
                <h1 className="text-4xl font-bold mt-7 mb-2 text-center font-anta text-white">Connect with Colleagues</h1>
                {pendingRequests && pendingRequests.length > 0 && (
                    <div className="mt-6">
                        <h4 className="text-2xl font-semibold mb-4 text-white ml-3">Pending Connection Requests: {pendingRequests.length}</h4>
                        <div className="grid grid-cols-3 gap-4 ml-3">
                            {pendingRequests.map((request) => (
                                <PendingReqCard
                                    key={request.SID}
                                    userName={request.name}
                                    userSID={request.SID}
                                    userBio={request.bio}
                                    userInterests={request.societies}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {/* <SearchBar /> */}
                <h4 className="text-2xl font-semibold mt-4 mb-2 text-white ml-3">Send Connection Requests: </h4>
                <div className="grid grid-cols-3 gap-4 mt-4 mx-2">
                    {users && users.length > 0 && users.map((user) => (
                        <UserCard
                            key={user.SID}
                            userName={user.name}
                            userSID={user.SID}
                            userBio={user.bio}
                            userInterests={user.societies}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ConnectPage;
