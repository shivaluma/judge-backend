import React from 'react';

export default ({ color, to, text }) => (
  <button
    className='focus:outline-none mx-2 px-4 py-2 font-thin hover:bg-current hover:text-black'
    style={{
      borderRadius: '1020px',
      color: `${color}`,
    }}
  >
    {text}
  </button>
);
