import React from "react";

function ProjectContent({ pageData }) {
  const mediaAttr = pageData.media;
  const mediaUrls = mediaAttr ? mediaAttr.split(" || ") : [];
  const projectPreview = pageData.previewImage;
  console.log(mediaUrls);

  return (
    <section className="projectHeroWrapper">
      <div className="projectHero">
        <div className="preview__img">
          <div className="preview__img-inner" style={{ backgroundImage: `url(${projectPreview})` }}></div>
          <div className="preview__title">
            <span className="preview__title-inner">{pageData.title}</span>
          </div>
        </div>
      </div>
    </section>
    // <div>
    //   <h1 className="project-title">{pageData.title}</h1>
    //   <p>{pageData.content}</p>
    // </div>
  );
}

export default ProjectContent;
