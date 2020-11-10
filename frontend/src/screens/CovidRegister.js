import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Card } from 'react-bootstrap';
import { listAreas } from '../actions/areaActions';
import { createCase } from '../actions/covidActions';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { COVID_CREATE_RESET } from '../constants/covidConstants';
const CovidRegister = ({ location, history }) => {
  const dispatch = useDispatch();
  const [caseId, setCaseId] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [barangay, setBarangay] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('');
  const covidCreate = useSelector((state) => state.covidCreate);
  const { loading, error, success } = covidCreate;
  const areaList = useSelector((state) => state.areaList);
  const { areas } = areaList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
    dispatch(
      createCase(caseId, age, gender, municipality, barangay, address, status)
    );
  };
  useEffect(() => {
    if (!userInfo || !userInfo.role === 'client') {
      history.push('/user/login');
    }
    if (success) {
      history.push('/client/covid/list');
      dispatch({ type: COVID_CREATE_RESET });
    } else {
    }
    dispatch(listAreas(municipality));
    setAddress(`${barangay},${municipality},Marinduque`);
  }, [
    userInfo,
    dispatch,
    history,
    municipality,
    barangay,
    success,
    covidCreate,
  ]);
  return (
    <>
      <Link to='/client/covid/list' className='btn btn-outline-warning'>
        Go Back
      </Link>
      <FormContainer>
        <Card className='w-50 border-0 shadow p-5 mb-5 my-5  rounded'>
          <Card.Title>
            <h1>Add New Covid Case</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
          </Card.Title>
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
                  <option>Select Case Status</option>
                  <option>Active</option>
                  <option>Recovered</option>
                  <option>Died</option>
                </Form.Control>
              </Form.Group>
              <Button variant='primary' type='submit' block>
                Submit
              </Button>{' '}
              <Button variant='outline-warning' block>
                Clear
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </FormContainer>
    </>
  );
};

export default CovidRegister;
