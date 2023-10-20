import { useEffect } from 'react';
import { Container, Typography, Button, Card, CardContent, CardActions, Grid } from '@mui/material';
import Navbar from '../Utility/Navbar';

import { useAuth } from '../Authentication/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import trainingImage from '../../assets/images/training-banner.png'; // Import your image here
import { enqueueSnackbar } from 'notistack';

const TestingModeLanding = () => {
    const { isLoggedIn } = useAuth();
    const navigateTo = useNavigate();

    // Redirect if the user is not logged in
    useEffect(() => {
        if (!isLoggedIn) {
            enqueueSnackbar("Kidnly login to take a test", {
                variant: 'info',
                autoHideDuration: 2000
            });
            navigateTo('/login')
        }
    }, [isLoggedIn]);


    return (
        <>
            {/* Navbar */}
            <Navbar />

            <Container sx={{ mt: 4 }}>
                <Card variant="outlined">
                    <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                        <Grid item xs={12} sm={6}>
                            <img src={trainingImage} alt="Training" style={{ width: '100%' }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CardContent>
                                <Typography variant="h5" component="div" gutterBottom>
                                    Testing Mode Instructions
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    This mode allows you to test your skills with time constraints.
                                    You can review your answers at the end.
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                                    Additional Details:
                                </Typography>
                                <Typography variant="div" color="text.secondary">

                                    <li>Each question carries one mark. Your progress will be analyzed.</li>
                                    <li>The test contains 30 questions which must be completed in 30 minutes.</li>
                                    <li>You will find the submit button on the last question, and you cannot navigate between questions.</li>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={{ pathname: '/quiz', search: '?isTrainingMode=false' }}>
                                    <Button variant="contained" color="primary" >
                                        Start Test
                                    </Button>
                                </Link>
                            </CardActions>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </>
    );
}

export default TestingModeLanding;
