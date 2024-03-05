import { FaGoogle, FaGithub } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../features/auth/authQueries';
import { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { setType } from "../features/auth/loginFormSlice";
import { useDispatch } from 'react-redux';
// Auto resize textarea
function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

// Handle login and register


const RegisterForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [SID, setSID] = useState('');
  const [branch, setBranch] = useState('');
  const [bio, setBio] = useState('');
  const dispatch = useDispatch();
  const registerMutation = useMutation(registerUser,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('register');
        dispatch(setType('login'));
      },
      onError: (error) => {
        console.log(error);
      }
    }
  );

  const handleRegister = async (e) => {
    e.preventDefault();
    registerMutation.mutate({ name, email, password, SID, branch, bio });


  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 ">
      <div className="bg-black shadow-md rounded-xl pt-6 pb-8 flex h-auto w-8/12 border-2 border-white" style={{ maxHeight: '100vh', overflowY: 'auto' }}>

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
            <h1 className="text-3xl font-bold mb-4 text-center">Register                                                                   </h1>
            <p className="text-center text-white text-s mb-4">
              Welcome! Sign up to create an account
            </p>
            <form action='' onSubmit={handleRegister}>
              <div className="mb-4 text-l mt-8 text-start">
                <input
                  className="shadow appearance-none border rounded-3xl w-full ps-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4 text-l mt-4 text-start">
                <input
                  className="shadow appearance-none border rounded-3xl w-full ps-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-1 mt-4 text-l">
                <input
                  className="shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-4  text-l text-start">
                <input
                  className="shadow appearance-none border rounded-3xl w-full ps-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="sid"
                  type="text"
                  placeholder="SID"
                  value={SID}
                  onChange={(e) => setSID(e.target.value)}
                />
              </div>
              <div className="mb-4 text-l mt-4 text-start">
                <input
                  className="shadow appearance-none border rounded-3xl w-full ps-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="branch"
                  type="text"
                  placeholder="Branch"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                />
              </div>
              <div className="mb-4 text-l mt-4 text-start">
                <textarea onInput={(e) => autoResize(e.target)}
                  className="resize-none h-auto shadow appearance-none border rounded-3xl w-full ps-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="bio"
                  type="text"
                  placeholder="A liitle about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />

                {registerMutation.isError && (<p className="text-sm text-red-700">
                  Registration failed! {registerMutation.error.message === 'Request failed with status code 409' ? 'User already exists' : 'Please enter all the details correctly'}
                </p>)}
              </div>
              <button className="bg-blue-500 hover:bg-green-700 text-white py-2 px-3 rounded-3xl w-full focus:outline-none focus:shadow-outline hover:scale-105 duration-300"
                type="submit"
              >
                {registerMutation.isLoading ? 'Registering...' : 'Register'}
              </button>
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
        <div className='flex flex-col w-5/12 ml-6'>
          {/*Image*/}
          <div className="flex justify-center mt-6">
            <h3 className="text-white text-md my-6 text-center">
              Already have an account?
            </h3>
          </div>
          <div className="flex justify-center">
            <button onClick={() => dispatch(setType('login'))}
              className='flex justify-center bg-blue-500 hover:bg-green-700 text-white py-2 px-3 rounded-3xl w-8/12 focus:outline-none focus:shadow-outline hover:scale-105 duration-300'>
              Login
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default RegisterForm