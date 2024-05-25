import React from "react";

function ProjectContent({ pageData, nextPage }) {
  let mediaAttr;

  if (window.innerWidth < 768) {
    mediaAttr = pageData.media;
  } else {
    mediaAttr = pageData.mediaLarge;
  }

  // For now max  is 7.. needs improvements
  // const mediaAttr = pageData.media;
  const mediaUrls = mediaAttr ? mediaAttr.split(" || ") : [];
  const projectPreview = pageData.previewImage;
  const media1 = mediaUrls[0];
  const media2 = mediaUrls[1];
  const media3 = mediaUrls[2];
  const media4 = mediaUrls[3];
  const media5 = mediaUrls[4];
  const media6 = mediaUrls[5];
  const media7 = mediaUrls[6];

  // console.log(mediaUrls);

  // const gotoPage = () => {
  //   navigate(`project#${nextPage}`);
  // };

  return (
    <>
      <section className="projectHeroWrapper">
        <div className="projectHero">
          <div className="preview__img">
            {projectPreview.endsWith(".mp4") || projectPreview.endsWith(".webm") ? (
              <>
                <div className="preview__img-inner relative">
                  <video muted={true} loop={true} autoPlay={true} playsInline={true}>
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
      </section>
      <section className="projectDetails">
        <div className="projectMetadata">
          <div className="projectclient">
            <div className="metaDataheader">CLIENT</div>
            <div className="lowercase">{pageData.client}</div>
          </div>
          <div className="projecttask">
            <div className="metaDataheader">EXPERTISE</div>
            <div className="lowercase">{pageData.task}</div>
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
          <div className="aboutRight">
            <div className="deco-svg">
              <img src="assets/svg/52c27296e8340fd5cddcb94ec151be0e.svg" alt="" />
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
            <div>Our Mission</div>
          </div>
          <div className="Aimcenter">
            <div className="Aimmain" dangerouslySetInnerHTML={{ __html: pageData.aim }}></div>
          </div>
          <div className="Aimright">
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
            <div>Solution</div>
          </div>
          <div className="solutionCenter" dangerouslySetInnerHTML={{ __html: pageData.solution }}></div>
          <div className="solutionRight">
            <div className="deco-svg">
              <img src="assets/svg/asterisk-w.svg" alt="" />
            </div>
          </div>
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
          <div className="otherImage">
            {media6 !== undefined && (
              <>
                <div className="otherImage-inner">
                  {media6.endsWith(".mp4") || media6.endsWith(".webm") ? (
                    <video muted={true} loop={true} autoPlay={true} playsInline={true}>
                      <source src={media6} type={media6.endsWith(".mp4") ? "video/mp4" : "video/webm"} />
                    </video>
                  ) : (
                    <img src={media6} alt={pageData.title} />
                  )}
                </div>
              </>
            )}
          </div>
          <div className="otherImage">
            {media7 !== undefined && (
              <>
                <div className="otherImage-inner">
                  {media7.endsWith(".mp4") || media7.endsWith(".webm") ? (
                    <video muted={true} loop={true} autoPlay={true} playsInline={true}>
                      <source src={media7} type={media7.endsWith(".mp4") ? "video/mp4" : "video/webm"} />
                    </video>
                  ) : (
                    <img src={media7} alt={pageData.title} />
                  )}
                </div>
              </>
            )}
          </div>
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
          // onClick={() => {
          //   window.location = `/project#${nextPage}`;
          // }}
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

// import React from "react";

// const MediaElement = ({ url, title }) => {
//   if (url.endsWith(".mp4") || url.endsWith(".webm")) {
//     return (
//       <video muted={true} loop={true} autoPlay={true} playsInline={true}>
//         <source src={url} type={url.endsWith(".mp4") ? "video/mp4" : "video/webm"} />
//       </video>
//     );
//   } else {
//     return <img src={url} alt={title} />;
//   }
// };

// function ProjectContent({ pageData }) {
//   const mediaAttr = window.innerWidth < 768 ? pageData.media : pageData.mediaLarge;
//   const mediaUrls = mediaAttr ? mediaAttr.split(" || ") : [];

//   return (
//     <>
//       <section className="projectHeroWrapper">
//         <div className="projectHero">
//           <div className="preview__img">{MediaElement({ url: pageData.previewImage, title: pageData.title })}</div>
//         </div>
//       </section>

//       <section className="projectDetails">
//         <div className="projectMetadata">
//           <div className="projectclient">
//             <div className="metaDataheader">CLIENT</div>
//             <div>{pageData.client}</div>
//           </div>
//           <div className="projecttask">
//             <div className="metaDataheader">EXPERTISE</div>
//             <div>{pageData.task}</div>
//           </div>
//           <div className="projectyear">
//             <div className="metaDataheader">YEAR</div>
//             <div>{pageData.year}</div>
//           </div>
//         </div>

//         <div className="projectAbout">
//           <div className="aboutLeft">About Project</div>
//           <div className="aboutCenter">
//             <div className="aboutClient">{pageData.content}</div>
//             <div className="projectAnalysis">{pageData.Analysis}</div>
//           </div>
//           <div className="aboutRight"></div>
//         </div>

//         {mediaUrls.map((url, index) => (
//           <div key={index} className={`projectImage${index + 1}`}>
//             <div className={`projectImage${index + 1}-inner`}>
//               <MediaElement url={url} title={pageData.title} />
//             </div>
//           </div>
//         ))}

//         {mediaUrls.slice(7).map((url, index) => (
//           <div key={index} className="otherImage">
//             <div className="otherImage-inner">
//               <MediaElement url={url} title={pageData.title} />
//             </div>
//           </div>
//         ))}
//       </section>
//     </>
//   );
// }

// export default ProjectContent;
