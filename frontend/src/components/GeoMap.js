import React from 'react';
import { Map, LayersControl, TileLayer } from 'react-leaflet';
const GeoMap = ({ children }) => {
  const mapToken =
    'pk.eyJ1IjoidGhlaHVuZ3J5Y29kZXIiLCJhIjoiY2tmZXg5cXptMDlmcTMxcXYzamhqbm1hOSJ9.X7KQ2n_1P8-zhNVP0ATPZQ';
  return (
    <>
      <Map
        className='leaflet-map-container'
        center={[13.3954112, 121.9563893]}
        zoom={11}
      >
        <LayersControl postion='top-right'>
          <LayersControl.BaseLayer name='Basic'>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> <span className="h1 text-center text-dark">
        MARINDUQUE <span className=
        "text-danger h1"> COVID-19 Map</span>
      </span> '
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer checked name='Street'>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={`https://api.mapbox.com/styles/v1/thehungrycoder/ckfs39y5u11cu19mutrmbbbrt/tiles/256/{z}/{x}/{y}@2x?access_token=${mapToken}`}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name='Satellite'>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={`https://api.mapbox.com/styles/v1/thehungrycoder/ckhe90qr9085v19musnx5nxua/tiles/256/{z}/{x}/{y}@2x?access_token=${mapToken}`}
            />
          </LayersControl.BaseLayer>
          {children}
        </LayersControl>
      </Map>
    </>
  );
};

export default GeoMap;
