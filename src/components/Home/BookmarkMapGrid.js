import { useSelector } from "react-redux";

import BookmarkMap from "./BookmarkMap";

function BookmarkMapGrid() {
    
    const restaurants = useSelector(state => state.restaurantReducer.bookmarkedRestaurants);
    const restaurantMaps = restaurants.map((name) => <BookmarkMap key={name} restaurantName={name} />)
    return (
        <>
            {restaurantMaps}
        </>
    );
}
export default BookmarkMapGrid;