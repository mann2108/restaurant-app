import { useDispatch } from "react-redux";
import { CardContent, Card, Button, Stack, Typography } from "@mui/material";

import { restaurantActions } from "../../store";
import { 
    BOOKMARK_TEXT, 
    DATA_STUDIO_URL, 
    LAYOUT_TYPES, 
    REMOVE_TEXT 
} from "../../constants";

function Map(props) {
    const dispatch = useDispatch();
    const addToBookmark = () => {
        dispatch(restaurantActions.addRestaurantInBookmark(props.restaurantName));
        dispatch(restaurantActions.removeRestaurant(props.restaurantName));
    }
    return (
        <Card sx={{ border: 1, mt: 3, borderColor: 'primary.main' }}>
            <CardContent>
                <Typography color="primary">
                    {props.restaurantName}
                </Typography>
                <iframe width="100%" height="380px" src={`${DATA_STUDIO_URL}?params={"ds2.name2":"${props.restaurantName ?? ""}"}`}
                    frameBorder="0"
                    style={{border:0}} 
                    allowFullScreen
                    title={props.restaurantName} />
                <Stack spacing={2} direction="row" sx={{mt:2}}>
                    { props.type === LAYOUT_TYPES.SEARCH && 
                        <>
                            <Button variant="contained" onClick={() =>  dispatch(restaurantActions.removeRestaurant(props.restaurantName))}>Remove</Button>
                            <Button variant="contained" onClick={addToBookmark}>{BOOKMARK_TEXT}</Button>
                        </>
                    }
                    { props.type === LAYOUT_TYPES.BOOKMARK && 
                        <Button variant="contained" onClick={() =>  dispatch(restaurantActions.removeRestaurantFromBookmark(props.restaurantName))}>{REMOVE_TEXT}</Button>
                    }
                </Stack>
            </CardContent>
        </Card>
    );
}

export default Map;