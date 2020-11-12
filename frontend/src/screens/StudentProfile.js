import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Col, Container, Table, Button } from 'react-bootstrap';
import { Marker, Popup, Icon } from 'react-leaflet';
import Message from '../components/Message';
import Loader from '../components/Loader';
import GeoMap from '../components/GeoMap';
import logo from '../extras/Logo2.svg';
import { getProfileDetails } from '../actions/studentActions';

const StudentProfile = ({ history }) => {
  const dispatch = useDispatch();
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [school, setSchool] = useState('');
  const [course, setCourse] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [location, setLocation] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLong] = useState('');
  const [street, setStreet] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [barangay, setBarangay] = useState('');
  const [address, setAddress] = useState('');

  const studentLogin = useSelector((state) => state.studentLogin);
  const { studentInfo } = studentLogin;
  const studentDetails = useSelector((state) => state.studentDetails);
  const { loading, error, student } = studentDetails;

  useEffect(() => {
    if (!studentInfo) {
      history.push('/student/login');
    } else {
      if (!student.name) {
        dispatch(getProfileDetails('profile'));
      } else {
        setStudentId(student.studentId);
        setName(student.name);
        setGender(student.gender);
        setAge(student.age);
        setPhone(student.phone);
        setSchool(student.school);
        setCourse(student.course);
        setYearLevel(student.yearLevel);
        setLocation(student.location);
        setLat(student.location.coordinates[1]);
        setLong(student.location.coordinates[0]);
        setStreet(student.street);
        setMunicipality(student.municipality);
        setBarangay(student.barangay);
        setAddress(student.location.formattedAddress);
      }
    }
  }, [studentInfo, student, dispatch, history]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Container className='w-auto p-3' fluid>
          <Row>
            <Col sm={6} md={6} lg={6}>
              <GeoMap>
                <Marker position={[lat, lon]}>
                  <Popup>
                    <p className='text-danger h4 font-weight-bold my-3 text-center'>
                      You are here {name.slice(0, name.length - 5)}
                    </p>
                    <Table
                      striped
                      bordered
                      hover
                      responsive
                      className='table-sm'
                    >
                      <tbody className='text-bold text-center'>
                        <tr>
                          <th>ID</th>
                          <td>{studentId}</td>
                        </tr>
                        <tr>
                          <th>Name</th>
                          <td>{name}</td>
                        </tr>
                        <tr>
                          <th>Age</th>
                          <td>{age}</td>
                        </tr>
                        <tr>
                          <th>Gender</th>
                          <td>{gender}</td>
                        </tr>
                        <tr>
                          <th>Contact #</th>
                          <td>{phone}</td>
                        </tr>
                        <tr>
                          <th>School</th>
                          <td>{school}</td>
                        </tr>
                        <tr>
                          <th>Course</th>
                          <td>{course}</td>
                        </tr>
                        <tr>
                          <th>Address</th>
                          <td>{location.formattedAddress}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Popup>
                </Marker>
              </GeoMap>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <Card>
                <Card className='border-0 shadow p-3'>
                  <img src={logo} alt='' />
                  <h1 className='text-center'>
                    Hello{' '}
                    <span className='text-warning'>
                      {' '}
                      {name.slice(0, name.length - 10)}
                    </span>
                  </h1>
                  <Card.Body>
                    <Table
                      striped
                      bordered
                      hover
                      responsive
                      className='table-sm'
                    >
                      <tbody className='text text-center'>
                        <tr>
                          <th>ID</th>
                          <td>{studentId}</td>
                        </tr>
                        <tr>
                          <th>Name</th>
                          <td>{name}</td>
                        </tr>
                        <tr>
                          <th>Age</th>
                          <td>{age}</td>
                        </tr>
                        <tr>
                          <th>Gender</th>
                          <td>{gender}</td>
                        </tr>
                        <tr>
                          <th>Contact #</th>
                          <td>{phone}</td>
                        </tr>
                        <tr>
                          <th>Office</th>
                          <td>{school}</td>
                        </tr>

                        <tr>
                          <th>Address</th>
                          <td>{location.formattedAddress}</td>
                        </tr>
                      </tbody>
                    </Table>
                    <Button variant='primary btn-sm w-25'>
                      {' '}
                      <i className='far fa-edit mx-1'></i>Edit Profile
                    </Button>
                  </Card.Body>
                </Card>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default StudentProfile;
