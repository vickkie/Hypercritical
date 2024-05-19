import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route, Routes, Switch } from "react-router-dom";
import { createRoot } from "react-dom/client";
import ProjectContent from "./ProjectContent";
import pagesData from "../../../includes/project-data.json";
import ErrorBoundary from "../components/ErrorBoundary";
import Vanilla from "./ProjectVanilla";

function App() {
  const [currentPageData, setCurrentPageData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [dataState, setDataState] = useState("LOADING");
  const [urlstate, seturlState] = useState("FAILED");

  useEffect(() => {
    const isBrowser =
      typeof window !== "undefined" &&
      typeof window.document !== "undefined" &&
      typeof window.document.createElement !== "undefined";
    const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

    let currentUrl = new URL(window.location.href);

    if (isBrowser && ABSOLUTE_URL_REGEX.test(currentUrl)) {
      seturlState("PASSED");
    } else {
      console.log("failed");
      return;
    }

    const path = window.location.hash.substring(1);

    // console.log(`full url:  ${currentUrl}`);
    // console.log(`path ${path}`);
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const path = window.location.hash.substring(1); // Remove the '#' from the hash
  //     const page = pagesData.find((p) => p.id === path);
  //     if (page) {
  //       setCurrentPageData(page);
  //     } else {
  //       setDataState("ERROR");
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const path = window.location.hash.substring(1); // Remove the '#' from the hash
      const page = pagesData.find((p) => p.id === path);
      if (page) {
        setCurrentPageData(page);

        let currentIndex = page.id;
        console.log(`currentpage id ${currentIndex}`);

        // Extract all IDs from pagesData
        const allIds = pagesData.map((p, index) => [p.id, index]);

        let allIndexes = [...allIds];
        console.log("All Indexes:", allIndexes);

        const myid = allIndexes.find((p, index) => [p.id === currentIndex]);
        console.log(myid);

        allIds.forEach((id, index) => {
          console.log(`Processing ID: ${id},${index}`);
        });
      } else {
        setDataState("ERROR");
      }
    };

    fetchData();
  }, []);

  // console.log(`currentPageData-out`, currentPageData);

  useEffect(() => {
    if (currentPageData !== null) {
      setDataState("SUCCESS");
      Vanilla();
      // console.log(urlstate);
    } else {
      Vanilla();
    }
  });

  const errorHere = () => {
    throw new Error("Simulated error for testing");
  };

  return (
    <ErrorBoundary>
      <>
        {dataState === "SUCCESS" && currentPageData !== null && (
          <>
            <ProjectContent pageData={currentPageData} />
            {/* <Vanilla /> */}
          </>
        )}
        {dataState === "ERROR" && (
          <div>
            {/* Call the errorHere function and handle the error it throws */}
            {() => {
              try {
                errorHere();
              } catch (error) {
                console.error(error);
                return <div>Error occurred: {error.message}</div>;
              }
            }}
          </div>
        )}
      </>
    </ErrorBoundary>
  );
}

const renderApp = () => {
  const container = document.getElementById("root");
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

// import React, { useRef, useEffect } from "react";

// function MyComponent() {
//   const myRef = useRef(null);

//   useEffect(() => {
//     // Now you can access the DOM element
//     const element = myRef.current;
//     // Perform operations on 'element'
//   }, []);

//   return <div ref={myRef}>Hello, world!</div>;
// }
