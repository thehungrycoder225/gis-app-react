import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCases } from '../actions/covidActions';
import { Map, TileLayer } from 'react-leaflet';
// import { Icon } from 'leaflet';
import './map.css';
const CovidMap = () => {
  const dispatch = useDispatch();
  const covidList = useSelector((state) => state.covidList);
  const { cases } = covidList;
  const [record] = useState('');
  useEffect(() => {
    dispatch(listCases(record));
  }, [dispatch, record]);
  return (
    <Map
      className='leaflet-container'
      center={[13.402105, 121.944669]}
      zoom={12}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
      ></TileLayer>
      {console.log(cases)}
    </Map>
  );
};

export default CovidMap;
