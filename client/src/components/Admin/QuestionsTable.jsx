// import { useState, useEffect } from 'react';
// import {
//     Button,
//     TextField,
//     FormControl,
//     FormLabel,
//     Select,
//     MenuItem,
//     Typography,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Box,
//     Grid,
//     CircularProgress
// } from '@mui/material';
// import axios from 'axios';

// const QuestionsTable = () => {
//     const [questions, setQuestions] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [newQuestion, setNewQuestion] = useState('');
//     const [options, setOptions] = useState(['', '', '', '']);
//     const [correctOption, setCorrectOption] = useState(0);
//     const [isTraining, setIsTraining] = useState(false);
//     const [selectedCategory, setSelectedCategory] = useState(categories.length > 0 ? categories[0].category_id : '');
//     const [isDialogOpen, setIsDialogOpen] = useState(false);

//     const fetchData = () => {
//         axios.get('http://localhost:3000/api/quiz/questions')
//             .then(result => {
//                 setQuestions(result.data);
//             })
//             .catch(error => console.error(error));

//         axios.get('http://localhost:3000/api/quiz/category')
//             .then(result => {
//                 setCategories(result.data);
//             })
//             .catch(error => console.error(error));
//     };

//     useEffect(() => {
//         setTimeout(() => {
//             fetchData();
//         }, 2000);
//     }, []);

//     const handleAddQuestion = async (e) => {
//         e.preventDefault();
//         const newQuestionData = {
//             question_id: questions.length + 1,
//             question_text: newQuestion,
//             options: options,
//             correct_option: correctOption,
//             category_id: selectedCategory,
//             is_training: isTraining
//         };
//         setQuestions([...questions, newQuestionData]);
//         console.log(newQuestionData);
//         const response = await axios.post('http://localhost:3000/api/quiz/questions', newQuestionData);

//         if (response.data.statusCode === 201) {
//             setNewQuestion('');
//             setOptions(['', '', '', '']);
//             setCorrectOption(0);
//             setSelectedCategory('');
//             setIsDialogOpen(false);
//             fetchData(); // Update the questions after adding a new one
//         }
//     }

//     const handleOptionChange = (e, index) => {
//         const updatedOptions = [...options];
//         updatedOptions[index] = e.target.value;
//         setOptions(updatedOptions);
//     }

//     return (
//         <>
//             <Box sx={{ my: 2, border: 1, p: 1, borderRadius: 2 }}>
//                 <Typography variant="h5" mb={2} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     Questions Management
//                     <Button variant="contained" color="primary" sx={{ m: 1 }} onClick={() => setIsDialogOpen(true)}>
//                         Add Question
//                     </Button>
//                 </Typography>

//                 <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
//                     <form action="" onSubmit={handleAddQuestion}>
//                         <DialogTitle>Add New Question</DialogTitle>
//                         <DialogContent>
//                             <Grid container spacing={2}>
//                                 <Grid item xs={12}>
//                                     <TextField
//                                         label="Question Text"
//                                         variant="standard"
//                                         fullWidth
//                                         required
//                                         value={newQuestion}
//                                         size="small"
//                                         onChange={(e) => setNewQuestion(e.target.value)}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <FormControl component="fieldset" fullWidth>
//                                         <FormLabel component="legend">Options</FormLabel>
//                                         {options.map((option, index) => (
//                                             <TextField
//                                                 sx={{ my: 1 }}
//                                                 key={index}
//                                                 label={`Option ${index + 1}`}
//                                                 variant="outlined"
//                                                 size="small"
//                                                 fullWidth
//                                                 required
//                                                 value={option}
//                                                 onChange={(e) => handleOptionChange(e, index)}
//                                             />
//                                         ))}
//                                     </FormControl>
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <FormControl fullWidth>
//                                         <FormLabel>Correct Option</FormLabel>
//                                         <Select
//                                             value={correctOption}
//                                             required
//                                             label="Age"
//                                             onChange={(e) => setCorrectOption(e.target.value)}
//                                         >
//                                             {options.map((option, index) => (
//                                                 <MenuItem key={index} value={index}>{`${option}`}</MenuItem>
//                                             ))}
//                                         </Select>
//                                     </FormControl>
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <FormControl fullWidth>
//                                         <FormLabel>Training Mode</FormLabel>
//                                         <Select
//                                             value={isTraining}
//                                             required
//                                             label="Training Mode"
//                                             onChange={(e) => setIsTraining(e.target.value)}
//                                         >
//                                             <MenuItem value={true}>Yes</MenuItem>
//                                             <MenuItem value={false}>No</MenuItem>
//                                         </Select>
//                                     </FormControl>
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <FormControl fullWidth>
//                                         <FormLabel>Category</FormLabel>
//                                         <Select
//                                             value={selectedCategory}
//                                             required
//                                             label="Select Category"
//                                             onChange={(e) => setSelectedCategory(e.target.value)}
//                                         >
//                                             {categories.map(category => (
//                                                 <MenuItem key={category.category_id} value={category.category_id}>
//                                                     {category.category_name}
//                                                 </MenuItem>
//                                             ))}
//                                         </Select>
//                                     </FormControl>
//                                 </Grid>

