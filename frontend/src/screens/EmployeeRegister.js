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
  const [landline, setLandline] = useState('');
  const [gender, setEmployeeGender] = useState('');
  const [department, setEmployeeDepartment] = useState('');
  const [street, setStreet] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [barangay, setBarangay] = useState('');
  const [address, setEmployeeAddress] = useState('');

  const employeeRegister = useSelector((state) => state.employeeRegister);
  const { loading, error, employeeInfo } = employeeRegister;
  const areaList = useSelector((state) => state.areaList);
  const { areas } = areaList;
  const departmentList = useSelector((state) => state.departmentList);
  const { departments } = departmentList;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const [terms, setTermsShow] = useState(false);
  const [isAccept, setTerms] = useState(false);
  const [message, setMessage] = useState(null);

  const ChangeStreet = async (e) => {
    await setStreet(e.target.value);
  };

  const ChangeDepartment = async (e) => {
    await setEmployeeDepartment(e.target.value);
  };
  const ChangeMunicipality = async (e) => {
    await setMunicipality(e.target.value);
  };

  const ChangeBarangay = async (e) => {
    await setBarangay(e.target.value);
  };

  useEffect(() => {
    // if (error) {
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 2000);
    // }
    if (employeeInfo) {
      history.push(redirect);
    }
    dispatch(listDepartments());
    dispatch(listAreas(municipality));

    setEmployeeAddress(`${street},${barangay},${municipality},Marinduque`);
  }, [
    employeeInfo,
    dispatch,
    history,
    street,
    municipality,
    barangay,
    redirect,
    error,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (error) {
      setMessage(error);
    } else if (!isAccept) {
      setMessage('Please read and accept the Terms and Conditions');
    }
    dispatch(
      register(
        empId,
        name,
        age,
        phone,
        gender,
        department,
        street,
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
            {message ? (
              <Message variant='outline-warning text-danger'>{message}</Message>
            ) : (
              loading && <Loader />
            )}
          </Card.Title>
          <Card.Body>
            <Form className='p-3' onSubmit={submitHandler}>
              <Row>
                <Col sm={6} md={6} lg={6}>
                  <Card.Text as='h5'>Basic Information</Card.Text>
                  <Form.Group controlid='EmployeeId'>
                    <Form.Label>
                      <span className='text-danger'>*</span> Employee Id :
                    </Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='2020-4099'
                      value={empId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlid='employee-name'>
                    <Form.Label>
                      <span className='text-danger'>*</span> Name:
                    </Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='John V. Doe'
                      value={name}
                      onChange={(e) => setEmployeeName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlid='employee-age'>
                    <span className='text-danger'>*</span>{' '}
                    <Form.Label> Age:</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='19'
                      value={age}
                      onChange={(e) => setEmployeeAge(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlid='employee-gender'>
                    <span className='text-danger'>*</span>{' '}
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
                    <span className='text-danger'>*</span>{' '}
                    <Form.Label>Office:</Form.Label>
                    <Form.Control
                      as='select'
                      value={department}
                      onChange={ChangeDepartment}
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
                        <span className='text-danger'>*</span>House/Unit/Flr
                        #,Street/Purok Name
                      </Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='01 Macapuno Street'
                        value={street}
                        onInput={ChangeStreet}
                      ></Form.Control>
                    </Form.Group>
                    <span className='text-danger'>*</span>{' '}
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
                    <span className='text-danger'>*</span>{' '}
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
                      hidden
                      value={address}
                      onChange={(e) => setEmployeeAddress(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlid='employee-phone'>
                    <span className='text-danger'>*</span>{' '}
                    <Form.Label>Mobile Phone:</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='+63919123456'
                      value={phone}
                      onChange={(e) => setEmployeePhone(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlid='employee-phone'>
                    {' '}
                    <Form.Label>
                      Landline Number:{' '}
                      <span className='text-muted'>( optional )</span>
                    </Form.Label>
                    <Form.Control
                      type='number'
                      placeholder=''
                      value={landline}
                      onChange={(e) => setLandline(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <p className='text-muted'>
                  Please ensure that you're currently located in or within the
                  vicinity of the address stated above before submitting, By
                  clicking I accept, you agree to our{' '}
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
              </Row>
              <Container className='w-auto text-center'>
                <Button className=' m-1 w-auto' variant='primary' type='submit'>
                  Sign Up
                </Button>{' '}
                <Link to={'/register'}>
                  <Button variant='outline-warning w-auto'>Go Back</Button>
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
            <Button
              variant='primary'
              onClick={() => {
                setTermsShow(false);
                setTerms(true);
              }}
            >
              {' '}
              I Accept
            </Button>
          </Modal.Body>
        </Modal>
      </FormContainer>
    </>
  );
};
export default EmployeeRegister;
