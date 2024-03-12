// ProjectSlider module to show tiny slides

import React, { useEffect, useRef } from "react";
import tns from "tiny-slider/src/tiny-slider";

const ProjectSlider = ({ images }) => {
  const sliderRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const slider = tns({
      container: sliderRef.current,
      items: 1.5,
      loop: true,
      rewind: false,
      gutter: 10,
      // swipeAngle: false,
      mouseDrag: false,
      slideBy: "page",
      nav: false,
      swipeAngle: 45,
      speed: 400,
      autoWidth: true,
      autoplayButtonOutput: false,
      responsive: {
        640: {
          items: 3,
        },
        768: {
          items: 1,
        },
        992: {
          items: 1,
        },
      },
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

export default ProjectSlider;
