import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listAreas } from '../actions/areaActions';
import { register } from '../actions/studentActions';

const StudentRegister = ({ location, history }) => {
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const [studentId, setStudentId] = useState('');
  const [name, setStudentName] = useState('');
  const [age, setStudentAge] = useState('');
  const [gender, setStudentGender] = useState('');
  const [phone, setStudentPhone] = useState('');
  const [school, setStudentSchool] = useState('');
  const [course, setStudentCourse] = useState('');
  const [yearLevel, setStudentYearLevel] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [barangay, setBarangay] = useState('');
  const [address, setStudentAddress] = useState('');
  const studentRegister = useSelector((state) => state.studentRegister);
  const { loading, error, studentInfo } = studentRegister;
  const [message, setMessage] = useState(null);
  const areaList = useSelector((state) => state.areaList);
  const { areas } = areaList;

  const ChangeMunicipality = async (e) => {
    e.preventDefault();
    await setMunicipality(e.target.value);
  };

  const ChangeBarangay = async (e) => {
    e.preventDefault();
    await setBarangay(e.target.value);
  };

  useEffect(() => {
    dispatch(listAreas(municipality));
    setStudentAddress(`${barangay},${municipality},Marinduque`);
  }, [dispatch, history, municipality, barangay, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      register(
        studentId,
        name,
        age,
        gender,
        phone,
        municipality,
        barangay,
        school,
        course,
        yearLevel,
        address
      )
    );
    setMessage('Registration Successful');
  };

  return (
    <FormContainer>
      <Card>
        <Card.Header>
          <h1>Student Registration</h1>
          {message && <Message variant='success'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
        </Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label controlId='student-id'>Student Id:</Form.Label>
              <Form.Control
                type='text'
                placeholder='19A1991'
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label controlId='student-name'>Student Name:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Jane V. Doe'
                value={name}
                onChange={(e) => setStudentName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='student-age'>
              <Form.Label>Age:</Form.Label>
              <Form.Control
                type='number'
                placeholder='19'
                value={age}
                onChange={(e) => setStudentAge(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='student-gender'>
              <Form.Label>Gender:</Form.Label>
              <Form.Control
                as='select'
                value={gender}
                onChange={(e) => setStudentGender(e.target.value)}
              >
                <option disabled>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='student-phone'>
              <Form.Label>Phone:</Form.Label>
              <Form.Control
                type='number'
                placeholder='09999999'
                value={phone}
                onChange={(e) => setStudentPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='student-school'>
              <Form.Label>School</Form.Label>
              <Form.Control
                as='select'
                value={school}
                onChange={(e) => setStudentSchool(e.target.value)}
              >
                <option>Select a School</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='student-course'>
              <Form.Label>Course</Form.Label>
              <Form.Control
                as='select'
                value={course}
                onChange={(e) => setStudentCourse(e.target.value)}
              >
                <option>Select a School</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='student-year'>
              <Form.Label>Year:</Form.Label>
              <Form.Control
                type='number'
                placeholder='1'
                value={yearLevel}
                min='1'
                max='4'
                onChange={(e) => setStudentYearLevel(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='student-municipality'>
              <Form.Label>Municipality</Form.Label>
              <Form.Control
                as='select'
                value={municipality}
                onChange={ChangeMunicipality}
              >
                <option>Select a Municipality</option>
                <option>Boac</option>
                <option>Mogpog</option>
                <option>Gasan</option>
                <option>Buenavista</option>
                <option>Torrijos</option>
                <option>Santa Cruz</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='student-barangay'>
              <Form.Label>Barangay</Form.Label>
              <Form.Control
                as='select'
                value={barangay}
                onChange={ChangeBarangay}
              >
                <option>Select a Barangay</option>
                {areas.map((area, index) => (
                  <option key={index}>{area.barangay}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='student-address'>
              <Form.Control
                type='text'
                value={address}
                hidden
                onChange={(e) => setStudentAddress(e.target.value)}
              />
            </Form.Group>
            <Button variant='success' type='submit'>
              Submit
            </Button>{' '}
            <Button variant='danger'>Clear</Button>
          </Form>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default StudentRegister;
