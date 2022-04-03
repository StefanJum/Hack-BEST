import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import ReactDOM from 'react-dom';
import GooglePanel from './SignIn.js'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <MuiLink color="inherit" href="https://google.com/">
                OurName
            </MuiLink>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const responseGoogle = (response) => {
  console.log(response);
}

    //const responseGoogle = (googleUser) => {
            //console.log(JSON.stringify(googleUser));
            //const idToken = googleUser.getAuthResponse().id_token;
            //const googleEmail = googleUser.profileObj.email;
            //console.log('The id_token is ' + idToken)
            //localStorage.setItem('idToken', idToken);
            //localStorage.setItem('googleEmail', googleEmail);
            //props.history.push(props.onLogin);
        //};

    //const responseGoogle = (googleUser) => {
            //console.log(JSON.stringify(googleUser));
            //const idToken = googleUser.getAuthResponse().id_token;
            //const googleEmail = googleUser.profileObj.email;
            //console.log('The id_token is ' + idToken)
            //localStorage.setItem('idToken', idToken);
            //localStorage.setItem('googleEmail', googleEmail);
            ////props.history.push(props.onLogin);
        //};

export default function SignIn() {

    const history = useNavigate();
    const [state, setState] = React.useState({ email: "", password: ""});

    return (
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/featured/?farming)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
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
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Pagină Autentificare
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                onChange = {setEmail}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Adresă de Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                onChange = {setPassword}
                                margin="normal"
                                required
                                fullWidth
                                name="parola"
                                label="Parolă"
                                type="password"
                                id="parola"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Ține-ma minte"
                            />
                            <Button
                                onClick = {checkLogin}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Înregistrare
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <MuiLink href="#" variant="body2">
                                    </MuiLink>
                                </Grid>
                                <Grid item>
                                    <MuiLink component={RouterLink} to={'/signup'}  href="/signup" variant="body2">
                                        {"Nu ai un cont? Autetifică-te aici"}
                                    </MuiLink>
                                </Grid>
                            </Grid>
	            <GoogleLogin
	                clientId="105844715068481158478"
	                buttonText="Login with Google"
	                onSuccess={responseGoogle}
	                onFailure={responseGoogle}
	                cookiePolicy={'single_host_origin'}
	            />
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
    );

    function setEmail(event){
        setState({email:event.target.value, password: state.password})
    }

    function setPassword(event){
        setState({password:event.target.value, email: state.email} )
    }

    function checkLogin(){
    localStorage.removeItem("idUser");
    axios.post("http://localhost:4200/api/users/login", {
            email: state.email,
            password: state.password
    }).then(response => {
        localStorage.setItem("idUser", response.data.id);
    }).catch(error => {
        console.log(error)
        //alert('Ceva nu a mers bine! Asigura-te ca datele introduse sunt corecte si ca ti-ai activat contul!')
    });
    history("/dashboard");
    }
}
