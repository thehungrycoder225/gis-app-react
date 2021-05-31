import React, { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { TweenLite, Power3 } from 'gsap';
import '../../stylesheets/landing-styles.css';

function Title() {
  let title = useRef(null);
  let subtitle = useRef(null);
  useEffect(() => {
    TweenLite.staggerTo(
      [title, subtitle],
      0.8,
      { opacity: 1, ease: Power3.easeIn },
      0.2
    );
  }, []);

  return (
    <Container>
      <Row className=' justify-content-center text-center mb-5 mb-md-5 '>
        <Col className='col-md-12 col-lg-7 spacer-y-3  mt-10'>
          <h1 ref={(el) => (title = el)} className='header-title d-1  my-5'>
            MARC <span className='text-white'>GEO</span>{' '}
          </h1>
          <h2
            ref={(el) => (subtitle = el)}
            className='text-white my-5 header-subtitle '
          >
            Geospatial Mapping of MSC Employees and Students{' '}
            <span className='d-block'>to </span> Prevent the Spread of COVID-19
          </h2>
        </Col>
      </Row>
    </Container>
  );
}

export default Title;
