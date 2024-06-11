// React slider component

// making simple things harder
//not in use

import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { tns } from "tiny-slider";

const project1Images = [
  "assets/images/works/lumina/lumina-cover.webp",
  "assets/images/works/lumina/lumina-cards.webp",
  "assets/images/works/lumina/lumina-2.webp",
  "assets/images/works/lumina/lumina-product-mid.webp",
];

const ProjectSlider = ({ images }) => {
  const sliderRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const slider = tns({
      container: sliderRef.current,
      items: 4,
      responsive: {
        640: {
          edgePadding: 20,
          gutter: 20,
          items: 2,
        },
        700: {
          gutter: 30,
        },
        900: {
          items: 3,
        },
      },
      slideBy: "page",
      autoplay: false,
      mouseDrag: true,
      swipeAngle: false,
      speed: 400,
      autoplayButtonOutput: false,
      onIndexChanged: (info) => {
        const progress = (info.displayIndex / info.slideCount) * 100;
        progressBarRef.current.style.width = `${progress}%`;
      },
    });

    return () => {
      slider.destroy();
    };
  }, [images]); // Depend on images to re-initialize if they change

  return (
    <div>
      <div className="progress-bar" ref={progressBarRef}></div>
      <div className="my-slider" ref={sliderRef}>
        {images.map((image, index) => (
          <div key={index} style={{ backgroundImage: `url(${image})` }}></div>
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<ProjectSlider images={project1Images} />, document.getElementById("project-slider-1"));
