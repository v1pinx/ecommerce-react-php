import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ component: Component }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAdmin = async () => {
            const admin = localStorage.getItem('admin'); // Get token from localStorage
            if (!admin) {
                setIsAuthenticated(false);
                alert('You must be an admin to access this page');
                return;
            }

            setIsAuthenticated(true);
        };

        checkAdmin();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Show a loading indicator
    }

    return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default AdminProtectedRoute;
