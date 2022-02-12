/* eslint import/no-webpack-loader-syntax: off */
import { useContext, useEffect, useReducer } from "react";
//@ts-ignore
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "!mapbox-gl";

import { PlacesContext, MapContext } from '../';
import { mapReducer } from "./mapReducer";
import { directionsApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/directions";

export interface MapState {
    isMapReady: boolean;
    map?: Map; 
    markers: Marker[];
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,
    markers: [],
}

export const MapProvider: React.FC = ({ children }) => {

    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
    const { places } = useContext( PlacesContext );

    useEffect(() => {

        state.markers.map( marker => marker.remove() );
        
        const newMarkers: Marker[] = [];

        for ( const place of places ) {

            const [ lng, lat ] = place.center;    
            const popup = new Popup().setHTML(`<h6>${ place.text_es }</h6> <p>${ place.place_name_es  }</p>`);
            const newMarker = new Marker().setLngLat([lng, lat]).setPopup( popup ).addTo( state.map! );

            newMarkers.push( newMarker );
        }

        dispatch({ type: 'setMarkers', payload: newMarkers });
        
        // TODO: limpiar polyline

    }, [ places ])
    

    const setMap = ( map: Map ) => {

        const myLocationPopup = new Popup().setHTML(`<h4>My Location</h4> <p>Current Location</p>`);
        
        new Marker({ color: '#61DAFB' })
                .setLngLat( map.getCenter() )
                .setPopup( myLocationPopup )
                .addTo( map );

        dispatch({
            type: 'setMap',
            payload: map
        })
    }

    const getRouteBetweenPoints = async ( start: [number, number], end: [number, number] ) => {

        const resp = await directionsApi.get<DirectionsResponse>(`/${ start.join(',') };${ end.join(',') }`);
        const { distance, duration, geometry } = resp.data.routes[0];

        const { coordinates: coords } = geometry;

        let kms = distance / 1000;
            kms = Math.round( kms * 100 );
            kms /= 100; // distance in km

        const minutes = Math.floor( duration / 60 );
        console.log({ kms, minutes });

        const bounce = new LngLatBounds(
            start,
            start
        );

        for (const coord of coords ) {
            bounce.extend( coord as [number, number] );
        }

        state.map?.fitBounds( bounce, {
            padding: 200,
        });

        // Polyline
        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords
                        }
                    }
                ]
            }
        }

        
        if( state.map?.getLayer('RouteString') ) {

            state.map.removeLayer('RouteString');
            state.map.removeSource('RouteString');
        }

        state.map?.addSource('RouteString', sourceData );

        state.map?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round',
            },
            paint: {
                'line-color': 'black',
                'line-width': 3
            }
        })
    }

    return (
        <MapContext.Provider value={{
            ...state,
            setMap,
            getRouteBetweenPoints
        }}>
            { children }
        </MapContext.Provider>
    );
};