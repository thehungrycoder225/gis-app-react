import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Col, Container, Table, Button } from 'react-bootstrap';
import { Marker, Popup, CircleMarker } from 'react-leaflet';
import { Icon } from 'leaflet';
import Message from '../components/Message';
import Loader from '../components/Loader';
import GeoMap from '../components/GeoMap';
import logo from '../extras/Logo2.svg';
import { getProfileDetails } from '../actions/studentActions';
import { listCases } from '../actions/covidActions';
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
  const covidList = useSelector((state) => state.covidList);
  const { loading: covidLoading, error: covidError, cases } = covidList;
  const zoomLevel = 10;
  const active = new Icon({
    iconUrl:
      'https://api.geoapify.com/v1/icon/?type=awesome&color=%23a10303&icon=virus&iconSize=large&strokeColor=%23070707&shadowColor=%23000000&noWhiteCircle&apiKey=f7698d440ea444c68ac3c32fc02e607a',
    iconSize: [31, 46],
  });
  useEffect(() => {
    dispatch(listCases());
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
  }, [studentInfo, student, cases, dispatch, history]);
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
              <GeoMap zoom={zoomLevel}>
                <Marker position={[lat, lon]}>
                  <Popup>
                    <p className='text-danger h4 font-weight-bold my-3 text-center'>
                      You are here {name}
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
                          <th>Year</th>
                          <td>{yearLevel}</td>
                        </tr>
                        <tr>
                          <th>Address</th>
                          <td>{location.formattedAddress}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Popup>
                </Marker>
                {covidLoading ? (
                  <Loader variant='danger' size='lg' />
                ) : covidError ? (
                  <Message variant='danger'>{covidLoading}</Message>
                ) : (
                  <>
                    {cases.map((el) => (
                      <>
                        {el.status === 'Active' ? (
                          <>
                            <CircleMarker
                              center={[
                                el.location.coordinates[1],
                                el.location.coordinates[0],
                              ]}
                              radius={50}
                              color={'white'}
                              fillColor={'red'}
                              fillOpacity={0.5}
                              weight={0.5}
                              opacity={0.5}
                            ></CircleMarker>
                            <CircleMarker
                              center={[
                                el.location.coordinates[1],
                                el.location.coordinates[0],
                              ]}
                              radius={100}
                              color={'white'}
                              fillColor={'orange'}
                              fillOpacity={0.2}
                              weight={0.5}
                              opacity={0.3}
                            ></CircleMarker>
                            <Marker
                              key={el._id}
                              position={[
                                el.location.coordinates[1],
                                el.location.coordinates[0],
                              ]}
                              icon={active}
                            >
                              <Popup>
                                <p className='text-danger h4 font-weight-bold my-3 text-center'>
                                  Covid Case Details
                                </p>
                                <Table
                                  striped
                                  bordered
                                  hover
                                  responsive
                                  size='sm'
                                >
                                  <tbody className='text-uppercase text-center'>
                                    <tr>
                                      <th>Case Id</th>
                                      <td>{el.caseId}</td>
                                    </tr>
                                    <tr>
                                      <th>Gender</th>
                                      <td>{el.gender}</td>
                                    </tr>
                                    <tr>
                                      <th>Age</th>
                                      <td>{el.age}</td>
                                    </tr>
                                    <tr>
                                      <th>Location</th>
                                      <td>{el.location.formattedAddress}</td>
                                    </tr>
                                    <tr>
                                      <th>Status</th>
                                      <td>{el.status}</td>
                                    </tr>
                                    <tr>
                                      <th>Date Recorded</th>
                                      <td>{el.createdAt}</td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </Popup>
                            </Marker>
                          </>
                        ) : null}
                      </>
                    ))}
                  </>
                )}
              </GeoMap>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <Card>
                <Card className='border-0 shadow p-3'>
                  <img src={logo} alt='' />
                  <h1 className='text-center'>
                    Hello <span className='text-warning'> {name}</span>
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
                          <th>School</th>
                          <td>{school}</td>
                        </tr>
                        <tr>
                          <th>Course</th>
                          <td>{course}</td>
                        </tr>
                        <tr>
                          <th>Year Level</th>
                          <td>{yearLevel}</td>
                        </tr>
                        <tr>
                          <th>Address</th>
                          <td>{location.formattedAddress}</td>
                        </tr>
                      </tbody>
                    </Table>
                    <Button variant='primary btn-sm w-25 ' disabled>
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
