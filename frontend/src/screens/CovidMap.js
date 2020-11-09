import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCases } from '../actions/covidActions';
import {
  Map,
  Marker,
  CircleMarker,
  TileLayer,
  Popup,
  LayersControl,
} from 'react-leaflet';
import GeoMap from '../components/GeoMap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { HeatmapLayer } from 'react-leaflet-heatmap-layer';
import { Icon } from 'leaflet';
import '../stylesheets/map.css';
import { Card, Container, Table } from 'react-bootstrap';
const CovidMap = () => {
  const dispatch = useDispatch();
  const covidList = useSelector((state) => state.covidList);
  const { loading, error, cases } = covidList;

  useEffect(() => {
    if (!error) {
      dispatch(listCases());
    }
  }, [dispatch, error]);
  return (
    <Container fluid>
      <Card className='border-0 shadow p-4 rounded'>
        <GeoMap>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
              {cases.map((el) => (
                <Marker
                  key={el._id}
                  position={[
                    el.location.coordinates[1],
                    el.location.coordinates[0],
                  ]}
                >
                  <Popup>
                    <p className='text-danger h4 font-weight-bold my-3 text-center'>
                      Covid Case Details
                    </p>
                    <Table striped bordered hover responsive size='sm'>
                      <tbody className='text-uppercase text-center'>
                        <tr>
                          <th>Case Id</th>
                          <td>{el.caseId}</td>
                        </tr>
                        <tr>
                          <th>Gender</th>
                          <td>{el.gender}</td>
                        </tr>
                        <tr>
                          <th>Age</th>
                          <td>{el.age}</td>
                        </tr>
                        <tr>
                          <th>Location</th>
                          <td>{el.location.formattedAddress}</td>
                        </tr>
                        <tr>
                          <th>Status</th>
                          <td>{el.status}</td>
                        </tr>
                        <tr>
                          <th>Date Recorded</th>
                          <td>{el.createdAt}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Popup>
                </Marker>
              ))}
            </>
          )}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <></>
          )}
        </GeoMap>
      </Card>
    </Container>
  );
};

export default CovidMap;
