import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AdminAuthProvider } from './components/Admin/AdminAuthContext.jsx';
import { AuthProvider } from './components/Authentication/AuthContext';
import { SnackbarProvider } from 'notistack'
import "./index.css";
import { QAProvider } from './context/QAContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <AdminAuthProvider>
    <AuthProvider>
      <QAProvider>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </QAProvider>
    </AuthProvider>
  </AdminAuthProvider>
)
