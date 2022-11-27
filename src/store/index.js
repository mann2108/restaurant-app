import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
    restaurants: [],
    bookmarkedRestaurants: [],
    toast: {
        type: "",
        message: ""
    }
};


const restaurantSlice = createSlice({
    initialState,
    name: "restaurant",
    reducers: {
        addRestaurant(state, action) {
            const ind = state.restaurants.indexOf(action.payload);
            if (ind === -1) state.restaurants.push(action.payload);
        },
        removeRestaurant(state, action) {
            const ind = state.restaurants.indexOf(action.payload);
            state.restaurants.splice(ind, 1);
        },
        addRestaurantInBookmark(state, action) {
            const ind = state.bookmarkedRestaurants.indexOf(action.payload);
            if (ind === -1) state.bookmarkedRestaurants.push(action.payload);
        },
        removeRestaurantFromBookmark(state, action) {
            const ind = state.bookmarkedRestaurants.indexOf(action.payload);
            state.bookmarkedRestaurants.splice(ind, 1);
        },
        setToastDetails(state, action) {
            state.toast = {
                type: action.payload.type,
                message: action.payload.message
            }
        },
        updateRestaurants(state, action) {
            state.restaurants = action.payload.slice();
        },
        updateBookmarkRestaurants(state, action) {
            state.bookmarkedRestaurants = action.payload.slice();
        }

    }
});

export const restaurantActions = restaurantSlice.actions;

const store = configureStore({
    reducer: {
        restaurantReducer: restaurantSlice.reducer
    }
});

export default store;
