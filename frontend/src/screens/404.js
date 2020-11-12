import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container
      className='d-flex align-items-center flex-column justify-content-center'
      style={{ height: '80vh' }}
    >
      <h2 className='text-danger'>
        🛑 SORRY THIS PAGE IS STILL UNDER CONSTRUCTION COMEBACK LATER 🛑
      </h2>
      <Link
        to='/'
        className='d-block m-5 p-2  text-info rounded text-decoration-none'
        style={{ fontSize: '1rem' }}
      >
        Go Back
      </Link>
    </Container>
  );
};

export default NotFound;
