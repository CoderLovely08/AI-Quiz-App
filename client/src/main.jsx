import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AdminAuthProvider } from './components/Admin/AdminAuthContext.jsx';
import { AuthProvider } from './components/Authentication/AuthContext';
import { SnackbarProvider } from 'notistack'
import "./index.css";


ReactDOM.createRoot(document.getElementById('root')).render(
  <AdminAuthProvider>
    <AuthProvider>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </AuthProvider>
  </AdminAuthProvider>
)
