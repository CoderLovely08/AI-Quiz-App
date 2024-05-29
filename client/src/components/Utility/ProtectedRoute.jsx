// src/components/PrivateRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Authentication/AuthContext';
import LoadingComponent from './Loading';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../../firebase';

const auth = getAuth(app);



const PrivateRoute = () => {
    const [loading, setLoading] = useState(true);
    const { login } = useAuth();
    const currentUser = useAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                login({ userName: user.displayName, userEmail: user.email, uId: user.uid });
                setLoading(false);
            } else {
                setLoading(false)
            }
        });
    }, []);

    if (loading) {
        return <LoadingComponent open={loading} />;
    }

    return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;