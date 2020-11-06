import React from 'react';
import { Container } from '@material-ui/core';

const FormContainer = ({ children }) => {
  return <Container fluid>{children}</Container>;
};

export default FormContainer;
