import React from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';

const EmployeeRegister = () => {
  return (
    <Container className='my-3'>
      <Card>
        <Card.Header>Employee Registration</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId='EmployeeId'>
              <Form.Label>Employee Id:</Form.Label>
              <Form.Control type='text' placeholder='2020-4099' />
            </Form.Group>
            <Form.Group controlId='employee-name'>
              <Form.Label>Employee Name:</Form.Label>
              <Form.Control type='text' placeholder='John V. Doe' />
            </Form.Group>
            <Form.Group controlId='employee-age'>
              <Form.Label>Employee Age:</Form.Label>
              <Form.Control type='number' placeholder='19' />
            </Form.Group>
            <Form.Group controlId='employee-phone'>
              <Form.Label>Phone:</Form.Label>
              <Form.Control type='number' placeholder='09999999' />
            </Form.Group>
            <Form.Group controlId='employee-department'>
              <Form.Label>Department</Form.Label>
              <Form.Control as='select'>
                <option>Select a Department</option>
                <option>Administration</option>
                <option>Academe</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='employee-office'>
              <Form.Label>Office</Form.Label>
              <Form.Control as='select'>
                <option>Select an Office</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='employee-municipality'>
              <Form.Label>Municipality</Form.Label>
              <Form.Control as='select'>
                <option>Select a Municipality</option>
                <option>Mogpog</option>
                <option>Boac</option>
                <option>Gasan</option>
                <option>Buenavista</option>
                <option>Torrijos</option>
                <option>Sta. Cruz</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='employee-barangay'>
              <Form.Label>Barangay</Form.Label>
              <Form.Control as='select'>
                <option>Select a Barangay</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='employee-address'>
              <Form.Control type='text' hidden />
            </Form.Group>
            <Button variant='success' type='submit'>
              Submit
            </Button>{' '}
            <Button variant='danger'>Clear</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EmployeeRegister;
