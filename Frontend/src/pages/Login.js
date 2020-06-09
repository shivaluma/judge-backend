import React from 'react';
import Header from '../components/UI/Header';
import { FaCode, FaFacebookF, FaGoogle, FaGithub } from 'react-icons/fa';
export default () => {
  return (
    <div
      className='w-screen h-screen'
      style={{
        backgroundImage:
          'radial-gradient(closest-side at 50% 135%, #ffffff 50%, #eceff1 100%)',
      }}
    >
      <Header />

      <div
        className='mt-32 mx-auto text-center bg-white'
        style={{ width: '400px' }}
      >
        <div className='flex flex-col items-center pt-12'>
          <FaCode className='text-2xl text-black' />
          <span className='typo-round text-2xl'>BrosCode</span>
        </div>

        <form className='px-8 mt-8'>
          <input
            className='w-full px-2 py-3 border border-gray-400 placeholder-gray-500 focus:outline-none focus:border-blue-600 transition-all duration-300'
            type='text'
            placeholder='Username or email..'
          />

          <input
            className='w-full px-2 py-3 mt-6 border border-gray-400 placeholder-gray-500 focus:outline-none focus:border-blue-600 transition-all duration-300'
            type='text'
            placeholder='Password..'
          />

          <button
            type='submit'
            className='w-full py-3 rounded-md bg-blue-600 mt-8 text-white text-sm hover:opacity-75 transition-all duration-300'
            style={{
              background: 'linear-gradient(to right, #8e2de2, #4a00e0)',
            }}
          >
            Sign In
          </button>
        </form>

        <div className='mt-3 text-sm px-8 flex justify-between text-teal-700'>
          <span>Forgot Password?</span>
          <span>Sign Up</span>
        </div>

        <div class='mx-auto pb-1 mt-2'>
          <span class='text-center text-sm text-gray-500'>or sign up with</span>
        </div>

        <div className='flex justify-between px-8 mt-1 pb-16'>
          <button className='text-blue-700 px-10 py-3 border-blue-700 border-2 rounded-lg hover:bg-blue-700 hover:text-white transition-all duration-300 focus:outline-none'>
            <FaFacebookF />
          </button>

          <button className='text-red-700 px-10 py-3 border-red-700 border-2 rounded-lg hover:bg-red-700 hover:text-white transition-all duration-300 focus:outline-none'>
            <FaGoogle />
          </button>

          <button className='text-black px-10 py-3 border-black border-2 rounded-lg hover:bg-black hover:text-white transition-all duration-300 focus:outline-none'>
            <FaGithub />
          </button>
        </div>
      </div>
    </div>
  );
};
