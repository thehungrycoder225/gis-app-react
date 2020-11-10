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
  }, [dispatch, error, redirect, history, employeeInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(eLogin(empId));
  };
  return (
    <FormContainer className='d-flex align-items-center justify-content-center vh-100'>
      <Card className=' border-0 shadow p-3 mb-5 my-5 w-50 rounded '>
        <img src={logo} alt='Brand Logo' />
        <h2 className='text-center m-3'>Employee Login</h2>

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
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label className='border-0 outline-danger  text-center '>
                Employee Id:
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Id#'
                value={empId}
                onChange={(e) => setEmpId(e.target.value)}
              />
            </Form.Group>
            <Container className='text-center'>
              <Button variant='primary  mx-1 w-25' type='submit'>
                Login
              </Button>
              <Link to={'/login'}>
                <Button variant='outline-warning  w-25 mx-1'>Go Back</Button>
              </Link>
            </Container>
          </Form>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default EmployeeLogin;
