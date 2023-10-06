import { Container, Typography, Button, Card, CardContent, CardActions, Grid } from '@mui/material';
import Navbar from '../Navbar';
import trainingImage from '../../assets/images/training-banner.png'; // Import your image here

const TrainingModeLanding = () => {

    const handleStartTestClick = () => {
        console.log("Test Started");
    }

    return (
        <>
            {/* Navbar */}
            <Navbar></Navbar>

            <Container sx={{ mt: 4 }}>
                <Card variant="outlined">
                    <Grid container>
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
                                    <ul>
                                        <li>The test will be exhaustive, meaning it will continue to send more questions until you submit the test.</li>
                                        <li>There will be no time limit.</li>
                                        <li>Once you are done, click on submit.</li>
                                        <li>You can always click on view answer to check the answer for the current question.</li>
                                        <li>No marking will be generated for the test.</li>
                                        <li>You can appear for the test multiple times.</li>
                                    </ul>
                                </Typography>

                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="primary" onClick={handleStartTestClick}>
                                    Start Training Test
                                </Button>
                            </CardActions>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </>
    );
}

export default TrainingModeLanding;
