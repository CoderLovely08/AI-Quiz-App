import { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button
} from '@mui/material';

import { signOut, getAuth } from 'firebase/auth';
import { app } from '../../firebase';
import { useAuth } from '../Authentication/AuthContext';
import { ShowDialog } from './ShowDialog';
import { Link } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

const Navbar = () => {
    const { isLoggedIn, user, logout } = useAuth();
    const auth = getAuth(app);
    const [open, setOpen] = useState(false);


    // Logout handler
    const handleLogoutUser = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleLogoutClick = async () => {
        await signOut(auth);
        logout();
        setOpen(false);
        enqueueSnackbar("Logout Successful", {
            variant: 'warning',
            autoHideDuration: 3000
        });
    }

    return (
        <div>
            <ShowDialog
                open={open}
                handleClose={handleClose}
                handleSubmitTest={handleLogoutClick}
                message="Are you sure you want to logout?"
            />
            <AppBar position="static" sx={{ backgroundColor: '#00BFA6' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to='/' style={{ color: 'white', textDecoration: 'none' }}>Quiz App</Link>
                    </Typography>
                    {!isLoggedIn ? (
                        <Link to={'/login'}>
                            <Button variant="contained">Login</Button>
                        </Link>
                    ) : (
                        <>
                            <Typography mx={2}>{user?.userName}</Typography>
                            <Button variant="contained" onClick={handleLogoutUser}>Logout</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;
