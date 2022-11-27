import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from 'react-cookie';

import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@emotion/react';

import API from '../../api';
import Alert from '../Shared/Alert';
import { 
    LOGO_TEXT, 
    LOGO_IMAGE_URL,
    SIGN_IN_TEXT,
    FORGOT_PASSWORD_TEXT,
    DONT_HAVE_AN_ACCOUNT_TEXT,
    AUTHENTICATION_FAILED_TEXT,
    NAME_CANNOT_BE_EMPTY_TEXT,
    PASSWORD_CANNOT_BE_EMPTY_TEXT
} from '../../constants';
import SideView from "./SideView";
import { restaurantActions } from "../../store";

function LoginForm() {
    const history = useHistory();
    const theme = useTheme();
    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['user_session']);
    
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [nameHelperText, setNameHelperText] = useState("");
    const [passwordHelperText, setPasswordHelperText] = useState("");
    const toastMessage = useSelector(state => state.restaurantReducer.toast.message);
    const toastType = useSelector(state => state.restaurantReducer.toast.type);
    const [isLoading, setIsLoading] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);
        if (event.target.value === "") {
            setNameHelperText(NAME_CANNOT_BE_EMPTY_TEXT);
        } else {
            setNameHelperText("");
        }
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        if (event.target.value === "") {
            setPasswordHelperText(PASSWORD_CANNOT_BE_EMPTY_TEXT);
        } else {
            setPasswordHelperText("");
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        var isNameValid = true;
        var isPasswordValid = true;
        if (name === "") {
            setNameHelperText(NAME_CANNOT_BE_EMPTY_TEXT);
            isNameValid = false;
        }
        if (password === "") {
            setPasswordHelperText(PASSWORD_CANNOT_BE_EMPTY_TEXT);
            isPasswordValid = false;
        }
        if (isNameValid && isPasswordValid) {
            verifyNameAndPassword();
        }
    };

    const verifyNameAndPassword = () => {
        setIsLoading(true);
        API.get('/credenitals', {
            params: { filterByFormula: `SEARCH("${name}", username)`}
        })
        .then(res => {
            const data = res.data.records;
            const record = data.find(record => {
                return record.fields.username === name && record.fields.password === password;
            });
            if (record) {
                setCookie("user_session", {searched_restaurants: [], bookmarked_restaurants: []}, {maxAge: 172800});
                history.push("/home");
            } else {
                dispatch(restaurantActions.setToastDetails(
                    {type: "error", message: AUTHENTICATION_FAILED_TEXT}
                ));
                setTimeout(() => {
                    dispatch(restaurantActions.setToastDetails(
                        {type: "", message: ""}
                    ));
                }, 1000)
            }
            setIsLoading(false);
        })
        .catch(err => {
            console.error(err);
            dispatch(restaurantActions.setToastDetails(
                {type: "error", message: err.message}
            ));
            setTimeout(() => {
                dispatch(restaurantActions.setToastDetails(
                    {type: "", message: ""}
                ));
            }, 1000)
            setIsLoading(false);
        });
    }
    
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <SideView />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >                        
                    <img height="100px" alt={LOGO_TEXT} src={LOGO_IMAGE_URL} />
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} >    
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                helperText={nameHelperText}
                                onChange={handleNameChange}
                                error={nameHelperText !== ""}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                helperText={passwordHelperText}
                                onChange={handlePasswordChange}
                                error={passwordHelperText !== ""}
                            />
                            <LoadingButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                loading={isLoading}
                                color="primary"
                            >
                                {SIGN_IN_TEXT}
                            </LoadingButton>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        {FORGOT_PASSWORD_TEXT}
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {DONT_HAVE_AN_ACCOUNT_TEXT}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                        { toastMessage !== "" &&
                            <Alert severity={toastType} style={{position: "absolute", bottom: 30, align: "center"}}>{toastMessage}</Alert>
                        }
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>  
    );
}

export default LoginForm;