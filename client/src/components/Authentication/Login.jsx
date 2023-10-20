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
import GoogleIcon from '../../assets/images/icons/google.png'; // Import Google Icon SVG
import Navbar from '../Utility/Navbar';

import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack'

// Creating auth instance
const auth = getAuth(app);

const LoginPage = () => {

    const { login } = useAuth();
    // Redirect if the user is logged in
    onAuthStateChanged(auth, (user) => {
        if (user) {
            login({ userName: user.displayName, userEmail: user.email, uId: user.uid });
            navigateTo('/')
        }
    });

    const navigateTo = useNavigate();

    const handleGoogleSinginClick = () => {
        signInWithPopup(auth, googleProvider).then((result) => {
            login({ userName: result.user.displayName, userEmail: result.user.email, uId: result.user.uid });
            enqueueSnackbar("Login Successful", {
                variant: 'success',
                autoHideDuration: 3000
            });
        })
    }

    const handleGithubSinginClick = () => {
        signInWithPopup(auth, githubProvider).then((result) => {
            console.log(result);
            login({ userName: result.user.displayName, userEmail: result.user.email, uId: result.user.uid });
            enqueueSnackbar("Login Successful", {
                variant: 'success',
                autoHideDuration: 3000
            });
        })
    }
    return (
        <>
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
                                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} endIcon={
                                    <img src={GoogleIcon} alt="Google Icon" style={{ width: '24px', height: '24px' }} />
                                } onClick={handleGoogleSinginClick}>
                                    Login Using
                                </Button>
                                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}
                                    onClick={handleGithubSinginClick}>
                                    Github
                                </Button>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </>
    );
}

export default LoginPage;
