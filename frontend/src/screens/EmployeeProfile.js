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
import { listAreas } from '../actions/areaActions';
import { listDepartments } from '../actions/departmentActions';
import {
  getEmployeeProfile,
  updateEmployeeInfo,
} from '../actions/employeeActions';
import { Marker, Popup } from 'react-leaflet';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import GeoMap from '../components/GeoMap';
import logo from '../extras/Logo2.svg';

const EmployeeProfile = ({ history }) => {
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

  const employeeDetails = useSelector((state) => state.employeeDetails);
  const { loading, error, employee } = employeeDetails;

  const employeeLogin = useSelector((state) => state.employeeLogin);
  const { employeeInfo } = employeeLogin;

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
    if (!employeeInfo) {
      history.push('/employee/login');
    } else {
      if (!employee.name) {
        dispatch(getEmployeeProfile('profile'));
      } else {
        setEmployeeId(employee.empId);
        setEmployeeName(employee.name);
        setEmployeeAge(employee.age);
        setEmployeePhone(employee.phone);
        setEmployeeGender(employee.gender);
        if (municipality === '' && barangay === '') {
          setBarangay(employee.barangay);
          setMunicipality(employee.municipality);
        } else {
          setBarangay(barangay);
          setMunicipality(municipality);
          setEmployeeAddress(`${barangay},${municipality},Marinduque`);
        }
        if (department === '') {
          setEmployeeDepartment(employee.department);
        } else {
          setEmployeeDepartment(department);
        }
      }
    }
    dispatch(listAreas(municipality));
    dispatch(listDepartments());
    setEmployeeAddress(`${barangay},${municipality},Marinduque`);
  }, [
    employeeInfo,
    employee,
    dispatch,
    history,
    municipality,
    barangay,
    department,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateEmployeeInfo({
        id: employee._id,
        empId,
        name,
        age,
        phone,
        gender,
        department,
        municipality,
        barangay,
        address,
      })
    );
  };

  return (
    <>
      <Row>
        <Col sm={6} md={6} lg={6}>
          <FormContainer>
            <GeoMap>
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <>
                  <Marker
                    position={[
                      employeeInfo.location.coordinates[1],
                      employeeInfo.location.coordinates[0],
                    ]}
                  >
                    <Popup>
                      <p className='text-danger h4 font-weight-bold my-3 text-center'>
                        You are here{' '}
                        {employeeInfo.name.split(
                          '',
                          employeeInfo.name.length - 5
                        )}
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
                            <td>{employeeInfo.empId}</td>
                          </tr>
                          <tr>
                            <th>Name</th>
                            <td>{employeeInfo.name}</td>
                          </tr>
                          <tr>
                            <th>Age</th>
                            <td>{employeeInfo.age}</td>
                          </tr>
                          <tr>
                            <th>Gender</th>
                            <td>{employeeInfo.gender}</td>
                          </tr>
                          <tr>
                            <th>Contact #</th>
                            <td>{employeeInfo.phone}</td>
                          </tr>
                          <tr>
                            <th>Office</th>
                            <td>{employeeInfo.department}</td>
                          </tr>

                          <tr>
                            <th>Address</th>
                            <td>{employeeInfo.location.formattedAddress}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Popup>
                  </Marker>
                </>
              )}
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
                {error && (
                  <Message variant='outline-warning text-danger border-0 w-50 m-auto text-center'>
                    {error}
                  </Message>
                )}
                {loading && <Loader />}
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
