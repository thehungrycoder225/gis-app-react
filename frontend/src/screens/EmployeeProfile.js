import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form,
  Button,
  Card,
  Row,
  Col,
  Container,
  Table,
} from 'react-bootstrap';
import { listDepartments } from '../actions/departmentActions';
import {
  getProfileDetails,
  updateEmployeeProfile,
} from '../actions/employeeActions';
import { Marker, Popup } from 'react-leaflet';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import GeoMap from '../components/GeoMap';
import logo from '../extras/Logo2.svg';

const EmployeeProfile = ({ history }) => {
  const [empId, setEmployeeId] = useState('');
  const [name, setEmployeeName] = useState('');
  const [age, setEmployeeAge] = useState('');
  const [phone, setEmployeePhone] = useState('');
  const [gender, setEmployeeGender] = useState('');
  const [department, setEmployeeDepartment] = useState('');
  const [address, setEmployeeAddress] = useState('');
  const [location, setEmployeeLocation] = useState('');
  const [coordinates, setEmployeeCoordinates] = useState('');
  const [message] = useState(null);

  const dispatch = useDispatch();

  const employeeDetails = useSelector((state) => state.employeeDetails);
  const { loading, error, employee } = employeeDetails;

  const employeeLogin = useSelector((state) => state.employeeLogin);
  const { employeeInfo } = employeeLogin;

  const employeeUpdateProfile = useSelector(
    (state) => state.employeeUpdateProfile
  );
  const { success } = employeeUpdateProfile;

  const departmentList = useSelector((state) => state.departmentList);
  const { departments } = departmentList;

  useEffect(() => {
    if (!employeeInfo) {
      history.push('/employee/login');
    } else {
      if (!employee.name) {
        dispatch(getProfileDetails('profile'));
      } else {
        setEmployeeId(employee.empId);
        setEmployeeName(employee.name);
        setEmployeeAge(employee.age);
        setEmployeePhone(employee.phone);
        setEmployeeGender(employee.gender);
        setEmployeeDepartment(employee.department);
        setEmployeeAddress(employee.location.formattedAddress);
        setEmployeeLocation(employee.location);
        setEmployeeCoordinates(employee.location.coordinates);
      }
    }
    // dispatch(listDepartments(department));
  }, [employeeInfo, employee, dispatch, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateEmployeeProfile({
        id: employee._id,
        empId,
        name,
        age,
        phone,
        gender,
        department,
        address,
      })
    );
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  return (
    <>
      <Row>
        <Col sm={6} md={6} lg={6}>
          <FormContainer>
            <GeoMap>
              {console.log(employee)}
              {/* {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <>
                  <Marker position={[0, 0]}>
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
                        <tbody className='text-uppercase text-center'>
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
                </>
              )} */}
            </GeoMap>
          </FormContainer>
        </Col>
        <Col sm={6} md={6} lg={6}>
          <FormContainer>
            <Card className='w-auto border-0  shadow p-2 mb-5 my-5  rounded'>
              <Card.Title className='text-center mt-3'>
                <img src={logo} alt='Brand Logo' className='p-3' />
                <h1>
                  Employee <span className='text-warning'>Profile</span>{' '}
                </h1>
                {message && <Message variant='success'>{message}</Message>}
                {error ? (
                  <Message variant='danger'>{error}</Message>
                ) : (
                  success && (
                    <Message variant='success'>Profile Updated</Message>
                  )
                )}
              </Card.Title>
              <Card.Body>
                <Form className='p-3' onSubmit={submitHandler}>
                  <Row>
                    <Col sm={6} md={6} lg={6}>
                      <Form.Group controlid='EmployeeId'>
                        <Form.Label>Employee Id:</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='2020-4099'
                          value={empId}
                          readOnly
                          onChange={(e) => setEmployeeId(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlid='employee-name'>
                        <Form.Label> Name:</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='John V. Doe'
                          value={name}
                          onChange={(e) => setEmployeeName(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlid='employee-age'>
                        <Form.Label> Age:</Form.Label>
                        <Form.Control
                          type='number'
                          placeholder='19'
                          value={age}
                          onChange={(e) => setEmployeeAge(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlid='employee-phone'>
                        <Form.Label>Phone:</Form.Label>
                        <Form.Control
                          type='number'
                          placeholder='09999999'
                          value={phone}
                          onChange={(e) => setEmployeePhone(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={6} md={6} lg={6}>
                      <Form.Group controlid='employee-gender'>
                        <Form.Label>Gender:</Form.Label>
                        <Form.Control
                          as='select'
                          value={gender}
                          onChange={(e) => setEmployeeGender(e.target.value)}
                        >
                          <option>Select Gender</option>
                          <option>Male</option>
                          <option>Female</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlid='employee-department'>
                        <Form.Label>Office:</Form.Label>
                        <Form.Control
                          as='select'
                          value={department}
                          onChange={(e) =>
                            setEmployeeDepartment(e.target.value)
                          }
                        >
                          <option>Select Office</option>
                          {departments.map((el, index) => (
                            <option key={index}>{el.department}</option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlid='employee-address'>
                        <Form.Label>Address:</Form.Label>
                        <Form.Control
                          type='text'
                          value={address}
                          onChange={(e) => setEmployeeAddress(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Container className='w-auto text-center'>
                    <Button
                      className=' m-1 w-25'
                      variant='primary'
                      type='submit'
                    >
                      Update
                    </Button>{' '}
                  </Container>
                </Form>
              </Card.Body>
            </Card>
          </FormContainer>
        </Col>
      </Row>
    </>
  );
};
export default EmployeeProfile;
