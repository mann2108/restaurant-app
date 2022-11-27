import { useState, useEffect } from 'react';

import { Autocomplete, Button, TextField } from "@mui/material";
import { Stack } from '@mui/system';
import { useDispatch } from "react-redux";

import API from '../../api';
import { restaurantActions } from "../../store";
import { ADD_TEXT } from '../../constants';

function Search() {
    const dispatch = useDispatch();

    const [restaurantOptions, setRestaurantOptions] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState("");
    
    useEffect(() => {
        setLoading(true);
        API.get('/restaurants', {
            params: { 
                filterByFormula: `SEARCH("${searchText ?? ''}", Name)`,
                view: 'Grid view'
            }
        })
        .then((res) => {
            setRestaurantOptions(res.data.records ?? []);
            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setLoading(false);
        });
    },[searchText]);
    
    const handleInputChange = (event) => {
        setSelectedOption("");
        setSearchText(event.target.value);
    }
    const handleChange = (event) => {
        setSearchText(event.target.innerText);
        setSelectedOption(event.target.innerText);
    }
    const addRestaurant = () => {
        dispatch(restaurantActions.addRestaurant(searchText));
    }

    return (
        <Stack spacing={2} direction="row">
            <Autocomplete
                id="restaurants"
                options={restaurantOptions.map((option) => option.fields.Name)}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Search Restaurants" />}
                onInputChange={handleInputChange}
                onChange={handleChange}
                loading={loading}
                error={"true"}
            />
            <Button variant="contained" disabled={selectedOption === ""} onClick={addRestaurant}>{ADD_TEXT}</Button>
        </Stack>
    );
}

export default Search;