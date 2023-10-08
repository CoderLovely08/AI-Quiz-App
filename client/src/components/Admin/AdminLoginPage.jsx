// Assuming this is your AdminLoginPage.js file
import { Link } from 'react-router-dom';
import { Container, Grid, Card, CardContent, TextField, Button, Typography } from '@mui/material';
import Navbar from '../Navbar';

const AdminLoginPage = () => {

    const handleAdminLogin = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <Navbar />
            <Container sx={{ mt: 4 }}>
                <Card variant='outlined'>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CardContent>
                                <Typography variant="h5" mb={2} textAlign="center">
                                    Admin Login
                                </Typography>
                                <form onSubmit={handleAdminLogin}>
                                    <TextField
                                        label="Admin Username"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        required
                                    />
                                    <TextField
                                        label="Password"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        required
                                        type="password"
                                    />
                                    <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 2 }}>
                                        Login
                                    </Button>
                                </form>
                                <Typography variant="body1" mt={2} textAlign="center">
                                    <Link to="/forgot-password">Forgot Password?</Link>
                                </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </>
    )
}

export default AdminLoginPage