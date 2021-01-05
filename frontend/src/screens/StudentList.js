import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Popup, Marker, CircleMarker, FeatureGroup } from 'react-leaflet';
import { Icon } from 'leaflet';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { listStudents, deleteStudent } from '../actions/studentActions';
import { listCases } from '../actions/covidActions';
import GeoMap from '../components/GeoMap';
const StudentList = ({ history, match }) => {
  const dispatch = useDispatch();
  const studentList = useSelector((state) => state.studentList);
  const { loading, error, students, page, pages } = studentList;
  const covidList = useSelector((state) => state.covidList);
  const { cases } = covidList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const studentDelete = useSelector((state) => state.studentDelete);
  const { success: successDelete } = studentDelete;
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const zoomLevel = 10;
  const active = new Icon({
    iconUrl:
      'https://api.geoapify.com/v1/icon/?type=awesome&color=%23a10303&icon=virus&iconSize=large&strokeColor=%23070707&shadowColor=%23000000&noWhiteCircle&apiKey=f7698d440ea444c68ac3c32fc02e607a',
    iconSize: [20, 27],
  });
  useEffect(() => {
    dispatch(listCases());
    if (userInfo && userInfo.role === 'admin') {
      dispatch(listStudents('', pageNumber));
    } else {
      history.push('/user/login');
    }
  }, [userInfo, dispatch, pageNumber, history, successDelete]);
  const deleteHandler = (id) => {
    if (window.confirm('Are  you sure you want to  delete this record?')) {
      dispatch(deleteStudent(id));
    }
  };

  return (
    <Container fluid>
      <h1>Student Records</h1>
      <Row>
        <Col sm={6} md={6} lg={6}>
          <GeoMap zoom={zoomLevel}>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <>
                {students.map((student) => (
                  <Marker
                    key={student._id}
                    position={student.location.coordinates.reverse()}
                  >
                    <Popup>
                      <p className='text-danger h4 font-weight-bold my-3 text-center'>
                        Student Details
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
                            <th>Student Id:</th>
                            <td>{student.studentId}</td>
                          </tr>
                          <tr>
                            <th>Name</th>
                            <td>{student.name}</td>
                          </tr>
                          <tr>
                            <th>Age</th>
                            <td>{student.age}</td>
                          </tr>
                          <tr>
                            <th>Gender</th>
                            <td>{student.gender}</td>
                          </tr>
                          <tr>
                            <th>Contact #</th>
                            <td>{student.phone}</td>
                          </tr>
                          <tr>
                            <th>School</th>
                            <td>{student.school}</td>
                          </tr>
                          <tr>
                            <th>Course</th>
                            <td>{student.course}</td>
                          </tr>
                          <tr>
                            <th>Year Level</th>
                            <td>{student.yearLevel}</td>
                          </tr>
                          <tr>
                            <th>Address</th>
                            <td>{student.location.formattedAddress}</td>
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
                          radius={(50 * 10) / zoomLevel}
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
                          radius={(100 * 10) / zoomLevel}
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
            <>
              <Table striped bordered hover responsive size='sm'>
                <thead className='bg-primary text-warning'>
                  <tr>
                    <th>Student Id:</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Phone Number</th>
                    <th>School</th>
                    <th>Course</th>
                    <th>Year Level</th>
                    <th>Address</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id}>
                      <td>{student.studentId}</td>
                      <td>{student.name}</td>
                      <td>{student.age}</td>
                      <td>{student.gender}</td>
                      <td>{student.phone}</td>
                      <td>{student.school}</td>
                      <td>{student.course}</td>
                      <td>{student.yearLevel}</td>
                      <td>{student.location.formattedAddress}</td>
                      <td>
                        <LinkContainer
                          to={`/admin/student/${student._id}/edit`}
                        >
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='outline-danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(student._id)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Paginate
                page={pageNumber}
                pages={pages}
                keyword={keyword ? keyword : ''}
                isAdmin={true}
              />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default StudentList;
