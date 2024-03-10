import React from "react";
import { createRoot } from "react-dom/client";
// import "../../css/404.css"; // Import CSS file

const NotFound = () => {
  return (
    <React.Fragment>
      <div className="txt">
        <h1 className="delay">404</h1>
        <p className="delay">
          The page you are looking for does not exist, you can either go back to homepage or stay here click and drag.
        </p>
        <br />
        <br />
        <a href="index.html" className="prj_btn">
          <span>
            <span>
              <svg width="19" height="8" viewBox="0 0 19 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 4L15 0V3H0V5H15V8L19 4Z" fill="white" />
              </svg>
            </span>
          </span>
          <p>Go back to homepage</p>
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
