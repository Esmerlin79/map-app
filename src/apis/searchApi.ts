import axios from 'axios';


const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        language: 'es',
        access_token: 'pk.eyJ1IjoiZXNtZXJsaW43OSIsImEiOiJja3YxMnNyajA1d3F5MndvZmk4MG95aW15In0.klkiJqkKTA7xthZv5vvQTg'
    }
})

export default searchApi;