import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Popup, Marker } from 'react-leaflet';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listStudents, deleteStudent } from '../actions/studentActions';
import GeoMap from '../components/GeoMap';
const StudentList = ({ history }) => {
  const dispatch = useDispatch();
  const studentList = useSelector((state) => state.studentList);
  const { loading, error, students } = studentList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const studentDelete = useSelector((state) => state.studentDelete);
  const { success: successDelete } = studentDelete;

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      dispatch(listStudents());
    } else {
      history.push('/user/login');
    }
  }, [userInfo, dispatch, history, successDelete]);
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
          <GeoMap>
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
                      <LinkContainer to={`/admin/student/${student._id}/edit`}>
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
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default StudentList;
