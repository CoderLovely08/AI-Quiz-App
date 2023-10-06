import { Link } from 'react-router-dom'
import {
    AppBar,
    Toolbar,
    Typography,
    Button
} from '@mui/material';
const Navbar = () => {
    return (
        <div>
            <AppBar position="static" sx={{ backgroundColor: '#00BFA6' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to='/' style={{ color: 'white', textDecoration: 'none' }}>Quiz App</Link>
                    </Typography>
                    <Link to='/login'>
                        <Button variant="contained">Login</Button>
                    </Link>
                </Toolbar>
            </AppBar></div>
    )
}

export default Navbar