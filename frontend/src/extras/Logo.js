import React from 'react';
import image from './gislogo.png';
import './logo.css';
const Logo = () => {
  return (
    <div className='d-flex align-items-center justify-content-center flex-md-column'>
      <img src={image} alt='GIS' className='logo' />
    </div>
  );
};

export default Logo;
