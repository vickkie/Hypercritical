// src/index.js
import React from 'react';
import { createRoot } from "react-dom/client";
import Login from './LoginPage';
import ErrorBoundary from './ErrorBoundary';

const renderLoginpage = () => {
  const container = document.getElementById("loginpage");
  if (container) {
    const root = createRoot(container);
    root.render(
      <ErrorBoundary>
        <Login />
      </ErrorBoundary>);
  } else {
    console.error("Element with id 'not-found' not found");
  }
};

document.addEventListener("DOMContentLoaded", renderLoginpage);

