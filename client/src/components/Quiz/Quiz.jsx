import { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Alert,
    AlertTitle,
    Grid,
} from '@mui/material';
import Navbar from '../Utility/Navbar';
import LoadingComponent from '../Utility/Loading';
import axios from 'axios';
import { useAuth } from '../Authentication/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ShowDialog } from '../Utility/ShowDialog';
import TestSummary from './TestSummary';
import Question from './Question';
import { enqueueSnackbar } from 'notistack';

const Quiz = () => {
    const { isLoggedIn, user } = useAuth();

    const navigateTo = useNavigate();

    // Redirect if the user is logged in
    useEffect(() => {
        if (!isLoggedIn) {
            navigateTo('/login')
        }
    }, [isLoggedIn]);


    const [loading, isLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [userResponses, setUserResponses] = useState(new Map());
    const [testSummary, setTestSummary] = useState({
        finalScore: '',
        questions: []
    });
    const [alert, setAlert] = useState({
        isOpen: false,
        title: '',
        message: '',
    });
    const [questions, setQuestions] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const isTrainingMode = new URLSearchParams(window.location.search).get('isTrainingMode');
    useEffect(() => {
        // Fetch questions from API
        axios.get('http://localhost:3000/api/quiz/test/', {
            params: {
                'isTraining': isTrainingMode // Send as a custom header
            }
        })
            .then((response) => {
                setQuestions(response.data);
            })
            .catch((error) =>
                console.error('Error fetching questions:', error)
            );
    }, []);

    const handleOptionChange = (event) => {
        const selectedOptionValue = event.target.value;
        setSelectedOption(() => {
            const updatedResponses = new Map(userResponses);
            updatedResponses.set(
                questions[currentQuestion].question_id,
                selectedOptionValue
            );
            setUserResponses(updatedResponses);
            return selectedOptionValue
        });
        setAlert({ ...alert, isOpen: false });
    };

    const handleNext = () => {
        if (selectedOption !== null) {
            const updatedResponses = new Map(userResponses);
            updatedResponses.set(
                questions[currentQuestion].question_id,
                selectedOption
            );
            setUserResponses(updatedResponses);

            if (currentQuestion < questions.length - 1) {
                setSelectedOption(null);
                setCurrentQuestion((prev) => prev + 1);
            } else {
                setOpen(true);
            }
        } else {
            setAlert({
                isOpen: true,
                title: 'Warning',
                message: 'Please select an option before proceeding.',
            });
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmitTest = () => {
        const userResponsesArray = Array.from(userResponses);
        isLoading(true);
        setOpen(false);

        setTimeout(() => {
            axios.post('http://localhost:3000/api/quiz/test', {
                uId: user.uId,
                responses: userResponsesArray
            }).then(result => {
                setTestSummary({
                    finalScore: parseInt(result.data.result.finalScore),
                    questions: result.data.summary
                })
            }).then(() => {
                setSubmitted(true);
                isLoading(false);
                enqueueSnackbar("Test submitted successfully!", {
                    variant: 'info',
                    autoHideDuration: 3000
                });
            })
                .catch(error => console.log(error))
        }, 2500);
    };

    return (
        <>
            {/* Navbar component */}
            <Navbar />

            {/* Loading component */}
            {loading && <LoadingComponent open={loading} />}

            {/* To submit the test and process results */}
            <ShowDialog open={open} handleClose={handleClose} handleSubmitTest={handleSubmitTest} message={"Are you sure to submit the test?"} />

            <Card>
                {/* Display test summary */}
                {submitted ? (
                    <TestSummary result={testSummary} />
                ) : (
                    <CardContent>
                        {/* Alert message */}
                        {alert.isOpen && (
                            <Alert severity="error">
                                <AlertTitle>{alert.title}</AlertTitle>
                                {alert.message}
                            </Alert>
                        )}
                        <Typography variant="h5" gutterBottom>
                            Question {currentQuestion + 1}
                        </Typography>
                        {questions.length === 0 ? (
                            <LoadingComponent open={true} />
                        ) : (
                            <>
                                <Question
                                    question={questions[currentQuestion]}
                                    currentQuestion={currentQuestion}
                                    selectedOption={selectedOption}
                                    handleOptionChange={handleOptionChange}
                                />
                                <Grid container spacing={2} justifyContent='flex-end'>
                                    <Grid item>
                                        {isTrainingMode == 'true' ? (<>
                                            <Button sx={{ m: 1 }}
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                            >
                                                {/* {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'} */}
                                                Next
                                            </Button>
                                            <Button sx={{ m: 1 }}
                                                variant="contained"
                                                color="primary"
                                                onClick={handleSubmitTest}
                                            >
                                                {/* {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'} */}
                                                Submit
                                            </Button>
                                        </>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                            >
                                                {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
                                            </Button>
                                        )}
                                    </Grid>
                                </Grid>
                            </>
                        )}
                    </CardContent>)
                }
            </Card >
        </>
    );
};

export default Quiz;

