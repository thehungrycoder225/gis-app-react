import React from 'react';
import { Link } from 'react-dom';
import FormContainer from '../components/FormContainer';
import { Button, Form, Col, Row, Card } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
const UserProfile = () => {
  return (
    <FormContainer>
      <Card>
        <Card.Header>
          {/* {' '}
          <h1>User Register</h1>{' '}
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />} */}
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' placeholder='Enter a valid Email' />
            </Form.Group>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='name' placeholder='Enter your name' />
            </Form.Group>
            <Form.Group controlId='username'>
              <Form.Label>Username</Form.Label>
              <Form.Control type='text' placeholder='Enter username' />
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Enter Password' />
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm your password'
              />
            </Form.Group>
            <Button variant='success' type='submit'>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default UserProfile;
