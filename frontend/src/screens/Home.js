import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Logo from '../extras/Logo';
const Home = () => {
  return (
    <>
      <Container>
        <Link to='/user/login'>
          <Logo />
        </Link>
      </Container>
    </>
  );
};

export default Home;
