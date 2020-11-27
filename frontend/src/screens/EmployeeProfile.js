import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Col, Container, Table, Button } from 'react-bootstrap';
import { Marker, Popup, CircleMarker } from 'react-leaflet';
import { Icon } from 'leaflet';
import Message from '../components/Message';
import Loader from '../components/Loader';
import GeoMap from '../components/GeoMap';
import logo from '../extras/Logo2.svg';
import { getProfileDetails } from '../actions/employeeActions';
import { listCases } from '../actions/covidActions';
const EmployeeProfile = ({ history }) => {
  const dispatch = useDispatch();
  const [empId, setEmpId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLong] = useState('');
  const employeeLogin = useSelector((state) => state.employeeLogin);
  const { employeeInfo } = employeeLogin;
  const employeeDetails = useSelector((state) => state.employeeDetails);
  const { error, loading, employee } = employeeDetails;
  const covidList = useSelector((state) => state.covidList);
  const { loading: covidLoading, error: covidError, cases } = covidList;
  const zoomLevel = 10;
  const active = new Icon({
    iconUrl:
      'https://api.geoapify.com/v1/icon/?type=awesome&color=%23a10303&icon=virus&iconSize=large&strokeColor=%23070707&shadowColor=%23000000&noWhiteCircle&apiKey=f7698d440ea444c68ac3c32fc02e607a',
    iconSize: [31, 46],
  });
  useEffect(() => {
    if (!employeeInfo) {
      history.push('/employee/login');
    } else {
      if (!employee.name) {
        dispatch(getProfileDetails('profile'));
        dispatch(listCases());
      } else {
        setEmpId(employee.empId);
        setName(employee.name);
        setAge(employee.age);
        setGender(employee.gender);
        setPhone(employee.phone);
        setDepartment(employee.department);
        setLocation(employee.location);
        setLat(employee.location.coordinates[1]);
        setLong(employee.location.coordinates[0]);
      }
    }
  }, [employeeInfo, employee, dispatch, history]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Container className='w-auto p-3' fluid>
          <h1>Employee Profile</h1>
          <Row>
            <Col sm={6} md={6} lg={6}>
              <GeoMap zoom={zoomLevel}>
                <Marker position={[lat, lon]}>
                  <Popup>
                    <p className='text-info text-uppercase h5 font-weight-bold my-3 text-center'>
                      You are here{' '}
                      <span className='h5 font-weight-bold  text-warning'>
                        {name.slice(0, name.length - 10)}
                      </span>
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
                          <td>{empId}</td>
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
                          <td>{department}</td>
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
                              radius={(50 * 5) / zoomLevel}
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
                              radius={(100 * 5) / zoomLevel}
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
                  <Table striped bordered hover responsive className='table-sm'>
                    <tbody className='text text-center'>
                      <tr>
                        <th>ID</th>
                        <td>{empId}</td>
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
                        <td>{department}</td>
                      </tr>

                      <tr>
                        <th>Address</th>
                        <td>{location.formattedAddress}</td>
                      </tr>
                    </tbody>
                  </Table>
                  <Button variant='primary btn-sm w-25' disabled>
                    {' '}
                    <i className='far fa-edit mx-1'></i>Edit Profile
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};
export default EmployeeProfile;
