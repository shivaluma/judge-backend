import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
export default ({
  username,
  pwd,
  handler,
  disable,
  submitHandler,
  wrongInfo,
  loading,
}) => {
  return (
    <form className='px-8 mt-8' onSubmit={submitHandler}>
      <input
        className='w-full px-2 py-3 border border-gray-400 placeholder-gray-500 focus:outline-none focus:border-blue-600 transition-all duration-300'
        type='text'
        placeholder='Username...'
        value={username.value}
        onChange={(event) => handler(event.target.value, 'username')}
        required
      />
      {username.error ? (
        <span className='mt-2 text-xs text-red-800 block text-left'>
          {username.errorDesc}
        </span>
      ) : null}

      <input
        className='w-full px-2 py-3 mt-6 border border-gray-400 placeholder-gray-500 focus:outline-none focus:border-blue-600 transition-all duration-300'
        type='password'
        placeholder='Password...'
        value={pwd.value}
        onChange={(event) => handler(event.target.value, 'pwd')}
        required
      />

      {pwd.error ? (
        <span className='mt-2 text-xs text-red-800 block text-left'>
          {pwd.errorDesc}
        </span>
      ) : null}

      {wrongInfo ? (
        <span className='mt-2 text-xs text-red-800 block text-left'>
          Invalid username or password.
        </span>
      ) : null}

      <BeatLoader size={10} color={'#222'} loading={loading} />

      <button
        type='submit'
        className='w-full py-3 rounded-md bg-blue-600 mt-8 text-white text-sm hover:opacity-75 transition-all duration-300 disabled:cursor-not-allowed'
        style={{
          background: 'linear-gradient(to right, #8e2de2, #4a00e0)',
        }}
        disabled={username.error || pwd.error}
      >
        Sign In
      </button>
    </form>
  );
};
