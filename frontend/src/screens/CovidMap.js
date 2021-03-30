import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCases } from '../actions/covidActions';
import { Marker, Popup, FeatureGroup, CircleMarker } from 'react-leaflet';
import GeoMap from '../components/GeoMap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Icon } from 'leaflet';
import '../stylesheets/map.css';
import { Card, Container, Table } from 'react-bootstrap';
const CovidMap = () => {
  const dispatch = useDispatch();
  const covidList = useSelector((state) => state.covidList);
  const { loading, error, cases } = covidList;
  const zoomLevel = 11;
  const active = new Icon({
    iconUrl:
      'https://api.geoapify.com/v1/icon/?type=awesome&color=%23a10303&icon=virus&iconSize=large&strokeColor=%23070707&shadowColor=%23000000&noWhiteCircle&apiKey=f7698d440ea444c68ac3c32fc02e607a',
    iconSize: [20, 27],
  });
  useEffect(() => {
    if (!error) {
      dispatch(listCases());
    }
  }, [dispatch, error]);
  return (
    <Container fluid>
      <Card className='border-0 shadow p-4 rounded'>
        <GeoMap zoom={zoomLevel}>
          {loading ? (
            <Loader variant='danger' size='lg' />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
              {cases.map((el) => (
                <>
                  {el.status === 'Active' ? (
                    <FeatureGroup color='purple'>
                      <CircleMarker
                        center={[
                          el.location.coordinates[1],
                          el.location.coordinates[0],
                        ]}
                        radius={(50 * 5) / zoomLevel}
                        color={'white'}
                        fillColor={'red'}
                        fillOpacity={0.5}
                        weight={0.5}
                        opacity={0.5}
                      ></CircleMarker>
                      <CircleMarker
                        center={[
                          el.location.coordinates[1],
                          el.location.coordinates[0],
                        ]}
                        radius={(100 * 5) / zoomLevel}
                        color={'white'}
                        fillColor={'orange'}
                        fillOpacity={0.2}
                        weight={0.5}
                        opacity={0.3}
                      ></CircleMarker>
                      <Marker
                        key={el._id}
                        position={[
                          el.location.coordinates[1],
                          el.location.coordinates[0],
                        ]}
                        icon={active}
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
                    </FeatureGroup>
                  ) : null}
                </>
              ))}
            </>
          )}
        </GeoMap>
      </Card>
    </Container>
  );
};

export default CovidMap;
