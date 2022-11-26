import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import MuiAlert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import API from '../../api';

import { 
    LOGO_TEXT, 
    LOGO_IMAGE_URL,
    SIGN_IN_TEXT,
    FORGOT_PASSWORD_TEXT,
    DONT_HAVE_AN_ACCOUNT_TEXT
} from '../../constants';
import WelcomeTemplate from "./WelcomeTemplate";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

function LoginForm() {
    const history = useHistory();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [nameHelperText, setNameHelperText] = useState("");
    const [passwordHelperText, setPasswordHelperText] = useState("");
    const [authenticationErrorMessage, setAuthenticationErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const handleNameChange = (event) => {
        if (authenticationErrorMessage !== "") setAuthenticationErrorMessage("");
        setName(event.target.value);
        if (event.target.value === "") {
            setNameHelperText("Name cannot be empty");
        } else {
            setNameHelperText("");
        }
    }

    const handlePasswordChange = (event) => {
        if (authenticationErrorMessage !== "") setAuthenticationErrorMessage("");
        setPassword(event.target.value);
        if (event.target.value === "") {
            setPasswordHelperText("Password cannot be emtpy");
        } else {
            setPasswordHelperText("");
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        var isNameValid = true;
        var isPasswordValid = true;
        if (name === "") {
            setNameHelperText("Name cannot be emtpy");
            isNameValid = false;
        }
        if (password === "") {
            setPasswordHelperText("Password cannot be emtpy");
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
            if (record != null) {
                history.push("/home");
            } else {
                setAuthenticationErrorMessage("Authentication Failed")
            }
            setIsLoading(false);
        })
        .catch(err => {
            console.error(err);
            setIsLoading(false);
        });
    }
    
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <WelcomeTemplate />
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
                        { authenticationErrorMessage !== "" &&
                            <Alert severity="error" style={{position: "absolute", bottom: 30, align: "center"}}>{authenticationErrorMessage}</Alert>
                        }
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>  
    );
}

export default LoginForm;