import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { listCases, deleteCase } from '../actions/covidActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const CovidList = ({ history, match }) => {
  const dispatch = useDispatch();
  const covidList = useSelector((state) => state.covidList);
  const { loading, error, cases } = covidList;
  const covidDelete = useSelector((state) => state.covidDelete);
  const { success: successDelete } = covidDelete;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const deleteHandler = (id) => {
    if (window.confirm('Are  you sure you want to  delete this record?')) {
      dispatch(deleteCase(id));
    }
  };
  const registerCovidCaseHandler = (covid) => {};
  useEffect(() => {
    if ((userInfo && userInfo.role === 'admin') || userInfo.role === 'client') {
      dispatch(listCases());
    } else {
      history.push('/user/login');
    }
  }, [userInfo, dispatch, history, successDelete]);
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Covid Cases</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={registerCovidCaseHandler}>
            <i className='fas fa-plus  px-1'></i>Add Covid Case
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Case Id</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Address</th>
              <th>Status</th>
              <th>Date Recorded</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((covid) => (
              <tr key={covid._id}>
                <td>{covid.caseId}</td>
                <td>{covid.gender}</td>
                <td>{covid.age}</td>
                <td>{covid.location.formattedAddress}</td>
                <td>{covid.status}</td>
                <td>{covid.createdAt}</td>
                <td>
                  <LinkContainer to={`/client/covid/${covid._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(covid._id)}
                  >
                    {' '}
                    <i className='fas fa-trash'></i>{' '}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default CovidList;
