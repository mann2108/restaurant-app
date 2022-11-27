import { useDispatch } from "react-redux";
import { CardContent, Card, Button, Stack } from "@mui/material";

import { restaurantActions } from "../../store";

function Map(props) {
    const dispatch = useDispatch();
    const addToBookmark = () => {
        dispatch(restaurantActions.addRestaurantInBookmark(props.restaurantName));
        dispatch(restaurantActions.removeRestaurant(props.restaurantName));
    }
    return (
        <Card sx={{ minWidth: 275, height: '450px' }}>
            <CardContent>
                <iframe width="100%" height="380px" src={`https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2.name2":"${props.restaurantName ?? ""}"}`}
                    frameBorder="0"
                    style={{border:0}} 
                    allowFullScreen
                    title={props.restaurantName} />
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={() =>  dispatch(restaurantActions.removeRestaurant(props.restaurantName))}>Remove</Button>
                    <Button variant="contained" onClick={addToBookmark}>Bookmark</Button>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default Map;