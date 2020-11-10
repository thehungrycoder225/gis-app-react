import React from 'react';
import { Map, LayersControl, TileLayer } from 'react-leaflet';
const GeoMap = ({ children }) => {
  return (
    <>
      <Map
        className='leaflet-map-container'
        center={[13.3954112, 121.9563893]}
        zoom={11}
      >
        <LayersControl postion='top-right'>
          <LayersControl.BaseLayer checked name='Street Map'>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> <span className="h1 text-center text-dark">
        MARINDUQUE <span className=
        "text-danger h1"> COVID-19 Map</span>
      </span> '
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
        {children}
      </Map>
    </>
  );
};

export default GeoMap;
