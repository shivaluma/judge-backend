import React from 'react';

export default ({ target, handleKey, handler, placeholder, type }) => (
  <div className='w-full mb-5'>
    <input
      className='w-full px-2 py-3 border border-gray-400 placeholder-gray-500 focus:outline-none focus:border-blue-600 transition-all duration-300'
      type={type}
      placeholder={placeholder}
      value={target.value}
      onChange={(event) => handler(event.target.value, handleKey)}
      required
    />

    {target.error ? (
      <span className='mt-2 text-xs text-red-800 block text-left'>
        {target.errorDesc}
      </span>
    ) : null}
  </div>
);
