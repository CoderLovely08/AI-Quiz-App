import { useState, useEffect } from 'react';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Typography,
    CircularProgress,
    Box
} from '@mui/material';
import axios from 'axios';


import { fetchCategories, addCategory, deleteCategory } from './api';
import { enqueueSnackbar } from 'notistack';

const CategoryTable = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            fetchCategories().then(data => setCategories(data));
        }, 1000);
    }, []);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

    // To add a new Category
    const handleAddCategory = async (e) => {
        e.preventDefault();
        const newCategory = {
            category_id: categories.length + 1,
            category_name: newCategoryName,
        };
        setCategories([...categories, newCategory]);

        // const response = await axios.post('http://localhost:3000/api/quiz/category', {
        //     name: newCategoryName,
        // })

        const response = await addCategory(newCategoryName);

        if (response.statusCode == 201) {
            setNewCategoryName('');
            setIsDialogOpen(false);
            enqueueSnackbar("New category added", {
                variant: 'success',
                autoHideDuration: 3000
            });
        } else {
            enqueueSnackbar("Unable to add category", {
                variant: 'warning',
                autoHideDuration: 3000
            });
        }
    }

    // To delete an existing category
    const handleDeleteCategory = async (categoryId) => {
        console.log(categoryId);
        const updatedCategories = categories.filter(category => category.category_id !== categoryId);

        deleteCategory(categoryId).then((response) => {
            if (response.statusCode === 204) {
                enqueueSnackbar("Category deleted", {
                    variant: 'error',
                    autoHideDuration: 3000
                });
                setCategories(updatedCategories);
            } else {
                enqueueSnackbar("Unable to delete Category", {
                    variant: 'warning',
                    autoHideDuration: 3000
                });
            }
        }).catch(err => {
            enqueueSnackbar(err, {
                variant: 'warning',
                autoHideDuration: 3000
            });
        })
        // axios.delete('http://localhost:3000/api/quiz/category', {
        //     data: { id: categoryId }
        // }).then(result => console.log(result))
    }

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editedCategoryId, setEditedCategoryId] = useState(null);
    const [editedCategoryName, setEditedCategoryName] = useState('');

    // to edit category details
    const handleEditCategory = (categoryId) => {
        const categoryToEdit = categories.find(category => category.category_id === categoryId);
        setEditedCategoryId(categoryId);
        setEditedCategoryName(categoryToEdit.category_name);
        setIsEditDialogOpen(true);
    }

    // To handle update category click
    const handleUpdateCategory = (e) => {
        e.preventDefault();
        const updatedCategories = categories.map(category =>
            category.category_id === editedCategoryId ? { ...category, category_name: editedCategoryName } : category
        );
        axios.put('http://localhost:3000/api/quiz/category', {
            id: editedCategoryId,
            name: editedCategoryName,
        })
        setCategories(updatedCategories);
        setIsEditDialogOpen(false);
    }

    return (
        <>
            <Box sx={{ my: 2, border: 1, p: 1, borderRadius: 2 }}>
                <Typography variant="h5" mb={2} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Category Management
                    <Button variant="contained" color="primary" sx={{ m: 1 }} onClick={() => setIsDialogOpen(true)}>
                        Add Category
                    </Button>
                </Typography>
                <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                    <form action="" onSubmit={handleAddCategory}>
                        <DialogTitle>Add New Category</DialogTitle>
                        <DialogContent>
                            <TextField
                                label="Category Name"
                                variant="standard"
                                fullWidth
                                required
                                value={newCategoryName}
                                size="small"
                                onChange={(e) => setNewCategoryName(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button
                                type='submit'
                                variant="contained"
                                color="primary"
                            >
                                Add Category
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
                <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
                    <form action="" onSubmit={handleUpdateCategory}>
                        <DialogTitle>Edit Category</DialogTitle>
                        <DialogContent>
                            <TextField
                                label="Category Name"
                                variant="standard"
                                fullWidth
                                required
                                value={editedCategoryName}
                                size="small"
                                onChange={(e) => setEditedCategoryName(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                            <Button
                                type='submit'
                                variant="contained"
                                color="primary"
                            >
                                Update Category
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow style={{ background: '#00BFA6' }}>
                                <TableCell style={{ color: 'white', border: '1px solid white', fontWeight: 'bold', fontSize: '18px' }}>ID</TableCell>
                                <TableCell style={{ color: 'white', border: '1px solid white', fontWeight: 'bold', fontSize: '18px' }}>Name</TableCell>
                                <TableCell style={{ color: 'white', border: '1px solid white', fontWeight: 'bold', fontSize: '18px' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                categories.length == 0 ?
                                    <TableRow>
                                        <TableCell colSpan={3}>
                                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                <CircularProgress />
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                    : ''
                            }
                            {categories.map(category => (
                                <TableRow key={category.category_id}>
                                    <TableCell>{category.category_id}</TableCell>
                                    <TableCell>{category.category_name}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="success" sx={{ m: 1 }} onClick={() => handleEditCategory(category.category_id)}>Edit</Button>
                                        <Button variant="contained" color="error" sx={{ m: 1 }} onClick={() => handleDeleteCategory(category.category_id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}

export default CategoryTable;
