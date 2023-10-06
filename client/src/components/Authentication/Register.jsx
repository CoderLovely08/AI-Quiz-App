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

const RegistrationPage = () => {
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
                                <form>
                                    <TextField
                                        label="Full Name"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        required
                                    />
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
                                }>
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
