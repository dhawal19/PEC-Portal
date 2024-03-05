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
            <div className='w-1/5 h-full '>
                <UserProfile user={user} />
            </div>
            <div className='w-4/5 bg-slate-950 h-full'>
                <h1 className="mt-20 text-center font-semibold text-6xl text-slate-300">Hello, Welcome {user.name}</h1>
                <h3 className="mt-10 text-center font-semibold text-3xl text-slate-300">Here are a few things you can do on PEC-Connect</h3>
                <div className='mt-20 flex justify-center'>
                    <div className='mx-8 flex items-center'>
                        <Link to="/attendance">
                            <HomeCard title={'Attendance'} description={"Click here to check your attendance"} />
                        </Link>
                    </div>
                    <div className='mx-8 flex items-center'>
                        <HomeCard title={'Time Table'} description={"Click here to view your schedule"} />
                    </div>
                </div>
                <div className='mt-14 flex justify-center'>
                    <div className='mx-8 flex items-center'>
                        <HomeCard title={'Connect'} description={"Click here to connect with people"} />
                    </div>
                    <div className='mx-8 flex items-center'>
                        <HomeCard title={'Courses'} description={"Click here to leave a feedback"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

