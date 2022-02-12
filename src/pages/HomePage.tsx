import { BtnMyLocation, MapView, ReactLogo, SearchBar } from "../components";


const HomePage = () => {
    return (
        <div>
            <MapView /> 
            <BtnMyLocation />
            <ReactLogo />
            <SearchBar />
        </div>
    );
};

export default HomePage;
