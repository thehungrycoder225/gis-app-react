import React from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import axios from 'axios';
class StudentRegister extends React.Component {
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
    axios
      .get('http://immense-eyrie-57635.herokuapp.com/api/area/')
      .then((res) => {
        this.setState({
          areas: res.data.data,
        });
      });
  }
  ChangeMunicipality = async (e) => {
    e.preventDefault();
    this.setState({ municipality: e.target.value });
    await axios
      .get('http://immense-eyrie-57635.herokuapp.com/api/area/', {
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
    const { barangay, municipality, address } = this.state;
    return (
      <Container className='my-3'>
        <Card>
          <Card.Header>Student Registration</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group controlId='studentId'>
                <Form.Label>Student Id:</Form.Label>
                <Form.Control type='text' placeholder='10B07A1' />
              </Form.Group>
              <Form.Group controlId='student-name'>
                <Form.Label>Student Name:</Form.Label>
                <Form.Control type='text' placeholder='John V. Doe' />
              </Form.Group>
              <Form.Group controlId='student-age'>
                <Form.Label>Student Age:</Form.Label>
                <Form.Control type='number' placeholder='19' />
              </Form.Group>
              <Form.Group controlId='student-school'>
                <Form.Label>School</Form.Label>
                <Form.Control as='select'>
                  <option>School of Information and Computing Sciences</option>
                  <option>School of Arts and Sciences</option>
                  <option>School of Engineering</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='student-course'>
                <Form.Label>Course</Form.Label>
                <Form.Control as='select'>
                  <option>BSI/T</option>
                  <option>BSIS</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='student-phone'>
                <Form.Label>Phone:</Form.Label>
                <Form.Control type='number' placeholder='09999999' />
              </Form.Group>
              <Form.Group controlId='student-year'>
                <Form.Label>Year Level:</Form.Label>
                <Form.Control type='number' placeholder='1' />
              </Form.Group>
              <Form.Group controlId='student-municipality'>
                <Form.Label>Municipality</Form.Label>
                <Form.Control
                  as='select'
                  value={municipality}
                  onChange={this.ChangeMunicipality}
                >
                  <option defaultValue>Select a Municipality</option>
                  <option>Mogpog</option>
                  <option>Boac</option>
                  <option>Gasan</option>
                  <option>Buenavista</option>
                  <option>Torrijos</option>
                  <option>Santa Cruz</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='student-barangay'>
                <Form.Label>Barangay</Form.Label>
                <Form.Control
                  as='select'
                  value={barangay}
                  onChange={this.ChangeBarangay}
                >
                  <option defaultValue>Select a Barangay</option>
                  {this.state.areas.map((area, index) => (
                    <option key={index} value={area.barangay}>
                      {area.barangay}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='student-address'>
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

export default StudentRegister;
