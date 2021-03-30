import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Logo from '../extras/Logo';
import './landing-styles.css';
const Home = () => {
  return (
    <>
      <Container>
        <h1 className='align center'>MARC GEO</h1>
        <h2>
          Geospatial Mapping of MSC Employees and Students to Prevent the Spread
          of COVID-19
        </h2>
      </Container>
    </>
  );
};

export default Home;
