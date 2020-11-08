import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Card, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import logo from '../extras/Logo2.svg';
import { login } from '../actions/userActions';
const UserLogin = ({ location, history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };
  return (
    <FormContainer>
      <Row className='my-5 vw-100  border-0 shadow p-3 mb-5 rounded border-0'>
        <Col sm={6} md={6} lg={6}>
          <Card className='border-0'></Card>
        </Col>
        <Col sm={6} md={6} lg={6}>
          <Card className='border-0 p-5'>
            <img src={logo} alt='logo' className='mt-3' />
            <Card.Text className='text-center mt-2'>
              {' '}
              {loading ? <Loader /> : <h1>User Login</h1>}
              {error && <Message variant='danger'>{error}</Message>}
            </Card.Text>
            <Card.Body>
              <Form onSubmit={submitHandler} className='my-3 '>
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

                <Button variant='primary' type='submit' block>
                  {loading ? <Loader /> : <span>Login</span>}
                </Button>
              </Form>
              <Link to='/user/forgot-password' className='text-warning'>
                Forgot password?
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default UserLogin;
