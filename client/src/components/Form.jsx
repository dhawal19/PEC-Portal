import React from 'react';
import { FaGoogle, FaGithub } from "react-icons/fa6";
import { Link, Navigate, redirect, redirectDocument, useNavigate } from 'react-router-dom';

function autoResize(el) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
}

const Form = (props) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 ">
          <div className="absolute bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 shadow-md rounded-xl pt-6 pb-8 flex h-auto w-8/12">
          
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
        <h1 className="text-start text-3xl font-bold mb-4">{props.type==='login' ? 'Login' : 'Register'}                                                                   </h1>
            <p className="text-start text-gray-700 text-s mb-4">
                Welcome back! Sign in to your account
            </p>
        {props.type==='login' && ( <form action=''>
              <div className="mb-4 text-l mt-8 text-start">
                <input
                  className="shadow appearance-none border rounded-3xl w-full ps-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className="mb-4 mt-4 text-l">
                <input
                  className="shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                />
                <a>
                    <p className="text-right text-sm text-teal-700 hover:text-blue-800">
                        Forgot Password?
                    </p>
                </a>
              </div>
              
              <div className="flex justify-center">
                <button
                  className="bg-blue-500 hover:bg-green-700 text-white py-2 px-3 rounded-3xl w-full focus:outline-none hover:scale-105 duration-300  focus:shadow-outline"
                  type="button"
                >
                  Login
                </button>
              </div>
            </form>)
            }        
            {props.type==='register' && ( <form action=''>
                <div className="mb-4 text-l mt-8 text-start">
                    <input
                    className="shadow appearance-none border rounded-3xl w-full ps-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Name"
                    />
                </div>
                <div className="mb-4 text-l mt-4 text-start">
                    <input
                    className="shadow appearance-none border rounded-3xl w-full ps-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="text"
                    placeholder="Email"
                    />
                </div>
                <div className="mb-1 mt-4 text-l">
                    <input
                    className="shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Password"
                    />
                </div>
                <div className="mb-4  text-l text-start">
                    <input
                    className="shadow appearance-none border rounded-3xl w-full ps-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="sid"
                    type="text"
                    placeholder="SID"
                    />
                </div>
                <div className="mb-4 text-l mt-4 text-start">
                    <input
                    className="shadow appearance-none border rounded-3xl w-full ps-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="branch"
                    type="text"
                    placeholder="Branch"
                    />
                </div>
                <div className="mb-4 text-l mt-4 text-start">
                    <textarea onInput={(e) => autoResize(e.target)}
                    className="resize-none h-auto shadow appearance-none border rounded-3xl w-full ps-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="bio"
                    type="text"
                    placeholder="A liitle about yourself..."
                    />
                </div>
                <button className="bg-blue-500 hover:bg-green-700 text-white py-2 px-3 rounded-3xl w-full focus:outline-none focus:shadow-outline hover:scale-105 duration-300"
                type="button"
                >
                Register
                </button>
            </form>)}
            {/*Social Media Login*/}
            <div className="flex items-center mt-4 mb-4">
              <div className="w-full border-t border-blue-700"></div>
              <div className="px-3">
                <span className="text-gray-700">OR</span>
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
          <div className=' border-l border-gray-600 border-opacity-30 w-0.5 rotate-180'></div> 
            {/*Image Container*/}
            <div className='flex flex-col w-5/12'>
                {/*Image*/}
                <div className="flex justify-center mt-6">
                    <h3 className="text-gray-700 text-md my-6 ">
                        {props.type==='login' ? 'New to our platform?' : 'Welcome back!'}
                    </h3>
                </div>
                <div className="flex justify-center">
                    <Link to={props.type==='login' ? '/register' : '/login'} className= 'flex justify-center bg-blue-500 hover:bg-green-700 text-white py-2 px-3 rounded-3xl w-8/12 focus:outline-none focus:shadow-outline hover:scale-105 duration-300'>
                   <button >
                        {props.type==='login' ? 'Register' : 'Login'}
                    </button>
                    </Link>
                </div>
            </div>
          </div>
          
        </div>
      );
};

import PropTypes from 'prop-types';

Form.propTypes = {
    type: PropTypes.string.isRequired
};

export default Form