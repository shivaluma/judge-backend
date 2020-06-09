import React from 'react';

export default () => {
  return (
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
  );
};
