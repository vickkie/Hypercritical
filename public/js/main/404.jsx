import React from "react";
import { createRoot } from "react-dom/client";

const NotFound = () => {
  return (
    <React.Fragment>
      <div className="txt">
        <h1 className="delay main404">
          <span>4</span>
          <div className="tr__page404__lion"></div>
          <span>4</span>
        </h1>
        <p className="delay">Page not found. You are lost in the jungle.</p>
        <br />
        <br />
        <a href="index" className="prj_btn" style={{ width: "fit-content", gap: "10px" }}>
          <span>
            <span>
              <svg width="19" height="8" viewBox="0 0 19 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 4L15 0V3H0V5H15V8L19 4Z" fill="white" />
              </svg>
            </span>
          </span>
          <p style={{ textAlign: "center" }}>Go back to homepage</p>
        </a>
      </div>
    </React.Fragment>
  );
};

// Function to render the NotFound component
const renderNotFound = () => {
  const container = document.getElementById("not-found");
  if (container) {
    const root = createRoot(container);
    root.render(<NotFound />);
  } else {
    console.error("Element with id 'not-found' not found");
  }
};

document.addEventListener("DOMContentLoaded", renderNotFound);
