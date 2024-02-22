import UserProfile from "../components/UserProfile"
import { useSelector } from 'react-redux';
import { selectToken, selectUser } from '../features/auth/authSlice';
import HomeCard from '../components/HomeCard';
import { useVerify } from "../hooks/useVerify";

export default function HomePage() {
    const user = useSelector(selectUser);
    const verify = useVerify();

    return (
        <div className='flex h-screen'>
            <div className='w-1/5 h-full'>
                <UserProfile user={user} />
            </div>
            <div className='w-4/5 bg-gray-950 bg-opacity-10 h-full'>
                <h1 className="mt-20 text-center font-semibold text-6xl text-slate-300">Hello, Welcome {user.name}</h1>
                <h3 className="mt-10 text-center font-semibold text-3xl text-slate-300">Here are a few things you can do on PEC-Connect</h3>
                <div className='mt-12 flex justify-center'>
                    <div className='mx-4 flex items-center'>
                        <HomeCard title={'Attendance'} />
                    </div>
                    <div className='mx-4 flex items-center'>
                        <HomeCard title={'Time Table'} />
                    </div>
                </div>
                <div className='mt-10 flex justify-center'>
                    <div className='mx-4 flex items-center'>
                        <HomeCard title={'Connect'} />
                    </div>
                    <div className='mx-4 flex items-center'>
                        <HomeCard title={'Courses'} />
                    </div>
                </div>
            </div>
        </div>
    )
}

