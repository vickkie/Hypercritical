import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./LoginPage";
import ErrorBoundary from "./ErrorBoundary";
import { AuthProvider, useAuth } from "./AuthContext"; // Ensure useAuth is exported from AuthContext
import PrivateRoute from "./PrivateRoute";
import { ContextProviders } from "./Fragments/ContextProviders";

const isProduction = process.env.NODE_ENV === "production";

const Dashboard = isProduction ? require("./Dashboard").default : React.lazy(() => import("./Dashboard"));

const EditConsultation = isProduction
  ? require("./Fragments/EditConsultations").default
  : React.lazy(() => import("./Fragments/EditConsultations"));

const AddConsultation = isProduction
  ? require("./Fragments/AddConsultations").default
  : React.lazy(() => import("./Fragments/AddConsultations"));

const DashboardRoute = () => {
  const { currentUser } = useAuth();
  return currentUser ? (
    <div>
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
          <ContextProviders>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/edit/:uuid"
                element={
                  <PrivateRoute>
                    <Suspense fallback={<div>Loading...</div>}>
                      <EditConsultation />
                    </Suspense>
                  </PrivateRoute>
                }
              />

              <Route
                path="/newConsultation"
                element={
                  <PrivateRoute>
                    <Suspense fallback={<div>Loading...</div>}>
                      <AddConsultation />
                    </Suspense>
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/:status?"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              {/* Redirect to login if not logged in */}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </ContextProviders>
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
