import PropTypes from 'prop-types';

import {
    Button, Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@mui/material';

export function ShowDialog({ open, handleClose, handleSubmitTest, message }) {
    return (<Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
            {"Submit?"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {message}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button variant='outlined' onClick={handleClose}>Cancel</Button>
            <Button variant='contained' onClick={handleSubmitTest} autoFocus>
                Submit
            </Button>
        </DialogActions>
    </Dialog>);
}

// Prop types validation
ShowDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmitTest: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
};