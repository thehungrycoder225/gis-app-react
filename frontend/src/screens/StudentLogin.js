import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { sLogin } from '../actions/studentActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import logo from '../extras/Logo2.svg';

const StudentLogin = ({ location, history }) => {
  const dispatch = useDispatch();
  const [studentId, setStudentId] = useState('');
  const [message] = useState(null);
  const studentLogin = useSelector((state) => state.studentLogin);
  const { loading, error, studentInfo } = studentLogin;
  const redirect = location.search
    ? location.search.split('=')[1]
    : '/student/profile';
  useEffect(() => {
    if (studentInfo) {
      history.push(redirect);
    }
    if (error) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, [dispatch, error, redirect, history, studentInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(sLogin(studentId));
  };
  return (
    <>
      <Link to={'/login'}>
        <Button variant='link  w-auto' className='text-warning'>
          Go Back
        </Button>
      </Link>
      <FormContainer>
        <Card className=' border-0 shadow p-3 my-2 text-center  w-auto rounded '>
          <img src={logo} alt='Brand Logo' />
          <h2 className='m-3'>Student Login</h2>
          <Card.Text className='text-muted'>
            Enter your valid MSC Student ID to access your profile page
          </Card.Text>
          {loading ? (
            <Loader />
          ) : message ? (
            <Message variant=' outline-info text-info border-0 text-center '>
              {message}
            </Message>
          ) : error ? (
            <Message variant=' outline-danger text-danger border-0 text-center '>
              {error}
            </Message>
          ) : null}

          <Card.Body>
            <Container className='text-center d-flex align-items-center justify-content-center'>
              <Form onSubmit={submitHandler} inline>
                <Form.Group>
                  <Form.Label className='border-0 outline-danger  text-center '></Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Student ID#'
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                  />
                </Form.Group>
                <Button variant='primary w-auto mx-1' type='submit'>
                  Login
                </Button>
              </Form>
            </Container>
          </Card.Body>
        </Card>
      </FormContainer>
    </>
  );
};

export default StudentLogin;
