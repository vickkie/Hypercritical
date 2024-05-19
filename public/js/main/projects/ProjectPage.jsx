import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route, Routes, Switch, useNavigate } from "react-router-dom";
import { createRoot } from "react-dom/client";
import ProjectContent from "./ProjectContent";
import pagesData from "../../../includes/project-data.json";
import ErrorBoundary from "../components/ErrorBoundary";
import Vanilla from "./ProjectVanilla";

function App() {
  // const navigate = useNavigate();

  const [currentPageData, setCurrentPageData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [dataState, setDataState] = useState("LOADING");
  const [urlstate, seturlState] = useState("FAILED");
  const [nextiousPage, setNextiouspage] = useState("");

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

  useEffect(() => {
    const fetchData = async () => {
      const path = window.location.hash.substring(1); // Remove the '#' from the hash
      const page = pagesData.find((p) => p.id === path);
      if (page) {
        setCurrentPageData(page);

        let currentIndex = page.id;
        // console.log(`currentpage id ${currentIndex}`);

        // Extract all IDs from pagesData

        let allIds = [];
        allIds = pagesData.map((p) => p.id);
        //fetch the whole data
        let allData = pagesData.map((data) => data);

        let allIndexes = [...allIds];
        // console.log("All Indexes:", allIndexes);

        //? find current age index/ id
        const currentId = allData.findIndex((page) => page.id === currentIndex);

        let nextId = currentId + 1;
        let nextPage;

        if (nextId == allIndexes.length) {
          nextPage = allIndexes[0];
          setNextiouspage(nextPage);
          console.log(`nextiousPage: ${nextiousPage}`);
        } else {
          nextPage = allIndexes[`${nextId}`];
          setNextiouspage(nextPage);
          console.log(`nextiousPage: ${nextiousPage}`);
        }

        // console.log(`current id, ${currentId}`);
        // console.log(`next id, ${nextId}`);
        // console.log(allIndexes.length);
      } else {
        setDataState("ERROR");
      }
    };

    fetchData();
  }, [nextiousPage]);

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
            <ProjectContent pageData={currentPageData} nextPage={nextiousPage} />
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
