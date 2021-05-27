import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
const Content = () => {
  return (
    <div>
      <Container className='content-height'>
        <Row className='justify-content-center '>
          <Col className='col-md-12 col-lg-7 py-5 spacer-y-3'>
            <h1>Objectives</h1>
            <p>
              The main objective of this project is to provide the institution a
              tool that will provide relevant information for decision making
              towards prevention of COVID-19 transmission within the MSC
              community
            </p>
          </Col>
          <Col className='col-md-12 col-lg-7 py-5 spacer-y-3'>
            <h1>Research</h1>
            <p>
              The School of Information and Computing Sciences started to
              develop an application software that will map the residential
              location of MSC employees and students. The system will be
              composed of a mobile application that will collect geospatial data
              from MSC employees and students, and a web-based application that
              will process the data and will provide needed information.
            </p>
          </Col>
          <Col className='col-md-12 col-lg-7 py-5 spacer-y-3'>
            <h1>Research</h1>
            <p>
              The School of Information and Computing Sciences started to
              develop an application software that will map the residential
              location of MSC employees and students. The system will be
              composed of a mobile application that will collect geospatial data
              from MSC employees and students, and a web-based application that
              will process the data and will provide needed information.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Content;
