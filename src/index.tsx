/* eslint import/no-webpack-loader-syntax: off */
import React from 'react';
import ReactDOM from 'react-dom';
import MapsApp from './MapsApp';

import { MAPBOX_TOKEN } from './config/config';

//@ts-ignore
import mapboxgl from '!mapbox-gl';
 
mapboxgl.accessToken = MAPBOX_TOKEN;


if( !navigator.geolocation ) {
  alert('Tu navegador no tiene opcion de Geolocation');
  throw new Error('Tu navegador no tiene opcion de Geolocation');
}

ReactDOM.render(
  <React.StrictMode>
   <MapsApp />
  </React.StrictMode>,
  document.getElementById('root')
);
