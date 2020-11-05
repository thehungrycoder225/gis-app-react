import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listAreas } from '../actions/areaActions';
import { listDepartments } from '../actions/departmentActions';
import { register } from '../actions/employeeActions';

const EmployeeRegister = ({ location, history }) => {
  const dispatch = useDispatch();
  const [empId, setEmployeeId] = useState('');
  const [name, setEmployeeName] = useState('');
  const [age, setEmployeeAge] = useState('');
  const [phone, setEmployeePhone] = useState('');
  const [gender, setEmployeeGender] = useState('');
  const [department, setEmployeeDepartment] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [barangay, setBarangay] = useState('');
  const [address, setEmployeeAddress] = useState('');
  const [message, setMessage] = useState(null);

  const employeeRegister = useSelector((state) => state.employeeRegister);
  const { loading, error, employeeInfo } = employeeRegister;
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const areaList = useSelector((state) => state.areaList);
  const { areas } = areaList;
  const departmentList = useSelector((state) => state.departmentList);
  const { departments } = departmentList;

  const ChangeMunicipality = async (e) => {
    e.preventDefault();
    await setMunicipality(e.target.value);
  };

  const ChangeBarangay = async (e) => {
    e.preventDefault();
    await setBarangay(e.target.value);
  };

  useEffect(() => {
    dispatch(listAreas(municipality));
    dispatch(listDepartments());
    setEmployeeAddress(`${barangay},${municipality},Marinduque`);
  }, [dispatch, history, municipality, barangay, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      register(
        empId,
        name,
        age,
        phone,
        gender,
        department,
        municipality,
        barangay,
        address
      )
    );
    setMessage('Registration Successful');
  };

  return (
    <FormContainer>
      <Card>
        <Card.Header>
          <h1>Employee Registration</h1>
          {message && <Message variant='success'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
        </Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='EmployeeId'>
              <Form.Label>Employee Id:</Form.Label>
              <Form.Control
                type='text'
                placeholder='2020-4099'
                value={empId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='employee-name'>
              <Form.Label>Employee Name:</Form.Label>
              <Form.Control
                type='text'
                placeholder='John V. Doe'
                value={name}
                onChange={(e) => setEmployeeName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='employee-age'>
              <Form.Label>Employee Age:</Form.Label>
              <Form.Control
                type='number'
                placeholder='19'
                value={age}
                onChange={(e) => setEmployeeAge(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='employee-phone'>
              <Form.Label>Phone:</Form.Label>
              <Form.Control
                type='number'
                placeholder='09999999'
                value={phone}
                onChange={(e) => setEmployeePhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='employee-gender'>
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
            <Form.Group controlId='employee-department'>
              <Form.Label>Department</Form.Label>
              <Form.Control
                as='select'
                value={department}
                onChange={(e) => setEmployeeDepartment(e.target.value)}
              >
                <option>Select a Department</option>
                {departments.map((el, index) => (
                  <option key={index}>{el.department}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='employee-municipality'>
              <Form.Label>Municipality</Form.Label>
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
            <Form.Group controlId='employee-barangay'>
              <Form.Label>Barangay</Form.Label>
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
            <Form.Group controlId='employee-address'>
              <Form.Control
                type='text'
                value={address}
                onChange={(e) => setEmployeeAddress(e.target.value)}
              />
            </Form.Group>
            <Button variant='success' type='submit'>
              Submit
            </Button>{' '}
            <Button variant='danger'>Clear</Button>
          </Form>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};
export default EmployeeRegister;
