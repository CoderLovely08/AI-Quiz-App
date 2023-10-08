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
    IconButton,
    Typography,
} from '@mui/material';
import registrationImage from '../../assets/images/register.png'; // Import your image here
import GoogleIcon from '../../assets/images/icons/google.png'; // Import Google Icon SVG
import Navbar from '../Navbar';

import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

// Creating auth instance
const auth = getAuth(app);

const RegistrationPage = () => {
    const { isLoggedIn, login } = useAuth();

    const handleGoogleSignUpClick = () => {
        signInWithPopup(auth, provider).then(() => {
            login();
        })
    }

    const [newUserData, setNewUserData] = useState(null);
    const handleUserRegistration = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, newUserData.email, newUserData.password)
            .then((userCredential) => {
                // Signed up
                updateProfile(auth.currentUser, {
                    displayName: newUserData.userName
                }).then((result) => {
                    console.log(result);
                    const user = userCredential.user;
                    console.log(user);
                    alert("Registration Succesfull!");
                    // ...
                }).catch((err) => {
                    console.log(err);
                });
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            });
    }

    console.log(newUserData);

    const navigateTo = useNavigate();

    // Redirect if the user is logged in
    useEffect(() => {
        console.log(isLoggedIn);
        if (isLoggedIn) {
            navigateTo('/')
        }
    }, [isLoggedIn]);

    return (

        <>
            {/* Navbar */}
            <Navbar />
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
                                    <IconButton>
                                        <img src={GoogleIcon} alt="Google Icon" style={{ width: '24px', height: '24px' }} />
                                    </IconButton>
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
