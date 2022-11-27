import { useSelector } from "react-redux";

import Map from "./Map";

function MapGrid() {
    
    const restaurants = useSelector(state => state.restaurantReducer.restaurants);
    const restaurantMaps = restaurants.map((name) => <Map key={name} restaurantName={name} />)
    return (
        <>
            {restaurantMaps}
        </>
    );
}
export default MapGrid;