import React from 'react';
import { Spinner } from 'react-bootstrap';
const Loader = ({ variant }) => {
  return (
    <Spinner
      variant={variant}
      animation='border'
      role='status'
      size='md'
      as='span'
      style={{
        // width: '100px',
        // height: '100px',
        margin: 'auto',
        display: 'block',
      }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
};

export default Loader;
