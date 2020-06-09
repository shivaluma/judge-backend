import React, { useEffect, useState } from 'react';
import Header from '../components/UI/Header';
import { FaCode, FaFacebookF, FaGoogle, FaGithub } from 'react-icons/fa';
import FormSignIn from '../components/UI/FormSignIn';
import FormSignUp from '../components/UI/FormSignUp';

import API from '../api';
export default () => {
  const [mode, setMode] = useState(true);
  const [formInfo, setFormInfo] = useState({
    username: {
      value: '',
      error: true,
      errorDesc: '',
      changed: false,
    },
    email: {
      value: '',
      error: true,
      errorDesc: '',
      changed: false,
    },
    pwd: {
      value: '',
      error: true,
      errorDesc: '',
      changed: false,
    },
    confirmPwd: {
      value: '',
      error: true,
      errorDesc: '',
      changed: false,
    },
  });

  useEffect(() => {
    document.title = 'Login';
  }, []);

  const loginHandler = async (event) => {
    event.preventDefault();
    const response = await API.post('auth/login', {
      username: formInfo.username,
      password: formInfo.pwd,
    });
    console.log(response);
  };

  const formChangeHandler = (value, key) => {
    if (key === 'username') {
      const newUsername = { ...formInfo.username };
      newUsername.changed = true;
      newUsername.value = value;
      if (newUsername.value.length === 0 && newUsername.changed) {
        newUsername.error = true;
        newUsername.errorDesc = 'Username cannot be empty.';
      } else {
        newUsername.error = false;
      }
      setFormInfo({
        ...formInfo,
        username: newUsername,
      });
    }
    if (key === 'pwd') {
      const newPwd = { ...formInfo.pwd };
      newPwd.changed = true;
      newPwd.value = value;
      if (newPwd.value.length === 0 && newPwd.changed) {
        newPwd.error = true;
        newPwd.errorDesc = 'Password cannot be empty.';
      } else {
        newPwd.error = false;
      }
      setFormInfo({ ...formInfo, pwd: newPwd });
    }
    if (key === 'email') setFormInfo({ ...formInfo, email: value });
    if (key === 'confirmPwd') setFormInfo({ ...formInfo, confirmPwd: value });
  };

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
        {mode ? (
          <FormSignIn
            username={formInfo.username}
            pwd={formInfo.pwd}
            handler={formChangeHandler}
            submitHandler={loginHandler}
          />
        ) : (
          <FormSignUp />
        )}
        {mode ? (
          <div className='mt-3 text-sm px-8 flex justify-between text-teal-700'>
            <span>Forgot Password?</span>
            <span
              className='cursor-pointer hover:underline'
              onClick={() => setMode(false)}
            >
              Sign Up
            </span>
          </div>
        ) : (
          <div className='mt-3 text-sm px-8 text-center text-gray-500'>
            Have an account?{' '}
            <span
              className='cursor-pointer hover:underline text-teal-700'
              onClick={() => setMode(true)}
            >
              Login
            </span>
          </div>
        )}

        <div className='mx-auto pb-1 mt-2'>
          <span className='text-center text-sm text-gray-500'>
            or sign {mode ? 'up' : 'in'} with
          </span>
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
