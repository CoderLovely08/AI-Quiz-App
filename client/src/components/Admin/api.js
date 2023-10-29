// api.js
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { BASE_URL } from '../service/data';

export const fetchCategories = async () => {
    try {
        const response = await axios.get(BASE_URL + '/quiz/category');
        return response.data;
    } catch (error) {
        console.error(error);
        enqueueSnackbar(error.message, {
            variant: 'error'
        })
        throw error;
    }
}

export const addCategory = async (newCategoryName) => {
    try {
        const response = await axios.post(BASE_URL + '/quiz/category', { name: newCategoryName });
        return response.data;
    } catch (error) {
        console.error(error);
        enqueueSnackbar(error.message, {
            variant: 'error'
        })
        throw error;
    }
}

export const deleteCategory = async (categoryId) => {
    try {
        const response = await axios.delete(BASE_URL + '/quiz/category', { data: { id: categoryId } });
        return response.data;
    } catch (error) {
        console.error(error);
        enqueueSnackbar(error.message, {
            variant: 'error'
        })
        throw error;
    }
}

export const updateCategory = async (categoryId, categoryName) => {
    try {
        const response = await axios.put(BASE_URL + '/quiz/category', { id: categoryId, name: categoryName });
        return response.data;
    } catch (error) {
        console.error(error);
        enqueueSnackbar(error.message, {
            variant: 'error'
        })
        throw error;
    }
}
