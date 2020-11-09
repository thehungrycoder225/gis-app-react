import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getCaseDetails, updateCase } from '../actions/covidActions';
import { COVID_UPDATE_RESET } from '../constants/covidConstants';
import { listAreas } from '../actions/areaActions';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
const CovidEdit = ({ match, history }) => {
  const dispatch = useDispatch();
  const cId = match.params.id;
  const [caseId, setCaseId] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [barangay, setBarangay] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('');

  const areaList = useSelector((state) => state.areaList);
  const { areas } = areaList;
  const covidDetails = useSelector((state) => state.covidDetails);
  const { loading, error, record } = covidDetails;
  const covidUpdate = useSelector((state) => state.covidUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = covidUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: COVID_UPDATE_RESET });
      history.push('/client/covid/list');
    } else {
      if (!record.caseId || record._id !== cId) {
        dispatch(getCaseDetails(cId));
      } else {
        setCaseId(record.caseId);
        setAge(record.age);
        setGender(record.gender);
        setStatus(record.status);
        dispatch(listAreas(municipality));
        if (municipality === '' && barangay === '') {
          setBarangay(record.barangay);
          setMunicipality(record.municipality);
        } else {
          setMunicipality(municipality);
          setBarangay(barangay);
          setAddress(`${barangay},${municipality},Marinduque`);
        }
      }
    }
  }, [dispatch, history, cId, record, municipality, barangay, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCase({
        _id: cId,
        caseId,
        age,
        gender,
        municipality,
        barangay,
        address,
        status,
      })
    );
  };

  const BarangayHandleChange = (e) => {
    setBarangay(e.target.value);
  };

  return (
    <>
      <Link to='/client/covid/list' className='btn btn-outline-warning'>
        Go Back
      </Link>
      <FormContainer>
        <Card className='w-50 border-0 border-0 shadow p-5 mb-5 my-5  rounded'>
          <h1>Edit Case Details</h1>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
          {loading ? (
            <Loader className='text-center' />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
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
                  onChange={(e) => setMunicipality(e.target.value)}
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
                  onChange={BarangayHandleChange}
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
              <Button variant='primary' block type='submit'>
                Update
              </Button>{' '}
              <Button variant='warning' type='reset' block>
                Clear
              </Button>
            </Form>
          )}
        </Card>
      </FormContainer>
    </>
  );
};

export default CovidEdit;
