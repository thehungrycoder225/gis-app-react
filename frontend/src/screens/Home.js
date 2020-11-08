import React from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer } from 'mdbreact';
import Logo from '../extras/Logo';

const Home = () => {
  return (
    <>
      <MDBContainer>
        <Link to='/user/login'>
          <Logo />
        </Link>
      </MDBContainer>
    </>
  );
};

export default Home;
