import { useContext, useState } from "react";

import { LoadingPlaces } from ".";
import { MapContext, PlacesContext } from '../context';
import { Feature } from '../interfaces/places';

const SearchResults = () => {

    const { map, getRouteBetweenPoints } = useContext( MapContext );
    const { userLocation, places, isLoadingPlaces } = useContext( PlacesContext );

    const [activeId, setActiveId] = useState('');

    const onPlaceClicked = ( place: Feature ) => {

        const [ lng, lat ] = place.center;
        setActiveId( place.id );

        map?.flyTo({
            zoom: 14, 
            center: [ lng, lat ]
        })

    }

    const getRoute = ( place: Feature ) => {
        
        if( !userLocation ) return;

        getRouteBetweenPoints( userLocation, place.center as [number, number] );
    }

    if( isLoadingPlaces ) return <LoadingPlaces />

    return (
        <ul className="list-group mt-3">
            {
                places.map( place => (
                    <li
                        key={ place.id }
                        className={ ` ${ activeId === place.id && 'active' } list-group-item list-group-item-action pointer` }
                        onClick={ () => onPlaceClicked( place ) }
                    >
                        <h6>{ place.text_es }</h6>
                        <p style={{ fontSize: '12px'}}>
                            { place.place_name }
                        </p>
                        <button 
                            className={ `btn btn-sm ${ activeId === place.id ? 'btn-outline-light' : 'btn-outline-primary' }` }
                            onClick={ () => getRoute( place ) }
                        >
                            Direcciones
                        </button>
                    </li>
                ))
            }
        </ul>
    )
};

export default SearchResults;
