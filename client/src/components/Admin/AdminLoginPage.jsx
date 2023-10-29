// Assuming this is your AdminLoginPage.js file
import { useState } from 'react'
import { Link } from 'react-router-dom';
import {
    Container,
    Grid,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    InputAdornment,
    IconButton
} from '@mui/material';

import {
    Visibility,
    VisibilityOff
} from "@mui/icons-material";
// Import utilities
import Navbar from '../Utility/Navbar';
import LoadingComponent from '../Utility/Loading';


import { useAuth } from '../Authentication/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


// Import Axios for HTTP requests
import Axios from 'axios'
import { enqueueSnackbar } from 'notistack';

// const ADMIN_LOGIN_URL = 'https://repulsive-puce-sombrero.cyclic.app/admin/login'
const ADMIN_LOGIN_URL = 'http://localhost:3000/admin/login'

const AdminLoginPage = () => {
    const { isLoggedIn, login } = useAuth();

    const navigateTo = useNavigate();

    // Redirect if the user is logged in
    useEffect(() => {
        if (isLoggedIn) {
            navigateTo('/admin/home')
        }
    }, [isLoggedIn]);

    const [loading, setLoading] = useState(false);


    const [formData, setFormData] = useState({
        username: '',
        password: '',
        showPassword: false,
    });

    const toggleShowPassword = () => {
        setFormData({ ...formData, showPassword: !formData.showPassword });
    };

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await Axios.post(ADMIN_LOGIN_URL, {
                username: formData.username,
                password: formData.password
            });

            if (response.data.statusCode == 200) {
                login({
                    adminId: response.data.admin_id,
                    userName: response.data.admin_name
                })
            }
            enqueueSnackbar(response.data.message, {
                variant: response.data.statusCode == 200 ? 'success' : 'error',
                autoHideDuration: 3000
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {loading && <LoadingComponent open={loading} />} {/* Use the LoadingComponent */}
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
                                        value={formData.username}
                                        onChange={((e) => setFormData({ ...formData, username: e.target.value }))}
                                    />
                                    <TextField
                                        label="Password"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        required
                                        type={formData.showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={toggleShowPassword} edge="end">
                                                        {formData.showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
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