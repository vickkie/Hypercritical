import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
 return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
 const [currentUser, setCurrentUser] = useState(null);

 // Add more auth related values and functions here

 const value = {
    currentUser,
    setCurrentUser,
 };

 return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
