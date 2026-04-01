// import React, { useState, useEffect } from "react";
// import { gsap } from "gsap";
// import imagesLoaded from "imagesloaded";

// function Preloader({ children }) {
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     const images = document.querySelectorAll("img");
//     const videos = document.querySelectorAll("video");

//     const preloader = imagesLoaded(document.querySelector("#preloader"));

//     preloader.on("progress", (instance, img) => {
//       // Update state to indicate loading progress
//       console.log("Loading: " + img.isLoaded);
//     });

//     preloader.on("done", () => {
//       // All images have loaded, update state
//       setLoaded(true);
//     });

//     preloader.on("fail", () => {
//       // Handle case where one or more images failed to load
//       console.error("One or more images failed to load.");
//       setTimeout(() => {
//         // Set loaded to true after a delay
//         setLoaded(true);
//       }, 500);
//     });

//     return () => {
//       // Cleanup event listeners when component unmounts
//       preloader.off("progress");
//       preloader.off("done");
//       preloader.off("fail");
//     };
//   }, []);

//   useEffect(() => {
//     if (loaded) {
//       // All images and videos have loaded, trigger transition animation
//       animateDone();
//     }
//   }, [loaded]);

//   function animateDone() {
//     const transitionTimeline = gsap.timeline({});
//     transitionTimeline.fromTo(
//       ".transition-in",
//       {
//         scaleY: 1,
//       },
//       {
//         scaleY: 0,
//         duration: 1.2,
//         ease: "power2.inOut",
//       }
//     );
//   }

//   return (
//     <div>
//       {!loaded && (
//         <div id="preloader">
//           {/* Add preloader animation or spinner here */}
//           Loading...
//         </div>
//       )}
//       {loaded && children}
//     </div>
//   );
// }

// export default Preloader;
