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
import Message from '../components/Message';
import Loader from '../components/Loader';
import { HeatmapLayer } from 'react-leaflet-heatmap-layer';
import { Icon } from 'leaflet';
import './map.css';
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
      <Card className='w-auto border-0 shadow p-4 rounded'>
        <Card.Title className='text-center p-1'>
          <span className='h1 text-primary'>
            MARINDUQUE <span className='text-danger h1'> COVID-19</span>{' '}
          </span>
        </Card.Title>
        <Map
          className='leaflet-container'
          center={[13.402105, 121.944669]}
          zoom={12}
        >
          <LayersControl postion='top-right'>
            <LayersControl.BaseLayer checked name='Street Map'>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name='Detail'>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
              />
            </LayersControl.BaseLayer>
          </LayersControl>
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
        </Map>
      </Card>
    </Container>
  );
};

export default CovidMap;
