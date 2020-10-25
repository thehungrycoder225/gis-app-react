import React from 'react';
import { Container, Button, Form, Card } from 'react-bootstrap';
const UserLogin = () => {
  return (
    <>
      <Container>
        <Card>
          <Card.Header>User Login</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group controlId='formBasicEmail'>
                <Form.Label>Username</Form.Label>
                <Form.Control type='text' placeholder='Enter username' />
              </Form.Group>

              <Form.Group controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password' />
              </Form.Group>
              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default UserLogin;
