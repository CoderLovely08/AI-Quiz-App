/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom';
import {
    Container,
    Grid,
    Card,
    CardContent,
    TextField,
    Button,
    IconButton, // Add this import
    Typography,
} from '@mui/material';
import loginImage from '../../assets/images/login.png'; // Import your image here
import GoogleIcon from '../../assets/images/icons/google.png'; // Import Google Icon SVG
import Navbar from '../Navbar';

const LoginPage = () => {
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
                                    <IconButton>
                                        <img src={GoogleIcon} alt="Google Icon" style={{ width: '24px', height: '24px' }} />
                                    </IconButton>
                                }>
                                    Login Using
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
