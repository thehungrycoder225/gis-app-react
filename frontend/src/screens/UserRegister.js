import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Card, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../actions/userActions';
import { USER_REGISTER_RESET } from '../constants/userConstants';
const UserRegister = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, success } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (!userInfo || !userInfo.role === 'admin') {
      history.push('/user/login');
    }
    if (success) {
      history.push('/admin/user/list');
      dispatch({ type: USER_REGISTER_RESET });
    }
    if (error) {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }, [history, success, error, userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(email, name, username, password));
    }
  };
  return (
    <FormContainer>
      <Card className='w-50 border-0 shadow p-2 mb-5 my-5  rounded'>
        <Card.Title className='text-center mt-3'>
          {' '}
          <h1>Create New User</h1>{' '}
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
        </Card.Title>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter a valid Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter your name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='username'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm your password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant='primary' type='submit' block>
              Register
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              <Link className='text-decoration-none' to={'/admin/user/list'}>
                <Button variant='outline-warning ' block>
                  Go Back
                </Button>
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default UserRegister;
