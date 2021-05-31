import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Members from './Members.js';
const Team = () => {
  return (
    <div>
      <Container>
        <h1 className='text-center'>The Team</h1>
        <Row className='justify-content-center text-center my-5 my-md-5'>
          <Col>
            <Members
              name='Dr. Julieta Q. Nabos'
              title='Project Leader'
              description=''
              img='https://i.pravatar.cc/300?img=1'
            />
          </Col>
          <Col>
            <Members
              name='Dr. Ronjie Mar L. Malinao'
              title='Study Leader 1'
              description=' '
              img='https://i.pravatar.cc/300?img=8'
            />
          </Col>
          <Col>
            <Members
              name='Villi Dane M. Go '
              title='Study Leader 2'
              description=''
              img='https://i.pravatar.cc/300?img=6'
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Team;
