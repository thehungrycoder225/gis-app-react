import geocoder from 'node-geocoder';
const NodeGeocoder = geocoder();

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null, // 'gpx', 'string', ...
};

const mapcoder = NodeGeocoder(options);

export default mapcoder;
