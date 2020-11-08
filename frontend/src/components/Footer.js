import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3 mt-5 mb-0'>
            Copyright &copy;SiCS Dev: Web Build Things 2020
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
