import { useDispatch } from "react-redux";
import { CardContent, Card, Button, Stack, Typography } from "@mui/material";

import { restaurantActions } from "../../store";
import { 
    BOOKMARK_TEXT, 
    DATA_STUDIO_URL, 
    LAYOUT_TYPES, 
    REMOVE_TEXT, 
    RESTAURANT_MOVED_TO_BOOKMARKS_TEXT, 
    RESTAURANT_REMOVED_TEXT
} from "../../constants";

function Map(props) {
    const dispatch = useDispatch();
    const addToBookmark = () => {
        dispatch(restaurantActions.addRestaurantInBookmark(props.restaurantName));
        dispatch(restaurantActions.removeRestaurant(props.restaurantName));
        dispatch(restaurantActions.setToastDetails(
            {type: "success", message: RESTAURANT_MOVED_TO_BOOKMARKS_TEXT}
        ));
        setTimeout(() => {
            dispatch(restaurantActions.setToastDetails(
                {type: "", message: ""}
            ));
        }, 1000)
    }
    const removeRestaurant = () => {
        dispatch(restaurantActions.removeRestaurant(props.restaurantName));
        dispatch(restaurantActions.setToastDetails(
            {type: "success", message: RESTAURANT_REMOVED_TEXT}
        ));
        setTimeout(() => {
            dispatch(restaurantActions.setToastDetails(
                {type: "", message: ""}
            ));
        }, 1000)
    }
    const removeRestaurantFromBookmark = () => {
        dispatch(restaurantActions.removeRestaurantFromBookmark(props.restaurantName));
        dispatch(restaurantActions.setToastDetails(
            {type: "success", message: RESTAURANT_REMOVED_TEXT}
        ));
        setTimeout(() => {
            dispatch(restaurantActions.setToastDetails(
                {type: "", message: ""}
            ));
        }, 1000)
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
                            <Button variant="contained" onClick={removeRestaurant}>{REMOVE_TEXT}</Button>
                            <Button variant="contained" onClick={addToBookmark}>{BOOKMARK_TEXT}</Button>
                        </>
                    }
                    { props.type === LAYOUT_TYPES.BOOKMARK && 
                        <Button variant="contained" onClick={removeRestaurantFromBookmark}>{REMOVE_TEXT}</Button>
                    }
                </Stack>
            </CardContent>
        </Card>
    );
}

export default Map;