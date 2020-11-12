import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Register = () => {
  return (
    <>
      <h1 className='text-center'>
        REGIS<span className='text-warning h1'>TER</span>
      </h1>
      <Container className='d-flex align-items-center justify-content-center p-5'>
        <Row>
          <Col sm={6} md={6} lg={6}>
            <Link
              to={'/employee/register'}
              className='text-primary text-center border-0 text-decoration-none '
            >
              <Button
                variant='outline-dark border-0 shadow  w-100 h-100 p-5 rounded'
                block
              >
                <i
                  className='fas fa-briefcase'
                  style={{ fontSize: '2rem' }}
                ></i>
                <span className='d-block my-2 h3'> As Employee </span>
              </Button>
            </Link>
          </Col>
          <Col sm={6} md={6} lg={6}>
            <Link
              to={'/student/register'}
              className='text-primary text-center  border-0 text-decoration-none'
            >
              <Button
                variant='outline-warning border-0 shadow  w-100 h-100 p-5 rounded'
                block
              >
                <i
                  className='fas fa-university'
                  style={{ fontSize: '2rem' }}
                ></i>
                <span className='d-block my-2 h3'> As Student</span>
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