//                             </Grid>
//                         </DialogContent>

//                         <DialogActions>
//                             <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
//                             <Button
//                                 type='submit'
//                                 variant="contained"
//                                 color="primary"
//                             >
//                                 Add Question
//                             </Button>
//                         </DialogActions>
//                     </form>
//                 </Dialog>

//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead>
//                             <TableRow style={{ background: '#00BFA6' }}>
//                                 <TableCell style={{ color: 'white', border: '1px solid white', fontWeight: 'bold', fontSize: '18px' }}>ID</TableCell>
//                                 <TableCell style={{ color: 'white', border: '1px solid white', fontWeight: 'bold', fontSize: '18px' }}>Question Text</TableCell>
//                                 <TableCell style={{ color: 'white', border: '1px solid white', fontWeight: 'bold', fontSize: '18px' }}>Options</TableCell>
//                                 <TableCell style={{ color: 'white', border: '1px solid white', fontWeight: 'bold', fontSize: '18px' }}>Category</TableCell>
//                                 <TableCell style={{ color: 'white', border: '1px solid white', fontWeight: 'bold', fontSize: '18px' }}>Action</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {
//                                 questions.length == 0 ?
//                                     <TableRow>
//                                         <TableCell colSpan={5}>
//                                             <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                                                 <CircularProgress />
//                                             </Box>
//                                         </TableCell>
//                                     </TableRow>
//                                     : ''
//                             }
//                             {questions.map(question => (
//                                 <TableRow key={question.question_id}>
//                                     <TableCell>{question.question_id}</TableCell>
//                                     <TableCell>{question.question_text}</TableCell>
//                                     <TableCell>
//                                         {
//                                             question.options.map(
//                                                 (option, index) => {
//                                                     return (
//                                                         option.is_correct == true ? <li key={index}><strong>{option.option_text}</strong></li> : <li key={index}>{option.option_text}</li>
//                                                     )
//                                                 }
//                                             )
//                                         }
//                                     </TableCell>
//                                     <TableCell>{question.category_name}</TableCell>
//                                     <TableCell>
//                                         <Button variant='contained' color='success' sx={{ m: 1 }}>Edit</Button>
//                                         <Button variant='contained' color='error' sx={{ m: 1 }}>Delete</Button>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Box>
//         </>
//     );
// }

// export default QuestionsTable;


import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
    Button,
    Typography,
    Dialog,
    Box,
} from '@mui/material';
import axios from 'axios';

const QuestionsTable = () => {
    const [questions, setQuestions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctOption, setCorrectOption] = useState(0);
    const [isTraining, setIsTraining] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(categories.length > 0 ? categories[0].category_id : '');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const fetchData = () => {
        axios.get('http://localhost:3000/api/quiz/questions')
            .then(result => {
                setQuestions(result.data);
            })
            .catch(error => console.error(error));

        axios.get('http://localhost:3000/api/quiz/category')
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
        console.log(newQuestionData);
        const response = await axios.post('http://localhost:3000/api/quiz/questions', newQuestionData);

        if (response.data.statusCode === 201) {
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
        { field: 'questionText', headerName: 'Question Text', width: 150, flex: 1 },
        {
            field: 'options', headerName: 'Options', width: 150, flex: 1, renderCell: (params) => {
                return (
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {params.value.map((option, index) => (
                            <li key={index} style={{ marginBottom: '8px' }}>
                                {option.is_correct ? (
                                    <strong style={{ backgroundColor: '#00FF00' }}>{option.option_text}</strong>
                                ) : (
                                    option.option_text
                                )}
                            </li>
                        ))}
                    </ul>
                );
            }
        },
        { field: 'categoryName', headerName: 'Category', width: 150, flex: 1 },
        {
            field: 'isTraining', headerName: 'Mode', width: 150, flex: 1,
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
                    <Button variant='contained' color='success' sx={{ mx: 1 }}>Edit</Button>
                    <Button variant='contained' color='error' sx={{ m: 1 }}>Delete</Button>
                </div>
            ),
        },
    ];

    const rows = questions.map(question => ({
        id: question.question_id,
        questionText: question.question_text,
        options: question.options,
        categoryName: question.category_name,
        isTraining: question.is_training,
        actions: null, // Actions will be rendered using renderCell
    }));

    return (
        <>
            <Box sx={{ my: 2, border: 1, p: 1, borderRadius: 2 }}>
                <Typography variant="h5" mb={2} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Questions Management
                    <Button variant="contained" color="primary" sx={{ m: 1 }} onClick={() => setIsDialogOpen(true)}>
                        Add Question
                    </Button>
                </Typography>

                <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                    <form action="" onSubmit={handleAddQuestion}>
                        {/* ... Rest of your dialog content ... */}
                    </form>
                </Dialog>

                <div style={{ height: 400, overflowX: 'auto' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        autoHeight={false}
                        rowHeight={150}
                    />
                </div>
            </Box>
        </>
    );
}

export default QuestionsTable;
