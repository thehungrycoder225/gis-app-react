import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form,
  Button,
  Card,
  Row,
  Col,
  Container,
  Modal,
} from 'react-bootstrap';
import { listAreas } from '../actions/areaActions';
import { listDepartments } from '../actions/departmentActions';
import { register } from '../actions/employeeActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import logo from '../extras/Logo2.svg';

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
  const [message] = useState(null);
  const [terms, setTermsShow] = useState(false);
  const [isAgree, setTerms] = useState(false);

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
    if (employeeInfo) {
      history.push(redirect);
    }
    dispatch(listAreas(municipality));
    dispatch(listDepartments());
    setEmployeeAddress(`${barangay},${municipality},Marinduque`);
  }, [employeeInfo, dispatch, history, municipality, barangay, redirect]);

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
  };

  return (
    <>
      <FormContainer>
        <Card className='w-auto border-0  shadow p-2 mb-5 my-5  rounded'>
          <Card.Title className='text-center mt-3'>
            <img src={logo} alt='Brand Logo' className='p-3' />
            <h1>
              Employee <span className='text-warning'>Registration</span>{' '}
            </h1>
            {message && <Message variant='success'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
          </Card.Title>
          <Card.Body>
            <Card.Text as='h5'>Basic Information</Card.Text>

            <Form className='p-3' onSubmit={submitHandler}>
              <Row>
                <Col sm={6} md={6} lg={6}>
                  <Form.Group controlid='EmployeeId'>
                    <Form.Label>Employee Id:</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='2020-4099'
                      value={empId}
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
                      onChange={(e) => setEmployeeDepartment(e.target.value)}
                    >
                      <option>Select Office</option>
                      {departments.map((el, index) => (
                        <option key={index}>{el.department}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlid='employee-municipality'>
                    <Card.Text as='h5'>Present Address</Card.Text>
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
                      onChange={(e) => setEmployeeAddress(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Form.Check
                  type='checkbox'
                  value={isAgree}
                  label={
                    <p className='text-muted'>
                      Please ensure that you're currently located in or within
                      the vicinity of the address stated above before
                      submitting, By clicking Sign Up, you agree to our{' '}
                      <span
                        role='button'
                        className='text-warning  pointer-event'
                        size='sm'
                        onClick={() => setTermsShow(true)}
                      >
                        Terms and Data Privacy Conditions
                      </span>
                      .{' '}
                    </p>
                  }
                  onClick={() => setTerms(true)}
                />
              </Row>
              <Container className='w-auto text-center'>
                <Button className=' m-1 w-25' variant='primary' type='submit'>
                  Sign Up
                </Button>{' '}
                <Link to={'/register'}>
                  <Button variant='outline-warning w-25'>Go Back</Button>
                </Link>
              </Container>
            </Form>
          </Card.Body>
        </Card>
        <Modal
          size='lg'
          show={terms}
          onHide={() => setTermsShow(false)}
          aria-labelledby='terms-modal'
        >
          <Modal.Header closeButton>
            <Modal.Title id='terms-modal' className='m-auto'>
              <img
                src={logo}
                alt='Brand Logo'
                className='d-inline-block  m-auto'
              />
              <h1 className='text-primary d-inline-block mx-5'>
                Data <span className='text-warning'>Privacy Statement</span>
              </h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='p-5 text-justify'>
            <p>
              The information collected and stored shall be used exclusively for
              the purpose of Geospatial Mapping of MCS employees and students,
              MSC’s initiative to help in the government’s effort to control the
              spread of COVID-19.
            </p>
            <p>
              Upon submission of the form, this application will automatically
              collect the geographic coordinates of your current location. Your
              personal data together with the geospatial data shall be sent
              automatically to a server were your information will be processed
              and pinned to a map. After submission of the form, you will be
              disconnected to the system and the system has no capability to
              track your location.
            </p>
            <p>
              You will see your information in the map if you will access the
              Public View of the map, while other users will not be able to see
              your data. MSC is duty-bound to protect such information as
              prescribed under{' '}
              <a
                href='https://bit.ly/36iCCpt'
                rel='noreferrer'
                target='_blank'
                className='font-weight-bold text-decoration-none text-warning'
              >
                {' '}
                Republic Act 10173{' '}
              </a>{' '}
              or the National Privacy Act of 2012 without the expressed written
              consent of the users concerned. Click SUBMIT button if you agree
              and allow MSC to include you in the map. Thank you.
            </p>
          </Modal.Body>
        </Modal>
      </FormContainer>
    </>
  );
};
export default EmployeeRegister;
