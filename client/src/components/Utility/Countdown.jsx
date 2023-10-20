import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, IconButton } from '@mui/material';
import { Alarm } from '@mui/icons-material';

const Countdown = ({ timeInMinutes }) => {
    const [seconds, setSeconds] = useState(timeInMinutes * 60);

    useEffect(() => {
        let timer = setInterval(() => {
            if (seconds > 0) {
                setSeconds(prevSeconds => prevSeconds - 1);
            } else {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [seconds]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <Box display="flex" alignItems="center">
            <IconButton>
                <Alarm />
            </IconButton>
            <Typography variant="h4" component="div">
                {formatTime(seconds)}
            </Typography>
        </Box>
    );
};

Countdown.propTypes = {
    timeInMinutes: PropTypes.number.isRequired,
};

export default Countdown;
