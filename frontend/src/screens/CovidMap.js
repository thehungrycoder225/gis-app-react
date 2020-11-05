import React, { useState, useEffect } from 'react';
import { Map, Marker, Popoup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
import './map.css';
const CovidMap = () => {
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
    </Map>
  );
};

export default CovidMap;
