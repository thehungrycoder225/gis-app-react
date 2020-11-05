import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Card } from 'react-bootstrap';
import { listAreas } from '../actions/areaActions';
import { register } from '../actions/covidActions';
import FormContainer from '../components/FormContainer';
const CovidRegister = ({ location, history }) => {
  const dispatch = useDispatch();
  const [caseId, setCaseId] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [barangay, setBarangay] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('');
  const covidRegister = useSelector((state) => state.covidRegister);
  const { loading, error } = covidRegister;
  const areaList = useSelector((state) => state.areaList);
  const { areas } = areaList;
  const ChangeMunicipality = async (e) => {
    e.preventDefault();
    await setMunicipality(e.target.value);
  };

  const ChangeBarangay = async (e) => {
    e.preventDefault();
    await setBarangay(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    dispatch(listAreas(municipality));
    setAddress(`${barangay},${municipality},Marinduque`);
  }, [dispatch, history, municipality, barangay]);
  return (
    <FormContainer>
      <Card>
        <Card.Header>
          <h1>Record New Covid-19 Case</h1>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label controlid='case-id'>Case Id:</Form.Label>
              <Form.Control
                type='text'
                placeholder='CC19-001'
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label controlid='case-age'>Age:</Form.Label>
              <Form.Control
                type='number'
                min='0'
                max='100'
                placeholder='20'
                value={age}
                onChange={(e) => setAge(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlid='case-gender'>
              <Form.Label>Gender:</Form.Label>
              <Form.Control
                as='select'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlid='case-municipality'>
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
            <Form.Group controlid='case-barangay'>
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
            <Form.Group controlid='case-address'>
              <Form.Control
                type='text'
                value={address}
                hidden
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlid='case-status'>
              <Form.Label>Status</Form.Label>
              <Form.Control
                as='select'
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option disabled>Select Case Status</option>
                <option>Active</option>
                <option>Recovered</option>
                <option>Died</option>
              </Form.Control>
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

export default CovidRegister;
