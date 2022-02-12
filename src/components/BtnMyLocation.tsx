import { useContext } from "react";
import { MapContext, PlacesContext } from "../context";

const BtnMyLocation = () => {

    const { isMapReady, map } = useContext( MapContext );
    const { userLocation } = useContext( PlacesContext );

    const handleClick = () => {

        if( !isMapReady && !map ) throw new Error('El mapa no esta listo');
        if( !userLocation ) throw new Error('No hay ubicacion de usuario');
        
        map?.flyTo({
            zoom: 14, 
            center: userLocation
        })
    }

    return (
        <button 
            onClick={ handleClick }
            className="btn btn-primary" 
            type="button"
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 999
            }}
        >
            Mi Ubicacion
        </button>        
    )
};

export default BtnMyLocation;
