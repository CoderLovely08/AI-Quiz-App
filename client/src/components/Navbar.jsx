import { Link } from 'react-router-dom'
import {
    AppBar,
    Toolbar,
    Typography,
    Button
} from '@mui/material';

import { useAuth } from './Authentication/AuthContext';

const Navbar = () => {
    const { isLoggedIn, user, logout } = useAuth();

    const handleLogoutUser = () => {
        logout();
    }
    return (
        <div>
            <AppBar position="static" sx={{ backgroundColor: '#00BFA6' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to='/' style={{ color: 'white', textDecoration: 'none' }}>Quiz App</Link>
                    </Typography>
                    {/* <Button variant="contained">Login</Button> */}
                    {!isLoggedIn ? (
                        <Link to='/login'>
                            <Button variant="contained">Login</Button>
                        </Link>
                    ) : (
                        <>
                            <Typography mx={2}>{user.userName}</Typography>
                            <Link to='/login'>
                                <Button variant="contained" onClick={handleLogoutUser}>Logout</Button>
                            </Link>
                        </>
                    )}
                </Toolbar>
            </AppBar></div>
    )
}

export default Navbar