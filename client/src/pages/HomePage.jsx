import UserProfile from "../components/UserProfile"
import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSlice';
import HomeCard from '../components/HomeCard';
import { useVerify } from "../hooks/useVerify";
import { Link } from 'react-router-dom';
export default function HomePage() {
    const user = useSelector(selectUser);
    const verify = useVerify();

    return (
        <div className='flex h-screen'>
            <div className='w-1/5 h-full  '>
                <UserProfile user={user} />
            </div>
            <div className='w-4/5 bg-gradient-to-tl from-zinc-900 to-gray-900 h-full'>
                <h1 className="mt-20 text-center font-semibold text-6xl text-slate-300">Hello, Welcome {user.name}</h1>
                <h3 className="mt-10 text-center font-semibold text-3xl text-slate-300">Here are a few things you can do on PEC-Connect</h3>
                <div className='mt-20 flex justify-center'>
                    <div className='mx-8 flex items-center'>
                        <Link to="/attendance">
                            <HomeCard title={'Attendance'} description={"Click here to check your attendance"} />
                        </Link>
                    </div>
                    <div className='mx-8 flex items-center'>
                        <Link to="/messages">
                            <HomeCard title={'Chat'} description={"Click here to chat with your connections"} />
                        </Link>
                    </div>
                </div>
                <div className='mt-14 flex justify-center'>
                    <div className='mx-8 flex items-center'>
                        <Link to="/connect">
                            <HomeCard title={'Connect'} description={"Click here to connect with people"} />
                        </Link>
                    </div>
                    <div className='mx-8 flex items-center'>
                        <Link to="/feedback">
                            <HomeCard title={'Feedback'} description={"Click here to leave a feedback"} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

