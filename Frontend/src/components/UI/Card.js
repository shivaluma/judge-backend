import React from 'react';
import { FaPlay } from 'react-icons/fa';
export default ({ left, zIndex, scale, className, backgroundImage }) => (
  <div
    className={`relative bg-gray-100 overflow-hidden ${className}`}
    style={{
      height: '300px',
      width: '260px',
      left: `${left}`,
      borderRadius: '20px',
      transformOrigin: '0% 50%',
      transform: `rotateY(350deg) scale(${scale})`,
      zIndex: { zIndex },
    }}
  >
    <div
      className='absolute border border-gray-200 shadow-lg bg-white rounded-full h-20 w-20 text-center'
      style={{
        top: '170px',
        right: '10px',
      }}
    >
      <FaPlay
        className='text-2xl text-gray-400 absolute'
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      />
    </div>
    <div
      className='bg-red-300'
      style={{
        height: '210px',
        backgroundImage,
      }}
    >
      <div className='p-6'>
        <div className='inline-block h-3 rounded-lg bg-white opacity-50 w-16'></div>
        <div className='inline-block ml-3 h-3 rounded-lg bg-white opacity-50 w-32'></div>
      </div>

      <div className='px-6'>
        <div className='inline-block h-12 rounded-lg bg-white opacity-50 w-32'></div>
        <div className='inline-block ml-3 h-12 rounded-lg bg-white opacity-50 w-16'></div>
      </div>
    </div>

    <div
      className='w-full h-full'
      style={{ background: 'rgba(255,255,255,0.5)' }}
    >
      <div className='inline-block h-4 rounded-lg bg-gray-400 mt-8 ml-6 w-24'></div>
    </div>
  </div>
);
