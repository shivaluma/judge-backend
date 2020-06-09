import React, { useEffect, useState } from 'react';
import Header from '../components/UI/Header';
import { FaCode, FaFacebookF, FaGoogle, FaGithub } from 'react-icons/fa';
import FormSignIn from '../components/UI/FormSignIn';
import FormSignUp from '../components/UI/FormSignUp';
import isEmail from 'validator/lib/isEmail';
import { toast, ToastContainer } from 'react-toastify';
import API from '../api';
import 'react-toastify/dist/ReactToastify.css';

export default ({ isLogin }) => {
  const [mode, setMode] = useState(isLogin);
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
  const [wrongInfo, setWrongInfo] = useState(false);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    document.title = mode ? 'Login' : 'Sign Up';
  }, [mode]);

  const loginHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    const body = {
      username: formInfo.username.value,
      password: formInfo.pwd.value,
    };

    try {
      const response = await API.post('auth/login', body);
      console.log(response);
      toast.success('🌟 Login successful!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      setWrongInfo(true);
    }
    setLoading(false);
  };

  const registerHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    const body = {
      username: formInfo.username.value,
      password: formInfo.pwd.value,
      confirmPassword: formInfo.confirmPwd.value,
      email: formInfo.email.value,
    };

    try {
      const response = await API.post('auth/signup', body);
      console.log(response);
      toast.success('🌟 Register successful!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setMode(true);
    } catch (err) {
      console.log(err.response);
      if (
        err.response.data.duplicate &&
        err.response.data.duplicate.hasOwnProperty('username')
      ) {
        const newUsername = { ...formInfo.username };
        newUsername.error = true;
        newUsername.errorDesc = 'Username has exist.';
        setFormInfo({
          ...formInfo,
          username: newUsername,
        });
      }

      if (
        err.response.data.duplicate &&
        err.response.data.duplicate.hasOwnProperty('email')
      ) {
        const newEmail = { ...formInfo.email };
        newEmail.error = true;
        newEmail.errorDesc = 'Email has exist.';
        setFormInfo({
          ...formInfo,
          email: newEmail,
        });
      }
    }
    setLoading(false);
  };

  const formChangeHandler = (value, key) => {
    if (wrongInfo && mode) {
      setWrongInfo(false);
    }
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
    if (key === 'email') {
      const newEmail = { ...formInfo.email };
      newEmail.changed = true;
      newEmail.value = value;
      if (!isEmail(newEmail.value) && newEmail.changed) {
        newEmail.error = true;
        newEmail.errorDesc = 'Not a valid email.';
      } else {
        newEmail.error = false;
      }
      setFormInfo({ ...formInfo, email: newEmail });
    }
    if (key === 'confirmPwd') {
      const newConfirmPwd = { ...formInfo.confirmPwd };
      newConfirmPwd.changed = true;
      newConfirmPwd.value = value;
      if (newConfirmPwd.value !== formInfo.pwd.value) {
        newConfirmPwd.error = true;
        newConfirmPwd.errorDesc = 'Confirm password do not match.';
      } else {
        newConfirmPwd.error = false;
      }
      setFormInfo({ ...formInfo, confirmPwd: newConfirmPwd });
    }
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
      <ToastContainer />
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
            wrongInfo={wrongInfo}
            loading={isLoading}
          />
        ) : (
          <FormSignUp
            username={formInfo.username}
            pwd={formInfo.pwd}
            confirmPwd={formInfo.confirmPwd}
            email={formInfo.email}
            handler={formChangeHandler}
            submitHandler={registerHandler}
            loading={isLoading}
          />
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
