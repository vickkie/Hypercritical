import React from "react";

function ProjectContent({ pageData, nextPage }) {
  let mediaAttr;

  if (window.innerWidth < 768) {
    mediaAttr = pageData.media;
  } else {
    mediaAttr = pageData.mediaLarge;
  }

  //TODO needs improvements
  // const mediaAttr = pageData.media;
  const mediaUrls = mediaAttr ? mediaAttr.split(" || ") : [];
  const projectPreview = pageData.previewImage;
  const media1 = mediaUrls[0];
  const media2 = mediaUrls[1];
  const media3 = mediaUrls[2];

  const importantMedia = [...mediaUrls.slice(0, 15)];
  const restMedia = [...mediaUrls.slice(3)];

  function MediaComponent({ src, type, alt }) {
    return (
      <div className="otherImage">
        <div className="otherImage-inner">
          {type === "video/mp4" || type === "video/webm" ? (
            <video muted={true} loop={true} autoPlay={true} playsInline={true}>
              <source src={src} type={type} />
            </video>
          ) : (
            <img src={src} alt={alt} />
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="projectHeroWrapper">
        <div className="projectHero">
          <div className="preview__img">
            {projectPreview.endsWith(".mp4") || projectPreview.endsWith(".webm") ? (
              <>
                <div className="preview__img-inner relative">
                  <video
                    muted={true}
                    metadata
                    loop={true}
                    autoPlay={true}
                    playsInline={true}
                    poster={`assets/images/works/${pageData.id}/hero-poster.avif`}
                  >
                    <source src={projectPreview} type={projectPreview.endsWith(".mp4") ? "video/mp4" : "video/webm"} />
                  </video>
                </div>
                <div className="preview__title absolute">
                  <span className="preview__title-inner splitchars" style={{ color: `${pageData.previewColor}` }}>
                    {pageData.title}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="preview__img-inner" style={{ backgroundImage: `url(${projectPreview})` }}></div>
                <div className="preview__title">
                  <span className="preview__title-inner splitchars" style={{ color: `${pageData.previewColor}` }}>
                    {pageData.title}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="gradient-me"></div>
      </section>

      <section className="projectDetails">
        <div className="projectMetadata">
          <div className="projectclient">
            <div className="metaDataheader">CLIENT</div>
            <div className="lowercase">{pageData?.client}</div>
          </div>
          <div className="projecttask">
            <div className="metaDataheader">EXPERTISE</div>
            <div className="lowercase">{pageData?.task}</div>
          </div>
          <div className="projectyear">
            <div className="metaDataheader">YEAR</div>
            <div>{pageData.year}</div>
          </div>
        </div>
        <div className="projectAbout">
          <div className="aboutLeft">
            <svg className="left-deco" xmlns="http://www.w3.org/2000/svg" viewBox="-0.1 0.9 540.2 406.2">
              <path d="M0 1h510c16.569 0 30 13.4315 30 30v376V31 " stroke="#fff" strokeWidth="0.1" fill="none" />
            </svg>
            About Project
          </div>
          <div className="aboutCenter">
            <svg className="left-deco" xmlns="http://www.w3.org/2000/svg" viewBox="-0.1 0.9 540.2 406.2">
              <path d="M0 1h510c16.569 0 30 13.4315 30 30v376V31 " stroke="#fff" strokeWidth="0.1" fill="none" />
            </svg>
            <div className="aboutClient">{pageData.content}</div>
            <br></br>
            <div className="projectAnalysis">{pageData.Analysis}</div>
          </div>
          <div className="aboutRight">
            <svg className="right-deco" xmlns="http://www.w3.org/2000/svg" viewBox="539.9 0.9 1100 399.2">
              <path d="M540 400V31c0-16.5685 13.431-30 30-30h1070" stroke="#fff" strokeWidth="0.1" fill="none" />
            </svg>
            <div className="deco-svg">
              <a href={pageData?.link} target="_blank" rel="noopener noreferrer">
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.510301 2.3982 121 127.1" width={50}>
                  <path
                    d="M 60 129 Z M -0.002 63.356 A 1 1 0 0 0 119.96 61.777 A 1 1 0 0 0 0 64 Z "
                    stroke="none"
                    stroke-width="0.5"
                    fill="#fff"
                  />
                  <path
                    d="M 46.676 41.238 L 80.562 41.037 L 80.38 72.604 M 80.312 41.537 L 39.085 84.014"
                    stroke="#000"
                    stroke-width="5"
                    fill="none"
                  />
                </svg> */}
                <img src="assets/svg/arrow-r.svg" alt="" className="deco-img" />

                {pageData ? pageData.link && <div color="white">Visit</div> : ""}
              </a>
            </div>
          </div>
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
            <svg className="left-deco" xmlns="http://www.w3.org/2000/svg" viewBox="-0.1 0.9 540.2 406.2">
              <path d="M0 1h510c16.569 0 30 13.4315 30 30v376V31 " stroke="#fff" strokeWidth="0.1" fill="none" />
            </svg>
            <div>Our Mission</div>
          </div>
          <div className="Aimcenter">
            <svg className="left-deco" xmlns="http://www.w3.org/2000/svg" viewBox="-0.1 0.9 540.2 406.2">
              <path d="M0 1h510c16.569 0 30 13.4315 30 30v376V31 " stroke="#fff" strokeWidth="0.1" fill="none" />
            </svg>
            <svg className="right-deco" xmlns="http://www.w3.org/2000/svg" viewBox="539.9 0.9 1100 399.2">
              <path d="M540 400V31c0-16.5685 13.431-30 30-30h1070" stroke="#fff" strokeWidth="0.1" fill="none" />
            </svg>

            <div className="Aimmain">
              <div dangerouslySetInnerHTML={{ __html: pageData.aim }}></div>
            </div>
          </div>
          <div className="Aimright">
            <svg className="right-deco" xmlns="http://www.w3.org/2000/svg" viewBox="539.9 0.9 1100 399.2">
              <path d="M540 400V31c0-16.5685 13.431-30 30-30h1070" stroke="#fff" strokeWidth="0.1" fill="none" />
            </svg>
            <div className="deco-svg">
              <img src="assets/svg/91b2ba05cc1f02b1e9ebc4330c275d95.svg" alt="" />
            </div>
          </div>
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
            <svg className="left-deco" xmlns="http://www.w3.org/2000/svg" viewBox="-0.1 0.9 540.2 406.2">
              <path d="M0 1h510c16.569 0 30 13.4315 30 30v376V31 " stroke="#fff" strokeWidth="0.1" fill="none" />
            </svg>
            <div>Solution</div>
          </div>
          <div className="solutionCenter">
            {/* Render the dynamic HTML content */}
            <div dangerouslySetInnerHTML={{ __html: pageData.solution }} />

            {/* Render the SVG separately */}
            <svg className="left-deco" xmlns="http://www.w3.org/2000/svg" viewBox="-0.1 0.9 540.2 406.2">
              <path d="M0 1h510c16.569 0 30 13.4315 30 30v376V31 " stroke="#fff" strokeWidth="0.1" fill="none" />
            </svg>
          </div>

          <div className="solutionRight">
            <svg className="right-deco" xmlns="http://www.w3.org/2000/svg" viewBox="539.9 0.9 1100 399.2">
              <path d="M540 400V31c0-16.5685 13.431-30 30-30h1070" stroke="#fff" strokeWidth="0.1" fill="none" />
            </svg>
            <div className="deco-svg">
              <img src="assets/svg/asterisk-w.svg" alt="" />
            </div>
          </div>
        </div>
        <div className="remainingImages">
          {importantMedia.length !== null &&
            importantMedia.slice(3).map((media, index) => {
              const fileType = media.match(/\.(\w+)$/);
              let type = "image/webp";

              if (fileType) {
                switch (fileType[1]) {
                  case "mp4":
                    type = "video/mp4";
                    break;
                  case "webm":
                    type = "video/webm";
                    break;
                  default:
                    // Any other file type is treated as an image
                    type = "image/webp"; // changeable
                    break;
                }
              } else {
                // If no file extension is detected, treat it as an unknown type
                type = "unknown";
              }

              return <MediaComponent key={index} src={media} type={type} alt={`Media ${index + 8}`} />;
            })}
        </div>
      </section>
      <section className="thirtyworks">
        <a
          href={`/project#${nextPage}`}
          onClick={() =>
            setTimeout(() => {
              location.reload();
              document.documentElement.scrollTop = 0;
            }, 300)
          }
          className="thirty-wrapper"
        >
          <div className="below-line" style={{ width: "100%" }}>
            <span></span>
          </div>
          <div className="top-line" style={{ width: "100%" }}>
            <span></span>
          </div>
          <div className="thirty-left">
            <svg role="button">
              <use xlinkHref="assets/svg/sprite.svg#sharp-arrow"></use>
            </svg>
          </div>
          <div className="thirty-center">
            Next <span className="gt-italic">Project</span>
          </div>
          <div className="thirty-right">
            <svg role="button">
              <use xlinkHref="assets/svg/sprite.svg#sharp-arrow"></use>
            </svg>
          </div>
        </a>
      </section>
    </>
  );
}

export default ProjectContent;
