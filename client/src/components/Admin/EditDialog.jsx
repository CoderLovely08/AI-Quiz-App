import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from '@mui/material';
import { DEV_BASE_URL } from '../service/data';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import LoadingComponent from '../Utility/Loading';

const EditDialog = ({ questionData, open, categories, handleClose, updateCategoryName }) => {

    const [category, setCategory] = useState('');
    const [question, setQuestion] = useState(questionData.questionText);
    const [isLoading, setisLoading] = useState(false);
    
    useEffect(() => {
        // Set the initial question value when questionData changes
        setQuestion(questionData.questionText || '');
    }, [questionData]);
    
    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSave = () => {
        setisLoading(true);
        // Add your save logic here

        axios.put(DEV_BASE_URL + '/quiz/questions', {
            questionId: questionData.questionId,
            questionText: question,
            categoryId: category
        }).then(response => {
            setisLoading(false);
            setQuestion('');
            setCategory('');

            enqueueSnackbar(response.data.message, {
                variant: response.data.success ? 'success' : 'error',
                autoHideDuration: 3000
            });

            // Update category name in parent component
            // updateCategoryName(questionId, categories.find(item => item.category_id === category)?.category_name);

            handleClose(); // Close the dialog after saving
        }).catch(error => {
            enqueueSnackbar(error.response.data.message, {
                variant: 'error',
                autoHideDuration: 3000
            });
        })
    };

    return (
        <>
            <LoadingComponent open={isLoading} />

            <Dialog open={open} sx={{ m: 2, p:2 }}>
                <DialogTitle>Edit Question Category</DialogTitle>
                <DialogContent sx={{ p: 4 }}>
                    <FormControl fullWidth variant="outlined" sx={{ m: 1}}>
                        <TextField
                            id="question"
                            value={question}
                            label="Question"
                            multiline
                            maxRows={5}
                            required
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                    </FormControl>
                    <FormControl fullWidth variant="outlined" sx={{ m: 1 }}>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category"
                            value={category}
                            label="Category"
                            required
                            onChange={handleChange}
                        >
                            {
                                categories.map((item) => {
                                    return <MenuItem key={item.category_id} value={item.category_id}>{item.category_name}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">Cancel</Button>
                    <Button onClick={handleSave} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EditDialog;
