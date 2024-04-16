import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the import path as necessary

const PrivateRoute = ({ children }) => {
 const { currentUser } = useAuth();

 if (!currentUser) {
    return <Navigate to="/login" />;
 }
 return children;
};

export default PrivateRoute;