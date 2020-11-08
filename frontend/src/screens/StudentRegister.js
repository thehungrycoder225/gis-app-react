import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { Form, Button, Card, Modal } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listAreas } from '../actions/areaActions';
import { listCourses } from '../actions/courseActions';
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
  const { loading, error } = studentRegister;
  const [message] = useState(null);
  const areaList = useSelector((state) => state.areaList);
  const { areas } = areaList;
  const courseList = useSelector((state) => state.courseList);
  const { courses } = courseList;

  const [terms, setTermsShow] = useState(false);

  const ChangeSchool = async (e) => {
    e.preventDefault();
    await setStudentSchool(e.target.value);
  };
  const ChangeMunicipality = async (e) => {
    e.preventDefault();
    await setMunicipality(e.target.value);
  };

  const ChangeBarangay = async (e) => {
    e.preventDefault();
    await setBarangay(e.target.value);
  };

  useEffect(() => {
    dispatch(listCourses(school));
    dispatch(listAreas(municipality));
    setStudentAddress(`${barangay},${municipality},Marinduque`);
  }, [dispatch, history, municipality, barangay, school, redirect]);

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
  };

  return (
    <FormContainer>
      <Card>
        <Card.Header>
          <h1>Student Registration</h1>
          {message
            ? 'success' && <Message variant='success'>{message}</Message>
            : error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
        </Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Card.Text as='h5'>Basic Information</Card.Text>
            <Form.Group>
              <Form.Label controlid='student-id'>Student Id:</Form.Label>
              <Form.Control
                type='text'
                placeholder='19A1991'
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label controlid='student-name'>Student Name:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Jane V. Doe'
                value={name}
                onChange={(e) => setStudentName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlid='student-age'>
              <Form.Label>Age:</Form.Label>
              <Form.Control
                type='number'
                placeholder='19'
                value={age}
                onChange={(e) => setStudentAge(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlid='student-gender'>
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
            <Form.Group controlid='student-phone'>
              <Form.Label>Phone:</Form.Label>
              <Form.Control
                type='number'
                placeholder='09999999'
                value={phone}
                onChange={(e) => setStudentPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlid='student-school'>
              <Form.Label>School</Form.Label>
              <Form.Control as='select' value={school} onChange={ChangeSchool}>
                <option>Select a School</option>
                <option>School of Agriculture</option>
                <option> School of Arts and Sciences</option>
                <option>School of Business and Management </option>
                <option>School of Community and Health Care </option>
                <option> School of Education </option>
                <option> School of Environmental Science </option>
                <option> School of Engineering </option>
                <option> School of Fisheries </option>

                <option> School of Industrial Technology </option>
                <option> School of Information and Computing Sciences </option>
                <option> School of Basic Education (SHS Program)</option>
                <option> School of Education (Laboratory Program) </option>
                <option>
                  {' '}
                  School of Graduate Studies and Professional Education{' '}
                </option>
                <option> School of Governance</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlid='student-course'>
              <Form.Label>Course</Form.Label>
              <Form.Control
                as='select'
                value={course}
                onChange={(e) => setStudentCourse(e.target.value)}
              >
                <option>Select Course</option>
                {courses.map((course, index) => (
                  <option key={index}>{course.program}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlid='student-year'>
              <Form.Label>Year Level:</Form.Label>
              <Form.Control
                type='number'
                placeholder='1'
                value={yearLevel}
                min='1'
                max='4'
                onChange={(e) => setStudentYearLevel(e.target.value)}
              />
            </Form.Group>
            <Card.Text as='h5'>Present Address:</Card.Text>
            <Form.Group controlid='student-municipality'>
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
            <Form.Group controlid='student-barangay'>
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
            <Form.Group controlid='student-address'>
              <Form.Control
                type='text'
                value={address}
                hidden
                onChange={(e) => setStudentAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Check />
            <p className='text-muted'>
              Please ensure that you're currently located in or within the
              vicinity of the address stated above before submitting, By
              clicking Sign Up, you agree to our and Cookies Policy.
              <Button
                variant='link'
                color='primary'
                size='sm'
                onClick={() => setTermsShow(true)}
              >
                Terms
              </Button>
              ,{' '}
              <Button variant='link' size='sm'>
                Data Policy{' '}
              </Button>
            </p>
            <Button variant='success' type='submit'>
              Submit
            </Button>{' '}
            <Button variant='danger'>Clear</Button>
          </Form>
        </Card.Body>
      </Card>
      <Modal
        size='lg'
        show={terms}
        onHide={() => setTermsShow(false)}
        aria-labelledby='terms-modal'
      >
        <Modal.Header closeButton>
          <Modal.Title id='terms-modal'>Terms</Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
      </Modal>
    </FormContainer>
  );
};

export default StudentRegister;
