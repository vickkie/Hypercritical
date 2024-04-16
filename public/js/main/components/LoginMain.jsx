import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Login from './LoginPage';
import Dashboard from './Dashboard'; // a Dashboard component
import ErrorBoundary from './ErrorBoundary';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';

const App = () => {
 return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          {/* Redirect to login if not logged in */}
          <Route path="*" element={<Login />} />
        </Routes>
      </ErrorBoundary>
    </Router>
 );
};

const renderApp = () => {
 const container = document.getElementById("loginpage");
 if (container) {
    const root = createRoot(container);
    root.render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );
 } else {
    console.error("Element with id 'loginpage' not found");
 }
};

document.addEventListener("DOMContentLoaded", renderApp);
