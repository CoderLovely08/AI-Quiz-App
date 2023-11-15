import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

const TabChangeNotifier = ({ onWarningsChange }) => {
    const [displayDialog, setDisplayDialog] = useState(false);
    const [warnings, setWarnings] = useState(0);

    const handleVisibilityChange = () => {
        if (document.hidden) {
            // The tab is now hidden, notify the user
            setWarnings((prev) => prev + 1);
            setDisplayDialog(true);
        }
    };

    useEffect(() => {
        // Add event listener when the component mounts
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Remove event listener when the component unmounts
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        // Notify the parent component about the change in warnings
        onWarningsChange(warnings);
    }, [warnings, onWarningsChange]);

    return (
        <Dialog open={displayDialog}>
            <Typography variant='h6' style={{ textAlign: 'center' }}>
                Warnings: {warnings}/3
            </Typography>
            <DialogTitle>Your test is interrupted</DialogTitle>
            <DialogContent>
                <Typography variant='body2' style={{ maxWidth: '200px' }}>
                    A tab change can trigger this event; please avoid changing tabs during the test.
                    After 3 warning you will be disqualified.   
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDisplayDialog(false)} variant="outlined">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TabChangeNotifier;
