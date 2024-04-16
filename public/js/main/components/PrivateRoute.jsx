import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
 const { currentUser } = useAuth();

 return (
    <Route
      {...rest}
      element={currentUser ? element : <Navigate to="/login" />}
    />
 );
};

export default PrivateRoute;
