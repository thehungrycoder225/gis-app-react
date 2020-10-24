import React from 'react';
import logo from './gislogo.png';
import './logo.css';
const Logo = () => {
  return (
    <div className='d-flex align-items-center justify-content-center flex-md-column'>
      <img src={logo} alt='GIS' className='logo' />
    </div>
  );
};

export default Logo;
