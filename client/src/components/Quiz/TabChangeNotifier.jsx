import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const TabChangeNotifier = () => {
    const [displayDialog, setDisplayDialog] = useState(false);
    const handleVisibilityChange = () => {
        if (document.hidden) {
            // The tab is now hidden, notify the user
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

    return <>
        <Dialog open={displayDialog}>
            <DialogTitle>Your test is interrupted</DialogTitle>
            <DialogContent>
                <Typography variant='body2' style={{ maxWidth: '200px' }}>
                    A tab change can trigger this event, please avoid changing tabs during the test.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDisplayDialog(false)} variant="outlined">Cancel</Button>
            </DialogActions>
        </Dialog>
    </>;
};

export default TabChangeNotifier;
