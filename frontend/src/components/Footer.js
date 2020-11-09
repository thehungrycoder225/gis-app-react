import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../extras/sicslogo.svg';
const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3 mt-5 mb-0'>
            MARCGeo &copy;
            <img src={logo} alt='Sics Dev Team Logo' /> : We Build Things 2020
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
