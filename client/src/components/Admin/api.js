// api.js
import axios from 'axios';

const API_BASE_URL = 'https://repulsive-puce-sombrero.cyclic.app/api/quiz';

export const fetchCategories = async () => {
    try {
        const response = await axios.get(API_BASE_URL + '/category');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const addCategory = async (newCategoryName) => {
    try {
        const response = await axios.post(API_BASE_URL + '/category', { name: newCategoryName });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteCategory = async (categoryId) => {
    try {
        const response = await axios.delete(API_BASE_URL + '/category', { data: { id: categoryId } });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateCategory = async (categoryId, categoryName) => {
    try {
        const response = await axios.put(API_BASE_URL + '/category', { id: categoryId, name: categoryName });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
