import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listStudents, deleteStudent } from '../actions/studentActions';
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
    <>
      <h1>Students</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
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
              <th>Record Control</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
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
                    variant='danger'
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
    </>
  );
};

export default StudentList;
