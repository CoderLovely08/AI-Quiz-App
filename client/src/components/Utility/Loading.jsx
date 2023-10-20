import {
    CircularProgress,
    Backdrop
} from '@mui/material';
import './styles.css'

const LoadingComponent = ({ open }) => {
    return (
        // <div className="loading-overlay">
        //     <div className="loading-icon">
        //         <CircularProgress />
        //     </div>
        // </div>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default LoadingComponent;
