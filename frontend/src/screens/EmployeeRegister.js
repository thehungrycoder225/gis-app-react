import React, { useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { listAreas } from '../actions/areaActions';
import { Form, Button, Card } from 'react-bootstrap';
const EmployeeRegister = ({ history }) => {
  const dispatch = useDispatch();
  const [empId, setEmployeeId] = useState('');
  const [name, setEmployeeName] = useState('');
  const [age, setEmployeeAge] = useState('');
  const [phone, setEmployeePhone] = useState('');
  const [department, setEmployeeDepartment] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [barangay, setBarangay] = useState('');
  const [address, setEmployeeAddress] = useState('');
  const areaList = useSelector((state) => state.areaList);
  const { areas } = areaList;
  const submitHandler = (e) => {
    e.preventDefault();
  };

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
    setEmployeeAddress(`${barangay},${municipality},Marinduque`);
  }, [dispatch, history, municipality, barangay]);

  return (
    <FormContainer>
      <Card>
        <Card.Header>Employee Registration</Card.Header>
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
            <Form.Group controlId='employee-department'>
              <Form.Label>Department</Form.Label>
              <Form.Control
                as='select'
                value={department}
                onChange={(e) => setEmployeeDepartment(e.target.value)}
              >
                <option>Select a Department</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='employee-municipality'>
              <Form.Label>Municipality</Form.Label>
              <Form.Control
                as='select'
                value={municipality}
                onChange={ChangeMunicipality}
              >
                <option disabled>Select a Municipality</option>
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
                <option disabled>Select a Barangay</option>
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
