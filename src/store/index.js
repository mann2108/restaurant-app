import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
    restaurants: [],
    bookmarkedRestaurants: []
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
