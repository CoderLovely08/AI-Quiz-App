import {
    CircularProgress,
    Backdrop
} from '@mui/material';
import './styles.css'

const LoadingComponent = ({ open }) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: 15000 }}
            open={open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default LoadingComponent;
