import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

import {
    BOOKMARKED_RESTAURANTS_TEXT, 
    LAYOUT_TYPES, 
    SEARCH_RESTAURANTS_TEXT 
} from "../../constants";

import Map from "./Map";

function MapGrid(props) {
    const restaurants = useSelector(state => 
        props.type === LAYOUT_TYPES.SEARCH ? 
            state.restaurantReducer.restaurants : state.restaurantReducer.bookmarkedRestaurants);
    const restaurantMaps = restaurants.map((name) => <Map key={name} restaurantName={name} {...props} />)
    return (
        <div className="map-grid" style={{height:props.type === LAYOUT_TYPES.SEARCH ? "calc(100vh - 178px)" : "calc(100vh - 100px)"}}>
            <Typography variant="h2" mb={2}>{props.type === LAYOUT_TYPES.SEARCH ? SEARCH_RESTAURANTS_TEXT : BOOKMARKED_RESTAURANTS_TEXT} {`(${restaurants.length})`}</Typography>
            {restaurantMaps}
        </div>
    );
}
export default MapGrid;