import React from "react";

function ProjectContent({ pageData }) {
  return (
    <div>
      <h1>{pageData.title}</h1>
      <p>{pageData.content}</p>
    </div>
  );
}

export default ProjectContent;
