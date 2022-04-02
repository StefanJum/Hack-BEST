import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <MuiLink color="inherit" href="https://google.com/">
                Siteul Nostru
            </MuiLink>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignUp() {

    const navigate = useNavigate()
    const [state, setState] = React.useState({email: "", password: "", name: "", phoneNumber: ""});

    return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Înregistrare
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange = {setName}
                                    autoComplete="given-name"
                                    name="nume"
                                    required
                                    fullWidth
                                    id="nume"
                                    label="Nume"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange = {setPhoneNumber}
                                    required
                                    fullWidth
                                    id="phoneNumber"
                                    label="Număr de Telefon"
                                    name="phineNumber"
                                    autoComplete="phone-number"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange = {setEmail}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Adresă de email"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange = {setPassword}
                                    required
                                    fullWidth
                                    name="parola"
                                    label="Parolă"
                                    type="password"
                                    id="parola"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                            </Grid>
                        </Grid>
                            <Button
                                onClick = {signUp}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Înregistrare
                            </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <MuiLink component={RouterLink} to={'/'} href="/signin" variant="body2">
                                    Ai deja un cont? Apasă aici
                                </MuiLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
    );

    function setName(event){
      setState({name:event.target.value, phoneNumber:state.phoneNumber, email: state.email, password: state.password})
    }

    function setPhoneNumber(event){
        setState({phoneNumber:event.target.value, password: state.password, email: state.email, name: state.name })
    }

    function setEmail(event){
        setState({email:event.target.value, password: state.password, name: state.name, phoneNumber:state.phoneNumber})
    }

    function setPassword(event){
        setState({password:event.target.value, phoneNumber:state.phoneNumber, email: state.email, name: state.name} )
    }

    function signUp(){
	localStorage.removeItem("idUser");
        navigate('/dashboard',  { replace: true })
        axios.post("http://localhost:4200/api/users/register", {
            ...state
        }).then(response => {
            localStorage.setItem("idUser", response.data.id);
        }).catch(error => {
            console.log(error)
            //alert('Ceva nu a mers bine! Asigura-te ca datele introduse sunt corecte si ca ti-ai activat contul!')
        });
    }
}
