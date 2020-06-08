import React from 'react';

export default ({ width, red }) => (
  <div className='flex justify-between mb-4'>
    <div
      className='bg-gray-400'
      style={{
        height: '5px',
        width: `${width}`,
        borderRadius: '5px',
      }}
    ></div>
    <div
      className={`${red ? 'bg-red-400' : 'bg-green-400'}`}
      style={{
        height: '5px',
        width: '10px',
        borderRadius: '5px',
      }}
    ></div>
  </div>
);
