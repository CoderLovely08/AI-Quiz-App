import Navbar from "../Utility/Navbar";
import { useAuth } from '../Authentication/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import CategoryTable from './CategoryTable';
import QuestionsTable from './QuestionsTable';

const AdminHomePage = () => {
    const { isLoggedIn, user } = useAuth();
    const navigateTo = useNavigate();

    // Redirect if the user is not logged in
    useEffect(() => {
        if (!isLoggedIn) {
            navigateTo('/admin/login')
        }
    }, [isLoggedIn]);


    return (
        <div>
            <Container sx={{ p: 2, mt: 4 }}>
                <h1>Welcome <strong>{user?.userName}</strong></h1>
                <p>Here you can manage various admin-related tasks.</p>

                <CategoryTable /> {/* Render the CategoryTable component */}
                <QuestionsTable /> {/* Render the CategoryTable component */}
            </Container>
        </div>
    );
}

export default AdminHomePage;
