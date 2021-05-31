import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Marker, Popup, CircleMarker, FeatureGroup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { listEmployees, deleteEmployee } from '../actions/employeeActions';
import { listCases } from '../actions/covidActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import GeoMap from '../components/GeoMap';
const EmployeeList = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const employeeList = useSelector((state) => state.employeeList);
  const { loading, error, employees } = employeeList;
  const covidList = useSelector((state) => state.covidList);
  const { cases } = covidList;
  const { userInfo } = userLogin;
  const zoomLevel = 10;
  const active = new Icon({
    iconUrl:
      'https://api.geoapify.com/v1/icon/?type=awesome&color=%23a10303&icon=virus&iconSize=large&strokeColor=%23070707&shadowColor=%23000000&noWhiteCircle&apiKey=f7698d440ea444c68ac3c32fc02e607a',
    iconSize: [20, 27],
  });
  const employeeDelete = useSelector((state) => state.employeeDelete);
  const { success: successDelete } = employeeDelete;
  const deleteHandler = (id) => {
    if (window.confirm('Are  you sure you want to  delete this record?')) {
      dispatch(deleteEmployee(id));
    }
  };
  useEffect(() => {
    dispatch(listCases());
    if (userInfo && userInfo.role === 'admin') {
      dispatch(listEmployees());
    } else {
      history.push('/user/login');
    }
  }, [userInfo, dispatch, history, successDelete]);

  return (
    <Container fluid>
      <h1>Personnel Records</h1>
      <Row>
        <Col sm={6} md={6} lg={6}>
          <GeoMap zoom={zoomLevel}>
            {loading ? <Loader /> : error ? <Message>{error}</Message> : null}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <>
                {employees.map((employee) => (
                  <Marker
                    key={employee._id}
                    position={employee.location.coordinates.reverse()}
                  >
                    {console.table(employee)}
                    <Popup>
                      <p className='text-danger h4 font-weight-bold my-3 text-center'>
                        Employee Details
                      </p>
                      <Table
                        striped
                        bordered
                        hover
                        responsive
                        className='table-sm'
                      >
                        <tbody className='text-uppercase text-center'>
                          <tr>
                            <th>ID</th>
                            <td>{employee.empId}</td>
                          </tr>
                          <tr>
                            <th>Name</th>
                            <td>{employee.name}</td>
                          </tr>
                          <tr>
                            <th>Age</th>
                            <td>{employee.age}</td>
                          </tr>
                          <tr>
                            <th>Gender</th>
                            <td>{employee.gender}</td>
                          </tr>
                          <tr>
                            <th>Contact #</th>
                            <td>{employee.phone}</td>
                          </tr>
                          <tr>
                            <th>Office</th>
                            <td>{employee.department}</td>
                          </tr>

                          <tr>
                            <th>Address</th>
                            <td>{employee.location.formattedAddress}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Popup>
                  </Marker>
                ))}
                {cases.map((el) => (
                  <>
                    {el.status === 'Active' ? (
                      <FeatureGroup color='purple'>
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
                            <Table striped bordered hover responsive size='sm'>
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
                      </FeatureGroup>
                    ) : null}
                  </>
                ))}
              </>
            )}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <></>
            )}
          </GeoMap>
        </Col>
        <Col sm={6} md={6} lg={6}>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Table striped bordered hover responsive size='sm'>
              <thead className='bg-primary text-warning'>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Contact #</th>
                  <th>Address</th>
                  <th>Department</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee.empId}</td>
                    <td>{employee.name}</td>
                    <td>{employee.age}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.location.formattedAddress}</td>
                    <td>{employee.department}</td>
                    <td>
                      <LinkContainer
                        to={`/admin/employee/${employee._id}/edit`}
                      >
                        <Button variant='light' className='btn-sm mx-1'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='outline-danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(employee._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeList;
