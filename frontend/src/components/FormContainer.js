import React from 'react';
import { Container } from '@material-ui/core';

const FormContainer = ({ children }) => {
  return (
    <Container className='d-flex align-items-center justify-content-center w-auto'>
      {children}
    </Container>
  );
};

export default FormContainer;
