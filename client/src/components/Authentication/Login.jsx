import { getAuth, GoogleAuthProvider, GithubAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
import { app } from "../../firebase";


/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom';
import {
    Container,
    Grid,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
} from '@mui/material';
import loginImage from '../../assets/images/login.png'; // Import your image here
import GoogleIcon from '../../assets/images/icons/google.png'; // Import Google Icon 
import GithubIcon from '../../assets/images/icons/github.png'; // Import Github Icon 
import ShieldIcon from '../../assets/images/icons/shield.png'; // Import Github Icon 
import Navbar from '../Utility/Navbar';

import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack'
import LoadingComponent from "../Utility/Loading";
import { useEffect, useState } from "react";

// Creating auth instance
const auth = getAuth(app);

const LoginPage = () => {

    const [open, setOpen] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                login({ userName: user.displayName, userEmail: user.email, uId: user.uid });
                navigateTo('/')
            } else {
                setOpen(false)
            }
        });
    }, []);

    const { login } = useAuth();
    // Redirect if the user is logged in
    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         login({ userName: user.displayName, userEmail: user.email, uId: user.uid });
    //         navigateTo('/')
    //     }
    // });

    const navigateTo = useNavigate();

    const handleGoogleSinginClick = () => {
        signInWithPopup(auth, googleProvider).then((result) => {
            login({ userName: result.user.displayName, userEmail: result.user.email, uId: result.user.uid });
            enqueueSnackbar("Login Successful", {
                variant: 'success',
                autoHideDuration: 3000
            });
            setOpen(true);
        })
    }

    const handleGithubSinginClick = () => {
        signInWithPopup(auth, githubProvider).then((result) => {
            login({ userName: result.user.displayName, userEmail: result.user.email, uId: result.user.uid });
            enqueueSnackbar("Login Successful", {
                variant: 'success',
                autoHideDuration: 3000
            });
        })
    }
    return (
        <>
            {/* Loading */}

            {open && <LoadingComponent open={open} />}

            {/* Navbar */}
            <Navbar />
            <Container sx={{ mt: 4 }}>
                <Card variant='outlined'>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <img src={loginImage} alt="Login" style={{ width: '100%', objectFit: 'cover' }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CardContent>
                                <Typography variant="h5" mb={2} textAlign="center">
                                    Login
                                </Typography>
                                <form>
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        required
                                        type="email"
                                    />
                                    <TextField
                                        label="Password"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        required
                                        type="password"
                                    />
                                    <Typography variant="body1" textAlign="left" style={{ fontSize: '12px' }}>
                                        <Link to="/forgot-password">Forgot Password?</Link>
                                    </Typography>
                                    <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 2 }}>
                                        Login
                                    </Button>
                                </form>
                                <Typography variant="body1" mt={2} textAlign="center">
                                    Don't have an account? <Link to="/register">Register</Link>
                                </Typography>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <Button variant="outlined" color="primary" fullWidth sx={{ mt: 2 }} startIcon={
                                        <img src={GoogleIcon} alt="Google Icon" style={{ width: '24px', height: '24px' }} />
                                    } onClick={handleGoogleSinginClick}>
                                        Login
                                    </Button>
                                    <Button variant="outlined" color="primary" fullWidth sx={{ mt: 2 }} startIcon={
                                        <img src={GithubIcon} alt="Google Icon" style={{ width: '24px', height: '24px' }} />
                                    } onClick={handleGithubSinginClick}>
                                        Login
                                    </Button>
                                </div>

                                <Link to={'/admin/home'}>
                                    <Button variant="outlined" color="primary" fullWidth sx={{ mt: 2 }} startIcon={
                                        <img src={ShieldIcon} alt="Google Icon" style={{ width: '24px', height: '24px' }} />
                                    }>
                                        Admin Login
                                    </Button>
                                </Link>


                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </>
    );
}

export default LoginPage;
