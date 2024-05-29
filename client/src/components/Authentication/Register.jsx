// Firebase setup
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
const provider = new GoogleAuthProvider();
import { app } from "../../firebase";

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
import registrationImage from '../../assets/images/register.png'; // Import your image here
import GoogleIcon from '../../assets/images/icons/google.png'; // Import Google Icon SVG
import Navbar from '../Utility/Navbar';

import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from "notistack";

// Creating auth instance
const auth = getAuth(app);

const RegistrationPage = () => {
    const { isLoggedIn, login } = useAuth();

    const handleGoogleSignUpClick = () => {
        signInWithPopup(auth, provider).then((result) => {
            login({ userName: result.user.displayName, userEmail: result.user.email, uId: result.user.uid });
            enqueueSnackbar("Registration Succesful!", {
                variant: 'success',
                autoHideDuration: 3000
            });
        }).catch((error) => {
            console.error(error);
        })
    }

    const [newUserData, setNewUserData] = useState(null);
    const handleUserRegistration = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, newUserData.email, newUserData.password)
            .then(() => {
                // Signed up
                updateProfile(auth.currentUser, {
                    displayName: newUserData.userName
                }).then(() => {
                    enqueueSnackbar("Registration Succesful!", {
                        variant: 'success',
                        autoHideDuration: 3000
                    });
                }).catch((err) => {
                    console.error(err);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                if (errorCode === 'auth/email-already-in-use') {
                    enqueueSnackbar("Email already in use", {
                        variant: 'error',
                        autoHideDuration: 3000
                    });
                }
            });
    }


    const navigateTo = useNavigate();

    // Redirect if the user is logged in
    useEffect(() => {
        if (isLoggedIn) {
            navigateTo('/')
        }
    }, [isLoggedIn]);

    return (

        <>
            <Container sx={{ mt: 4 }}>
                <Card variant='outlined'>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <img src={registrationImage} alt="Registration" style={{ width: '100%', objectFit: 'cover' }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CardContent>
                                <Typography variant="h5" mb={2} textAlign="center">
                                    Register
                                </Typography>
                                <form onSubmit={handleUserRegistration}>
                                    <TextField
                                        label="Full Name"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        required
                                        onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                                    />
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        required
                                        type="email"
                                        onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                                    />
                                    <TextField
                                        label="Password"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        required
                                        type="password"
                                        onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                                    />
                                    <TextField
                                        label="Confirm Password"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        required
                                        type="password"
                                    />
                                    <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 2 }}>
                                        Register
                                    </Button>
                                </form>
                                <Typography variant="body1" mt={2} textAlign="center">
                                    Already have an account? <Link to="/login">Login</Link>
                                </Typography>
                                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} endIcon={
                                    <img src={GoogleIcon} alt="Google Icon" style={{ width: '24px', height: '24px' }} />
                                } onClick={handleGoogleSignUpClick}>
                                    Register Using
                                </Button>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </>
    );
}

export default RegistrationPage;
