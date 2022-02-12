import axios from 'axios';


const directionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: 'pk.eyJ1IjoiZXNtZXJsaW43OSIsImEiOiJja3YxMnNyajA1d3F5MndvZmk4MG95aW15In0.klkiJqkKTA7xthZv5vvQTg'
    }
})

export default directionsApi;