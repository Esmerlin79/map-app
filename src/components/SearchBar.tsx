import { useContext, useRef } from 'react';

import '../styles.css';
import { PlacesContext } from '../context';
import { SearchResults } from '.';

const SearchBar = () => {

    const { places, searchPlacesByTerm } = useContext( PlacesContext );

    const debounceRef = useRef<NodeJS.Timeout>();

    const onQueryChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        
        if( debounceRef.current ) clearTimeout( debounceRef.current );

        debounceRef.current = setTimeout(() => {
            searchPlacesByTerm( event.target.value );
        }, 350)

    }

    return (
        <div className="search-container">
            <input 
                type="text" 
                className='form-control'
                placeholder='Buscar lugar...'
                onChange={  onQueryChange }
            />
           { places.length > 0 && <SearchResults /> }
        </div>
    )
};

export default SearchBar;
