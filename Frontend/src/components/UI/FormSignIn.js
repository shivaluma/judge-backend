import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import Input from './Form/Input';
export default ({
  username,
  pwd,
  handler,
  submitHandler,
  wrongInfo,
  loading,
}) => {
  return (
    <form className='px-8 mt-8' onSubmit={submitHandler}>
      <Input
        target={username}
        handleKey='username'
        handler={handler}
        type='text'
        placeholder='Username...'
      />

      <Input
        target={pwd}
        handleKey='pwd'
        handler={handler}
        type='password'
        placeholder='Password...'
      />

      {wrongInfo && !loading ? (
        <span className='mt-1 text-xs text-red-800 block text-left'>
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
