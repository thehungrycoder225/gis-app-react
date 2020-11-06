import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getStudentDetails, updateStudent } from '../actions/studentActions';
import { STUDENT_UPDATE_RESET } from '../constants/studentConstants';
const Student = ({ match, history }) => {
  const studentId = match.params.id;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  //   const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const studentDetails = useSelector((state) => state.studentDetails);
  const { loading, error, student } = studentDetails;

  const studentUpdate = useSelector((state) => state.studentUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = studentUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: STUDENT_UPDATE_RESET });
      history.push('/admin/student-list');
    } else {
      if (!student.name || student._id !== studentId) {
        dispatch(getStudentDetails(studentId));
      } else {
        setName(student.name);
      }
    }
  }, [dispatch, history, studentId, student, successUpdate]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateStudent({ _id: studentId, name }));
  };
  return (
    <>
      <Link to='/admin/student-list' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        {' '}
        <h1>Edit Student Inforamtion</h1> {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter your name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Button variant='success' type='submit'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default Student;
