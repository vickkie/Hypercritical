import React from "react";
import { createRoot } from "react-dom/client";
import FetchDetails from "../../projects/ProjectPage";
import { useState, useEffect } from "react";

function ProjectHero(currentPageData) {
  const [projectPreview, setprojectPreview] = useState("");

  console.log("exported", currentPageData);

  // let projectPreview;
  useEffect(() => {
    FetchDetails();
    // projectPreview = currentPageData.previewImage;
    setprojectPreview(currentPageData.previewImage);
    console.log(`currentPageData-v1:`, projectPreview);
  }, [currentPageData]);

  return (
    <>
      <div className="previewhero" style={{ backgroundImage: `url(${projectPreview})` }}></div>
    </>
  );
}

export default ProjectHero;

const container = document.getElementById("previewhero");
const root = createRoot(container);

root.render(<ProjectHero />);
