import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { eLogin } from '../actions/employeeActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import logo from '../extras/Logo2.svg';

const EmployeeLogin = ({ location, history }) => {
  const dispatch = useDispatch();
  const [empId, setEmpId] = useState('');
  const [message] = useState(null);
  const employeeLogin = useSelector((state) => state.employeeLogin);
  const { loading, error, employeeInfo } = employeeLogin;
  const redirect = location.search ? location.search.split('=')[1] : '/';
  useEffect(() => {
    if (employeeInfo) {
      history.push(redirect);
    }
    if (error) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, [error, redirect, history, employeeInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(eLogin(empId));
  };
  return (
    <>
      {' '}
      <Link to={'/login'}>
        <Button variant='link' className='text-warning'>
          Go Back
        </Button>
      </Link>
      <FormContainer className='d-flex align-items-center justify-content-center vh-100'>
        <Card className=' border-0 shadow p-3 my-3 w-auto rounded  text-center'>
          <img src={logo} alt='Brand Logo' />
          <h2 className='text-center m-2'>Employee Login</h2>
          <Card.Text className='text-muted'>
            Enter your valid MSC Employee ID to access your profile page
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
                  <Form.Control
                    type='text'
                    placeholder='Enter Employee ID#'
                    value={empId}
                    onChange={(e) => setEmpId(e.target.value)}
                  />
                </Form.Group>
                <Button variant='primary  mx-1 w-auto' type='submit'>
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

export default EmployeeLogin;
