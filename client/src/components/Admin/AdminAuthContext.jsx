import { createContext, useState, useContext } from 'react';

const AdminAuthContext = createContext();

const AdminAuthProvider = ({ children }) => {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [adminUser, setAdminUser] = useState(null);

    const adminLogin = (adminData) => {
        setIsAdminLoggedIn(true);
        setAdminUser(adminData);
    };

    const adminLogout = () => {
        setIsAdminLoggedIn(false);
        setAdminUser(null);
    };

    return (
        <AdminAuthContext.Provider value={{ isAdminLoggedIn, adminUser, adminLogin, adminLogout }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

const useAdminAuth = () => {
    const context = useContext(AdminAuthContext);
    if (!context) {
        throw new Error('useAdminAuth must be used within an AdminAuthProvider');
    }
    return context;
};

export { AdminAuthProvider, useAdminAuth };
