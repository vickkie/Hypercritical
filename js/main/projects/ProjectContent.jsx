import React from "react";
import { html } from "splitting";

function ProjectContent({ pageData }) {
  let mediaAttr;

  if (window.innerWidth < 768) {
    mediaAttr = pageData.media;
  } else {
    mediaAttr = pageData.mediaLarge;
  }

  // const mediaAttr = pageData.media;
  const mediaUrls = mediaAttr ? mediaAttr.split(" || ") : [];
  const projectPreview = pageData.previewImage;
  const media1 = mediaUrls[0];
  const media2 = mediaUrls[1];
  const media3 = mediaUrls[2];
  const media4 = mediaUrls[3];
  const media5 = mediaUrls[4];

  // console.log(mediaUrls);

  return (
    <>
      <section className="projectHeroWrapper">
        <div className="projectHero">
          <div className="preview__img">
            <div className="preview__img-inner" style={{ backgroundImage: `url(${projectPreview})` }}></div>
            <div className="preview__title">
              <span className="preview__title-inner splitchars" style={{ color: `${pageData.previewColor}` }}>
                {pageData.title}
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="projectDetails">
        <div className="projectMetadata">
          <div className="projectclient">
            <div className="metaDataheader">CLIENT</div>
            <div>{pageData.client}</div>
          </div>
          <div className="projecttask">
            <div className="metaDataheader">EXPERTISE</div>
            <div>{pageData.task}</div>
          </div>
          <div className="projectyear">
            <div className="metaDataheader">YEAR</div>
            <div>{pageData.year}</div>
          </div>
        </div>
        <div className="projectAbout">
          <div className="aboutLeft">About Project</div>
          <div className="aboutCenter">
            <div className="aboutClient">{pageData.content}</div>
            <div className="projectAnalysis">{pageData.Analysis}</div>
          </div>
          <div className="aboutRight"></div>
        </div>
        <div className="projectImage1">
          <div className="projectImage1-inner">
            {media1.endsWith(".mp4") || media1.endsWith(".webm") ? (
              <video muted={true} loop={true} autoPlay={true} playsInline={true}>
                <source src={media1} type={media1.endsWith(".mp4") ? "video/mp4" : "video/webm"} />
              </video>
            ) : (
              <img src={media1} alt={pageData.title} />
            )}
          </div>
        </div>
        <div className="projectAim">
          <div className="Aimleft">
            <div>Our Mission</div>
          </div>
          <div className="Aimcenter">
            <div className="Aimmain" dangerouslySetInnerHTML={{ __html: pageData.aim }}></div>
          </div>
          <div className="Aimright"></div>
        </div>
        <div className="projectImage2">
          <div className="projectImage2-left">
            <div className="projectImage2-inner">
              {media2.endsWith(".mp4") || media2.endsWith(".webm") ? (
                <video muted={true} loop={true} autoPlay={true} playsInline={true}>
                  <source src={media2} type={media2.endsWith(".mp4") ? "video/mp4" : "video/webm"} />
                </video>
              ) : (
                <img src={media2} alt={pageData.title} />
              )}
            </div>
          </div>
          <div className="projectImage2-right">
            <div className="projectImage2-inner">
              {media3.endsWith(".mp4") || media3.endsWith(".webm") ? (
                <video muted={true} loop={true} autoPlay={true} playsInline={true}>
                  <source src={media3} type={media3.endsWith(".mp4") ? "video/mp4" : "video/webm"} />
                </video>
              ) : (
                <img src={media3} alt={pageData.title} />
              )}
            </div>
          </div>
        </div>
        <div className="projectSolution">
          <div className="solutionLeft">
            <div>Solution</div>
          </div>
          <div className="solutionCenter" dangerouslySetInnerHTML={{ __html: pageData.solution }}></div>
          <div className="solutionRight"></div>
        </div>
        <div className="remainingImages">
          <div className="otherImage">
            {media4 !== undefined && (
              <>
                <div className="otherImage-inner">
                  {media4.endsWith(".mp4") || media4.endsWith(".webm") ? (
                    <video muted={true} loop={true} autoPlay={true} playsInline={true}>
                      <source src={media4} type={media4.endsWith(".mp4") ? "video/mp4" : "video/webm"} />
                    </video>
                  ) : (
                    <img src={media4} alt={pageData.title} />
                  )}
                </div>
              </>
            )}
          </div>
          <div className="otherImage">
            {media5 !== undefined && (
              <>
                <div className="otherImage-inner">
                  {media5.endsWith(".mp4") || media5.endsWith(".webm") ? (
                    <video muted={true} loop={true} autoPlay={true} playsInline={true}>
                      <source src={media5} type={media5.endsWith(".mp4") ? "video/mp4" : "video/webm"} />
                    </video>
                  ) : (
                    <img src={media5} alt={pageData.title} />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default ProjectContent;
