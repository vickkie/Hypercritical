import React from "react";

function ProjectContent({ pageData }) {
  return (
    <div>
      <h1 className="project-title">{pageData.title}</h1>
      <p>{pageData.content}</p>
    </div>
  );
}

export default ProjectContent;
