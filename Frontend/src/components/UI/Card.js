import React from 'react';

export default ({ left, zIndex, scale, className }) => (
  <div
    className={`absolute bg-blue-600 ${className}`}
    style={{
      height: '300px',
      width: '260px',
      left: `${left}`,
      borderRadius: '20px',
      transformOrigin: '0% 50%',
      transform: `rotateY(350deg) scale(${scale})`,
      zIndex: { zIndex },
    }}
  ></div>
);
