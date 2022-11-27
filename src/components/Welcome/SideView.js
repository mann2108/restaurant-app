import Grid from '@mui/material/Grid';

import { BACKGROUND_IMAGE_URL } from '../../constants';

function SideView() {
    return (
        <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
            backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            }}
        />
    )
}

export default SideView;