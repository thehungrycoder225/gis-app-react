import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Card } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listAreas } from '../actions/areaActions';
import { listCourses } from '../actions/courseActions';
import { getStudentDetails, updateStudent } from '../actions/studentActions';
import { STUDENT_UPDATE_RESET } from '../constants/studentConstants';
const Student = ({ match, history }) => {
  const sId = match.params.id;
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
  const [address, setAddress] = useState('');
  const dispatch = useDispatch();

  const areaList = useSelector((state) => state.areaList);
  const { areas } = areaList;
  const courseList = useSelector((state) => state.courseList);
  const { courses } = courseList;
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
      if (!student.name || student._id !== sId) {
        dispatch(getStudentDetails(sId));
      } else {
        setStudentId(student.studentId);
        setStudentName(student.name);
        setStudentAge(student.age);
        setStudentGender(student.gender);
        setStudentPhone(student.phone);
        setStudentSchool(student.school);
        setStudentCourse(student.course);
        setStudentYearLevel(student.yearLevel);
        setMunicipality(student.municipality);
        setBarangay(student.barangay);
      }
    }
    dispatch(listCourses(school));
    dispatch(listAreas(municipality));
    setAddress(`${barangay},${municipality},Marinduque`);
  }, [dispatch, history, sId, student, school, municipality, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateStudent({
        _id: sId,
        name,
        age,
        gender,
        phone,
        municipality,
        barangay,
        school,
        course,
        yearLevel,
        address,
      })
    );
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
            <Card.Text as='h5'>Basic Information</Card.Text>
            <Form.Group>
              <Form.Label controlid='student-id'>Student Id:</Form.Label>
              <Form.Control
                type='text'
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder='19A1991'
                readOnly
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
              <Form.Control
                as='select'
                value={school}
                onChange={(e) => setStudentSchool(e.target.value)}
              >
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
                onChange={(e) => setMunicipality(e.target.value)}
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
                onChange={(e) => {
                  setBarangay(e.target.value);
                }}
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
                hidden
                
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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