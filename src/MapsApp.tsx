
import { PlacesProvider, MapProvider } from './context';
import { HomePage } from './pages';

import './styles.css';

const MapsApp = () => {
  return (
      <PlacesProvider>
        <MapProvider>
          <HomePage />
        </MapProvider>
      </PlacesProvider>
  )
};

export default MapsApp;
