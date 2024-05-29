import { Container, Typography, Button, Card, CardContent, CardActions, Grid } from '@mui/material';
import Navbar from '../Utility/Navbar';
import trainingImage from '../../assets/images/training-banner.png'; // Import your image here


import { useEffect } from 'react';
import { useAuth } from '../Authentication/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';


const TrainingModeLanding = () => {

    const { isLoggedIn } = useAuth();

    const navigateTo = useNavigate();

    // Redirect if the user is logged in
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

            <Container sx={{ mt: 4 }}>
                <Card variant="outlined">
                    <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                        <Grid item xs={12} sm={6}>
                            <img src={trainingImage} alt="Training" style={{ width: '100%' }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CardContent>
                                <Typography variant="h5" component="" gutterBottom>
                                    Training Mode Instructions
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    This mode allows you to practice and improve your skills without any time constraints.
                                    You can take your time to answer each question and review your answers at the end.
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                                    Additional Details:
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>

                                    <li>The test will be exhaustive, meaning it will continue to send more questions until you submit the test.</li>
                                    <li>There will be no time limit.</li>
                                    <li>Once you are done, click on submit.</li>
                                    <li>You can always click on view answer to check the answer for the current question.</li>
                                    <li>No marking will be generated for the test.</li>
                                    <li>You can appear for the test multiple times.</li>
                                </Typography>

                            </CardContent>
                            <CardActions>
                                <Link to={{ pathname: '/quiz', search: '?isTrainingMode=true' }}>
                                    <Button variant="contained" color="primary">
                                        Start Training Test
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

export default TrainingModeLanding;
