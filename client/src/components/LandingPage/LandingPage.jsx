import { useState } from 'react'
import { Link } from 'react-router-dom';
import {
    Typography,
    Button,
    Container,
    Grid,
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Card,
    CardContent,
    CardActions
} from '@mui/material';
import banner from '../../assets/images/banner.png';
import Navbar from '../Utility/Navbar';

const LandingPage = () => {

    const [open, setOpen] = useState(false);

    const handleStartTestClick = async () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleModeSelectAndClose = () => {
        setOpen(false);
    };


    return (
        <div>
            {/* App Bar */}
            <Navbar />

            {/* Hero Section */}
            <Container sx={{ p: 2, mt: 4 }}>
                <Grid container spacing={4}>
                    {/* Text about MCQ Quiz */}
                    <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h4" gutterBottom>
                                Welcome to MCQ Quiz
                            </Typography>
                            <Typography variant="body1" paragraph>
                                This is a platform for testing your knowledge with multiple-choice questions.
                                Get ready to challenge yourself!
                            </Typography>
                            <Button variant="contained" color="primary" onClick={handleStartTestClick}>
                                Start Test
                            </Button>
                        </Paper>
                    </Grid>

                    {/* Banner Image */}
                    <Grid item xs={12} md={6}>
                        <img src={banner} alt="Quiz Banner" style={{ width: '100%', height: 'auto', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }} />
                    </Grid>
                </Grid>
            </Container>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Select Test Type</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h5" component="div" gutterBottom>
                                        Training Mode
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        This mode allows you to practice and improve your skills without any time constraints.
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link to="/training-test" style={{ textDecoration: 'none' }}>
                                        <Button variant="contained" color="primary" onClick={() => handleModeSelectAndClose('training')}>
                                            Select Training Mode
                                        </Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h5" component="div" gutterBottom>
                                        Testing Mode
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        This mode simulates an actual test environment with time constraints and random questions.
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link to="/testing-test" style={{ textDecoration: 'none' }}>
                                        <Button variant="contained" color="secondary" onClick={() => handleModeSelectAndClose('testing')}>
                                            Select Testing Mode
                                        </Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default LandingPage;
