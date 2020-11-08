import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listEmployees, deleteEmployee } from '../actions/employeeActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
const EmployeeList = ({ history }) => {
  const dispatch = useDispatch();
  const employeeList = useSelector((state) => state.employeeList);
  const { loading, error, employees } = employeeList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const employeeDelete = useSelector((state) => state.employeeDelete);
  const { success: successDelete } = employeeDelete;
  const deleteHandler = (id) => {
    if (window.confirm('Are  you sure you want to  delete this record?')) {
      dispatch(deleteEmployee(id));
    }
  };
  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      dispatch(listEmployees());
    } else {
      history.push('/user/login');
    }
  }, [userInfo, dispatch, history, successDelete]);

  return (
    <>
      <h1>Personnel Records</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table variant='' striped bordered hover responsive size='sm'>
          <thead bg='success'>
            <tr>
              <th>Employee Id</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Contact #</th>
              <th>Address</th>
              <th>Department</th>
              <th></th>
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
                  <LinkContainer to={`/admin/employee/${employee._id}/edit`}>
                    <Button variant='info' className='btn-sm mx-1'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
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
    </>
  );
};

export default EmployeeList;
