import React from 'react';
import axios from 'axios';
import { Form, Button, Container, Card } from 'react-bootstrap';

class EmployeeRegister extends React.Component {
  constructor() {
    super();
    this.state = {
      areas: [],
      municipality: '',
      barangay: '',
      address: '',
    };
  }
  componentDidMount() {
    axios.get('/api/areas').then((res) => {
      this.setState({ areas: res.data.data });
    });
  }
  ChangeMunicipality = async (e) => {
    e.preventDefault();
    this.setState({ municipality: e.target.value });
    await axios
      .get('/api/areas', {
        params: {
          municipality: e.target.value,
        },
      })
      .then((res) => this.setState({ areas: res.data.data }));
  };

  ChangeBarangay = async (e) => {
    await this.setState(
      {
        barangay: e.target.value,
      },
      () => {
        this.setState({
          address: `${this.state.barangay},${this.state.municipality}`,
        });
      }
    );
  };

  render() {
    const { municipality, barangay, address } = this.state;
    return (
      <Container className='my-3'>
        <Card>
          <Card.Header>Employee Registration</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group controlId='EmployeeId'>
                <Form.Label>Employee Id:</Form.Label>
                <Form.Control type='text' placeholder='2020-4099' />
              </Form.Group>
              <Form.Group controlId='employee-name'>
                <Form.Label>Employee Name:</Form.Label>
                <Form.Control type='text' placeholder='John V. Doe' />
              </Form.Group>
              <Form.Group controlId='employee-age'>
                <Form.Label>Employee Age:</Form.Label>
                <Form.Control type='number' placeholder='19' />
              </Form.Group>
              <Form.Group controlId='employee-phone'>
                <Form.Label>Phone:</Form.Label>
                <Form.Control type='number' placeholder='09999999' />
              </Form.Group>
              <Form.Group controlId='employee-department'>
                <Form.Label>Department</Form.Label>
                <Form.Control as='select'>
                  <option>Select a Department</option>
                  <option>Administration</option>
                  <option>Academe</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='employee-office'>
                <Form.Label>Office</Form.Label>
                <Form.Control as='select'>
                  <option>Select an Office</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='employee-municipality'>
                <Form.Label>Municipality</Form.Label>
                <Form.Control
                  as='select'
                  value={municipality}
                  onChange={this.ChangeMunicipality}
                >
                  <option disabled>Select a Municipality</option>
                  <option>Mogpog</option>
                  <option>Boac</option>
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
                  onChange={this.ChangeBarangay}
                >
                  <option disabled>Select a Barangay</option>
                  {this.state.areas.map((area, index) => (
                    <option key={index} value={area.barangay}>
                      {area.barangay}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='employee-address'>
                <Form.Control
                  type='text'
                  value={address}
                  onChange={this.ChangeBarangay}
                  hidden
                />
              </Form.Group>
              <Button variant='success' type='submit'>
                Submit
              </Button>{' '}
              <Button variant='danger'>Clear</Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default EmployeeRegister;
