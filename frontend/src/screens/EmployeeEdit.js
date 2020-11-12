import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Card, Row, Col, Container } from 'react-bootstrap';
import { listAreas } from '../actions/areaActions';
import { listDepartments } from '../actions/departmentActions';
import { getEmployeeDetails, updateEmployee } from '../actions/employeeActions';
import { EMPLOYEE_UPDATE_RESET } from '../constants/employeeConstants';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import logo from '../extras/Logo2.svg';

const EmployeeEdit = ({ match, history }) => {
  const dispatch = useDispatch();
  const eId = match.params.id;
  const [empId, setEmployeeId] = useState('');
  const [name, setEmployeeName] = useState('');
  const [age, setEmployeeAge] = useState('');
  const [phone, setEmployeePhone] = useState('');
  const [landline, setLandline] = useState('');
  const [gender, setEmployeeGender] = useState('');
  const [department, setEmployeeDepartment] = useState('');
  const [street, setStreet] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [barangay, setBarangay] = useState('');
  const [address, setAddress] = useState('');

  const areaList = useSelector((state) => state.areaList);
  const { areas } = areaList;
  const departmentList = useSelector((state) => state.departmentList);
  const { departments } = departmentList;
  const employeeDetails = useSelector((state) => state.employeeDetails);
  const { loading, error, employee } = employeeDetails;
  const employeeUpdate = useSelector((state) => state.employeeUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = employeeUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const ChangeStreet = async (e) => {
    await setStreet(e.target.value);
  };

  const ChangeMunicipality = async (e) => {
    await setMunicipality(e.target.value);
  };

  const ChangeBarangay = async (e) => {
    await setBarangay(e.target.value);
  };

  useEffect(() => {
    if (!userInfo || !userInfo.role === 'admin') {
      history.push('/user/login');
    }
    if (successUpdate) {
      dispatch({ type: EMPLOYEE_UPDATE_RESET });
      history.push('/admin/employee/list');
    } else {
      if (!employee.name || employee._id !== eId) {
        dispatch(getEmployeeDetails(eId));
      } else {
        setEmployeeId(employee.empId);
        setEmployeeName(employee.name);
        setEmployeeAge(employee.age);
        setEmployeePhone(employee.phone);
        setEmployeeGender(employee.gender);
        if (barangay === '' && municipality === '' && street === '') {
          setStreet(employee.street);
          setBarangay(employee.barangay);
          setMunicipality(employee.municipality);
        } else {
          setMunicipality(municipality);
          setBarangay(barangay);
          setAddress(`${street},${barangay},${municipality},Marinduque`);
        }
        if (department === '') {
          setEmployeeDepartment(employee.department);
        } else {
          setEmployeeDepartment(department);
        }
      }
    }
    dispatch(listDepartments(department));
    dispatch(listAreas(municipality));
  }, [
    userInfo,
    dispatch,
    history,
    eId,
    street,
    employee,
    municipality,
    department,
    barangay,
    successUpdate,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateEmployee({
        _id: eId,
        empId,
        name,
        age,
        phone,
        gender,
        department,
        street,
        municipality,
        barangay,
        address,
      })
    );
  };

  return (
    <>
      <Link to='/admin/employee/list' className='btn btn-outline-warning my-3'>
        Go Back
      </Link>
      <FormContainer>
        <Card className='w-100 border-0 border-0 shadow p-2 mb-5 my-5  rounded'>
          <img src={logo} alt='Brand Logo' className='p-3' />
          <h1 className='text-center'>
            Edit Employee <span className='text-warning'>Information</span>{' '}
          </h1>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Card.Body>
              <Form className='p-3 w-100' onSubmit={submitHandler}>
                <Row>
                  <Col sm={6} md={6} lg={6}>
                    <Card.Text as='h5'>Basic Information</Card.Text>
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
                        onChange={(e) => setEmployeeDepartment(e.target.value)}
                      >
                        <option>Select Office</option>
                        {departments.map((el, index) => (
                          <option key={index}>{el.department}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col sm={6} md={6} lg={6}>
                    <Form.Group controlid='employee-municipality'>
                      <Card.Text as='h5'>
                        Present Address / Contact Information
                      </Card.Text>
                      <Form.Group controlid='student-street'>
                        <Form.Label>
                          House/Unit/Flr #,Street/Purok Name
                        </Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='01 Macapuno Street'
                          value={street}
                          onInput={ChangeStreet}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Label>Municipality:</Form.Label>
                      <Form.Control
                        as='select'
                        value={municipality}
                        onChange={ChangeMunicipality}
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
                    <Form.Group controlid='employee-barangay'>
                      <Form.Label>Barangay:</Form.Label>
                      <Form.Control
                        as='select'
                        value={barangay}
                        onChange={ChangeBarangay}
                      >
                        <option>Select a Barangay</option>
                        {areas.map((area, index) => (
                          <option key={index}>{area.barangay}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlid='employee-address'>
                      <Form.Control
                        type='text'
                        value={address}
                        hidden
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlid='employee-phone'>
                      <Form.Label>Mobile Phone:</Form.Label>
                      <Form.Control
                        type='number'
                        placeholder='09999999'
                        value={phone}
                        onChange={(e) => setEmployeePhone(e.target.value)}
                      />
                    </Form.Group>{' '}
                    <Form.Group controlid='employee-phone'>
                      <Form.Label>Landline:</Form.Label>
                      <Form.Control
                        type='number'
                        placeholder=''
                        value={landline}
                        onChange={(e) => setLandline(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Container className='w-auto text-center'>
                  <Button className=' m-1 w-50' variant='primary' type='submit'>
                    Update
                  </Button>{' '}
                </Container>
              </Form>
            </Card.Body>
          )}
        </Card>
      </FormContainer>
    </>
  );
};
export default EmployeeEdit;
