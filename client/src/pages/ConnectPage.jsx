import UserProfile from '../components/UserProfile';
import SearchBar from '../components/SearchBar';
import UserCard from '../components/UserCard';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSlice';

const ConnectPage = () => {
    const user = useSelector(selectUser);
    const users = [
        {
            // profileImage: 'profile_image_url_1',
            userName: 'User 1',
            userSID: '21103026',
            userBio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            userInterests: ['Coding', 'Reading', 'Traveling']
        },
        {
            // profileImage: 'profile_image_url_2',
            userName: 'User 2',
            userSID: '21103027',
            userBio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            userInterests: ['Music', 'Sports', 'Photography']
        },
        {
            // profileImage: 'profile_image_url_3',
            userName: 'User 3',
            userSID: '22003028',
            userBio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            userInterests: ['Art', 'Cooking', 'Gardening']
        }
    ];
    return (
        <div className="flex h-full">
            <div className="w-1/5">
                <UserProfile user={user} />
            </div>
            {/* Right Content */}
            <div className="flex flex-col w-4/5 bg-gradient-to-tl from-zinc-900 to-gray-900 h-full">
                <h1 className="text-4xl font-bold mt-6 mb-2 text-center font-anta text-white">Connect with Colleagues</h1>
                {/* Search Bar */}
                <SearchBar />
                {/* User Cards */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {users.map((user, index) => (
                        <UserCard
                            key={index}

                            userName={user.userName}
                            userSID={user.userSID}
                            userBio={user.userBio}
                            userInterests={user.userInterests}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ConnectPage;
