import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
    Button,
    Typography,
    Dialog,
    Box,
    DialogTitle,
    DialogContent,
    Grid,
    TextField,
    FormLabel,
    FormControl,
    Select,
    MenuItem,
    DialogActions,
} from '@mui/material';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { BASE_URL } from '../service/data';
import { fetchCategories } from './api';
import EditDialog from './EditDialog';

const QuestionsTable = () => {
    const [questions, setQuestions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctOption, setCorrectOption] = useState(0);
    const [isTraining, setIsTraining] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(categories.length > 0 ? categories[0].category_id : '');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const fetchData = () => {
        axios.get(BASE_URL + '/quiz/questions')
            .then(result => {
                setQuestions(result.data);
            })
            .catch(error => console.error(error));

        axios.get(BASE_URL + '/quiz/category')
            .then(result => {
                setCategories(result.data);
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        setTimeout(() => {
            fetchData();
        }, 2000);
    }, []);

    const handleAddQuestion = async (e) => {
        e.preventDefault();
        const newQuestionData = {
            question_id: questions.length + 1,
            question_text: newQuestion,
            options: options,
            correct_option: correctOption,
            category_id: selectedCategory,
            is_training: isTraining
        };
        setQuestions([...questions, newQuestionData]);

        const response = await axios.post(BASE_URL + '/quiz/questions', newQuestionData);

        if (response.data.statusCode === 201) {
            enqueueSnackbar("New question added", {
                variant: 'success',
                autoHideDuration: 3000
            });
            setNewQuestion('');
            setOptions(['', '', '', '']);
            setCorrectOption(0);
            setSelectedCategory('');
            setIsDialogOpen(false);
            fetchData(); // Update the questions after adding a new one
        }
    }

    const handleOptionChange = (e, index) => {
        const updatedOptions = [...options];
        updatedOptions[index] = e.target.value;
        setOptions(updatedOptions);
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        {
            field: 'questionText', headerName: 'Question Text', width: 150, flex: 1,
            renderCell: (params) => {
                return (
                    <div style={{ whiteSpace: 'normal' }}>
                        {params.value}
                    </div>
                );
            }
        },
        {
            field: 'options', headerName: 'Options', width: 120, flex: 1, renderCell: (params) => {
                return (
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {params.value.map((option, index) => (
                            <li key={index} style={{ marginBottom: '8px' }}>
                                {option.is_correct ? (
                                    <strong style={{ backgroundColor: '#00FF00', padding: 4, borderRadius: 12 }}>{option.option_text}</strong>
                                ) : (
                                    option.option_text
                                )}
                            </li>
                        ))}
                    </ul>
                );
            }
        },
        { field: 'categoryName', headerName: 'Category', width: 100, flex: 1 },
        {
            field: 'isTraining', headerName: 'Mode', width: 100, flex: 1,
            renderCell: (params) => {
                return (
                    <strong>{params.value ? 'Training Mode' : 'Testing Mode'}</strong>
                )
            },
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <div>
                    <Button variant='contained' color='success' sx={{ mx: 1 }} onClick={() => handleEditCategoryForQuestion(params.value.questionId, params.value.questionText)}>Edit</Button>
                    <Button variant='contained' color='error' sx={{ m: 1 }}>Delete</Button>
                </div>
            ),
        },
    ];

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editableQuestionData, setEditableQuestionData] = useState({});

    const handleEditCategoryForQuestion = async (questionId, questionText) => {
        setCategories(await fetchCategories());
        setEditableQuestionData(() => {
            return {
                questionId: questionId,
                questionText: questionText
            }
        })
        setIsEditDialogOpen(true);
    }


    const handleEditDialogClose = () => {
        setIsEditDialogOpen(false);
    }


    const rows = questions.map(question => ({
        id: question.question_id,
        questionText: question.question_text,
        options: question.options,
        categoryName: question.category_name,
        isTraining: question.is_training,
        actions: {
            questionId: question.question_id,
            questionText: question.question_text,
        }, // Actions will be rendered using renderCell
    }));

    const updateCategoryName = (questionId, newCategoryName) => {
        setQuestions(prevQuestions =>
            prevQuestions.map(question =>
                question.id === questionId ? { ...question, categoryName: newCategoryName } : question
            )
        );
    };


    return (
        <>
            <EditDialog categories={categories} open={isEditDialogOpen} handleClose={handleEditDialogClose} questionData={editableQuestionData} updateCategoryName={updateCategoryName} />

            <Box sx={{ my: 2, border: 1, p: 1, borderRadius: 2 }}>
                <Typography variant="h5" mb={2} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Questions Management
                    <Box>
                        <Button variant="contained" color="primary" sx={{ m: 1 }} onClick={() => setRefresh(!refresh)}>
                            Refresh
                        </Button>
                        <Button variant="contained" color="primary" sx={{ m: 1 }} onClick={() => setIsDialogOpen(true)}>
                            Add Question
                        </Button>
                    </Box>
                </Typography>

                <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                    <form action="" onSubmit={handleAddQuestion}>
                        <DialogTitle>Add New Question</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Question Text"
                                        variant="standard"
                                        fullWidth
                                        required
                                        value={newQuestion}
                                        size="small"
                                        onChange={(e) => setNewQuestion(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl component="fieldset" fullWidth>
                                        <FormLabel component="legend">Options</FormLabel>
                                        {options.map((option, index) => (
                                            <TextField
                                                sx={{ my: 1 }}
                                                key={index}
                                                label={`Option ${index + 1}`}
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                required
                                                value={option}
                                                onChange={(e) => handleOptionChange(e, index)}
                                            />
                                        ))}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>Correct Option</FormLabel>
                                        <Select
                                            value={correctOption}
                                            required
                                            label="Age"
                                            onChange={(e) => setCorrectOption(e.target.value)}
                                        >
                                            {options.map((option, index) => (
                                                <MenuItem key={index} value={index}>{`${option}`}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>Training Mode</FormLabel>
                                        <Select
                                            value={isTraining}
                                            required
                                            label="Training Mode"
                                            onChange={(e) => setIsTraining(e.target.value)}
                                        >
                                            <MenuItem value={true}>Yes</MenuItem>
                                            <MenuItem value={false}>No</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <FormLabel>Category</FormLabel>
                                        <Select
                                            value={selectedCategory}
                                            required
                                            label="Select Category"
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                        >
                                            {categories.map(category => (
                                                <MenuItem key={category.category_id} value={category.category_id}>
                                                    {category.category_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                            </Grid>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button
                                type='submit'
                                variant="contained"
                                color="primary"
                            >
                                Add Question
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>

                <div style={{ height: 'auto', overflowX: 'auto' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSizeOptions={[10, 25, 50, 100]}
                        autoHeight={true}
                        rowHeight={200}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 10 } },
                        }}
                    />
                </div>
            </Box>
        </>
    );
}

export default QuestionsTable;
