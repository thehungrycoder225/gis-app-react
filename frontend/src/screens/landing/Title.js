import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Title() {
  useEffect(() => {}, []);
  return (
    <>
      <div className='landing-background  py-5 py-md-4 '>
        <Container>
          <Row className='justify-content-center text-center my-5 my-md-5'>
            <Col className='col-md-12 col-lg-7 spacer-y-3'>
              <h1 className='header-title d-1 my-5'>
                MARC <span className='text-white'>GEO</span>{' '}
              </h1>
              <h2 className='text-white my-5'>
                Geospatial Mapping of MSC Employees and Students{' '}
                <span className='d-block'>to </span> Prevent the Spread of
                COVID-19
              </h2>
              <a href='#' className=' btn btn-warning btn-lg'>
                Project Roadmap
              </a>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Title;
