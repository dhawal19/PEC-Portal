import { FaGoogle, FaGithub } from "react-icons/fa6";
import {  useNavigate } from 'react-router-dom';
import { loginUser } from '../features/auth/authQueries';
import { useDispatch } from 'react-redux'
import { setUser, setToken } from '../features/auth/authSlice';
import { useState } from 'react';
import { useMutation } from "react-query";
import { setType } from "../features/auth/loginFormSlice";


// Handle login and register


const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [closeButtonClicked, setCloseButtonClicked] = useState(false);
  // const queryClient = useQueryClient();

  const loginMutation = useMutation(loginUser,
    {
      onSuccess: (data) => {
        console.log(data);
        dispatch(setUser(data.foundUser));
        dispatch(setToken(data.accessToken));
        // queryClient.invalidateQueries('login');
        navigate('/home');
      },
      onError: (error) => {

        console.log(error.message);
      }
    }
  );
  const handleLogin = async (e) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-black shadow-md rounded-xl pt-6 pb-8 flex h-auto w-8/12 border-2 border-white">

        {/*Close button*/}
        <button
          className="absolute top-0 right-0 my-2 pb-3 mr-2 bg-transparent border-0 rounded-full h-8 w-8 text-gray-600 hover:text-gray-800 text-xl hover:bg-gray-300 cursor-pointer focus:outline-none focus:shadow-outline"
          onClick={() => console.log('Close button clicked')}
        > {/* Add onClick event to close the form */}
          &times;
        </button>
        <div className="flex flex-start justify-center w-6/12">

          {/*Form Container*/}
          <div className='flex-col w-7/12'>
            <h1 className="text-start text-3xl font-bold mb-4 text-white">Login</h1>
            <p className="text-start text-white text-s mb-4">
              Welcome back! Sign in to your account
            </p>
            <form action='' onSubmit={handleLogin}>
              <div className="mb-4 text-l mt-8 text-start">
                <input
                  className="shadow appearance-none border rounded-3xl w-full ps-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4 mt-4 text-l">
                <input
                  className="shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {loginMutation.isError && (<p className="text-sm text-red-700">
                  Login failed! Please check your credentials and try again.
                </p>)}
                <a>
                  <p className="text-right text-sm text-teal-600 hover:text-blue-600">
                    Forgot Password?
                  </p>
                </a>
              </div>

              <div className="flex justify-center">
                <button
                  className="bg-blue-500 hover:bg-green-700 text-white py-2 px-3 rounded-3xl w-full focus:outline-none hover:scale-105 duration-300  focus:shadow-outline"
                  type="submit"
                >
                  {loginMutation.isLoading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>
            {/*Social Media Login*/}
            <div className="flex items-center mt-4 mb-4">
              <div className="w-full border-t border-blue-700"></div>
              <div className="px-3">
                <span className="text-white">OR</span>
              </div>
              <div className="w-full border-t border-blue-700"></div>
            </div>
            <div className="flex flex-col justify-center">
              <button
                className="flex items-center justify-center bg-blue-500 hover:bg-green-700 text-white py-2 px-3 rounded-3xl mr-3 mb-3 w-full focus:outline-none hover:scale-105 duration-300 focus:shadow-outline"
                type="button"
              >
                <FaGoogle className='w-4 h-4 mr-2' />
                Login with Google
              </button>
              <button
                className="flex items-center justify-center bg-blue-500 hover:bg-green-700 text-white py-2 px-3 rounded-3xl w-full focus:outline-none focus:shadow-outline hover:scale-105 duration-300"
                type="button"
              >
                <FaGithub className='w-4 h-4 mr-2' />
                Login with Github
              </button>
            </div>
          </div>

        </div>
        {/*Vertical line*/}
        <div className=' border-2 border-white border-opacity-30 w-0.5 rotate-180'></div>
        {/*Image Container*/}
        <div className='flex flex-col w-5/12'>
          {/*Image*/}
          <div className="flex justify-center mt-6">
            <h3 className="text-white text-md my-6 "> New to our website?</h3>
          </div>
          <div className="flex justify-center">
              <button onClick={() => dispatch(setType('register'))}
              className='flex justify-center bg-blue-500 hover:bg-green-700 text-white py-2 px-3 rounded-3xl w-8/12 focus:outline-none focus:shadow-outline hover:scale-105 duration-300'>
                Register
              </button>
          </div>
        </div>
      </div>
    </div>
  )
};


export default LoginForm;