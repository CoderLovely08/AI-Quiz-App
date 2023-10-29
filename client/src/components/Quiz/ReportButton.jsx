import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react'
import { useAuth } from '../Authentication/AuthContext';
import { BASE_URL } from '../service/data'
import LoadingComponent from '../Utility/Loading';

const ReportButton = ({ questionId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [reportDescription, setReportDescription] = useState('');
    const { user } = useAuth();

    const handleClose = () => {
        setDisplayDialog(false);
    }
    const handleReportSubmit = () => {
        if (reportDescription.trim().length < 10) {
            enqueueSnackbar('Report description is too short, kindly elaborate it', {
                variant: 'warning',
                autoHideDuration: 3000
            })
            return
        }
        setIsLoading(false);

        axios.post(BASE_URL + '/report-question', {
            questionId: questionId,
            userId: user.uId,
            description: reportDescription
        }).then((response) => {

            setDisplayDialog(false);
            setIsLoading(false);
            enqueueSnackbar(response.data.message, {
                variant: 'info',
                autoHideDuration: 3000
            })
            handleClose();
        }).catch((error) => {

            enqueueSnackbar(error.message, {
                variant: 'error',
                autoHideDuration: 3000
            })
        })

    }
    return (
        <>
            {/* Loading component */}
            <LoadingComponent open={isLoading} />

            {/* Report Dialog */}
            <Dialog open={displayDialog}>
                <DialogTitle>Rerport discrepancy</DialogTitle>
                <DialogContent>
                    <Typography variant='body2' style={{ maxWidth: '200px' }}>
                        Are you sure that there exists some discrepancy in the question?
                    </Typography>
                    <InputLabel sx={{ mt: 2 }}>Describe the issue</InputLabel>
                    <TextField
                        multiline
                        rows={4}
                        value={reportDescription}
                        placeholder='Describe the issue, highlight the specific part of the question.'
                        required
                        onChange={(e) => setReportDescription(e.target.value)}
                    >
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">Cancel</Button>
                    <Button onClick={handleReportSubmit} variant="contained">Submit</Button>
                </DialogActions>
            </Dialog>
            <Button variant='contained' onClick={() => setDisplayDialog(true)}>Report</Button>
        </>
    )
}

export default ReportButton