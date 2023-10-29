import { Typography, List, ListItem, ListItemText, Card, CardContent, Alert, AlertTitle, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes

const TestSummary = ({ result }) => {
    return (
        <Container sx={{ mt: 1 }}>
            <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6">
                        Thank you for submitting the test!
                    </Typography>
                    <Typography variant="body1">
                        Attempted: {result.questions.reduce((count) => {
                            return count + 1
                        }, 0)}
                    </Typography>
                    <Typography variant="body1">
                        Score: {result.questions.reduce((count, item) => {
                            return count + item.isCorrect
                        }, 0)}
                    </Typography>
                    <Link to={'/'}><Button variant='contained'>Go Home</Button></Link>
                </CardContent>
                <CardContent>
                    <Typography variant='body1'>
                        Here is the breakdown of your performance.
                    </Typography>
                </CardContent>
            </Card>
            <List>
                {result.questions.map((summary, index) => (
                    <Card key={index} sx={{ m: 2 }}>
                        <CardContent>
                            <Alert severity={summary.isCorrect ? 'success' : 'error'}>
                                <AlertTitle>{`Question: ${index + 1} `}</AlertTitle>
                            </Alert>
                            <ListItem >
                                <ListItemText
                                    primary={`Que. ${summary.question}`}
                                    secondary={`Your answer: ${summary.option}`}
                                />
                            </ListItem>
                        </CardContent>
                    </Card>
                ))}
            </List>
        </Container>
    );
};

// Define PropTypes for the 'result' prop
TestSummary.propTypes = {
    result: PropTypes.shape({
        finalScore: PropTypes.number.isRequired,
        questions: PropTypes.arrayOf(PropTypes.shape({
            question: PropTypes.string.isRequired,
            option: PropTypes.string.isRequired,
            isCorrect: PropTypes.bool.isRequired
        })).isRequired
    })
};
export default TestSummary;
