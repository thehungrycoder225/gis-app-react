import React from 'react';
import { Spinner } from 'react-bootstrap';
const Loader = () => {
  return (
    <Spinner
      variant='primary'
      animation='grow'
      role='status'
      size='sm'
      as='span'
      // style={{
      //   width: '100px',
      //   height: '100px',
      //   margin: 'auto',
      //   display: 'block',
      // }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
};

export default Loader;
