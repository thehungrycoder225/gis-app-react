import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
const Content = () => {
  return (
    <div>
      <Container className='content-height'>
        <Row className='justify-content-center text-justify '>
          <Col className='col-md-12 col-lg-7 py-5 spacer-y-3 '>
            <h1>Rationale</h1>
            <p>
              The COVID-19 pandemic situation in the country is getting better
              based on daily reports of number of positive cases that shows
              decreasing pattern. Cities, municipalities and provinces are
              gradually starting to restore economic activities. Our province is
              again open to locally stranded individuals (LSI) and returning
              OFWs. Authorized persons outside residence (APOR) traveling to and
              from the province are increasing. This situation puts the province
              to higher possibility of spreading the COVID-19 virus just like
              what happened recently where confirmed positive cases increased.
            </p>
          </Col>
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
        </Row>
      </Container>
    </div>
  );
};

export default Content;
