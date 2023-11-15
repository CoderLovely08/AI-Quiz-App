import PropTypes from 'prop-types'; // Import PropTypesr

import {
    Typography,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@mui/material';

const Question = ({ question, selectedOption, handleOptionChange }) => {
    return (
        <>
            <Typography variant="body1" paragraph style={{
                WebkitUserSelect: 'none',
                msUserSelect: 'none',
                userSelect: 'none'
            }}>
                {question.question_text}
            </Typography>
            {/* ... Image code ... */}
            <FormControl component="fieldset">
                <FormLabel component="legend">Options</FormLabel>
                <RadioGroup
                    value={selectedOption}
                    onChange={handleOptionChange}
                >
                    {question.options.map((option) => (
                        <FormControlLabel
                            style={{
                                WebkitUserSelect: 'none',
                                msUserSelect: 'none',
                                userSelect: 'none'
                            }}
                            key={option.option_id}
                            value={option.option_id}
                            control={<Radio />}
                            label={option.option_text}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </>
    );
};

// Define PropTypes for the component
Question.propTypes = {
    question: PropTypes.shape({
        question_text: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.shape({
            option_id: PropTypes.number.isRequired,
            option_text: PropTypes.string.isRequired
        })).isRequired
    }).isRequired,
    currentQuestion: PropTypes.number.isRequired,
    selectedOption: PropTypes.string,
    handleOptionChange: PropTypes.func.isRequired
};


export default Question;
