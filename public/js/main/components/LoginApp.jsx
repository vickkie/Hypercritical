import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./LoginPage";
// import Dashboard from "./Dashboard";
import ErrorBoundary from "./ErrorBoundary";
import { AuthProvider, useAuth } from "./AuthContext"; // Ensure useAuth is exported from AuthContext
import PrivateRoute from "./PrivateRoute";
import styles from "./styles.module.css";
const isProduction = process.env.NODE_ENV === "production";
const Dashboard = isProduction ? require("./Dashboard").default : React.lazy(() => import("./Dashboard"));

const DashboardRoute = () => {
  const { currentUser } = useAuth();
  return currentUser ? (
    <div>
      {/* Use Suspense only if Dashboard is lazy-loaded */}
      {isProduction ? (
        <Dashboard />
      ) : (
        <Suspense fallback={<div className="spinner"></div>}>
          <Dashboard />
        </Suspense>
      )}
    </div>
  ) : null;
};

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardRoute />
                </PrivateRoute>
              }
            />
            {/* Redirect to login if not logged in */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </AuthProvider>
      </ErrorBoundary>
    </Router>
  );
};

const renderApp = () => {
  const container = document.getElementById("loginpage");
  if (container) {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    console.error("Element with your root id is not found");
  }
};

document.addEventListener("DOMContentLoaded", renderApp);
