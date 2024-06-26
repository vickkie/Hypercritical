import React, { useEffect } from "react";

function Vanilla() {
  global;
  let select = (e) => document.querySelector(e);
  let selectAll = (e) => document.querySelectorAll(e);
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  ScrollSmoother.create({
    smooth: 1,
    effects: true,
    smoothTouch: 0.1,
  });

  //*Group 1: menuUzi midmoon
  //*Group 2: assign links
  //*Group 3: show mouse follower
  //*Group 4: show and hide the scroll top button and scroll to top
  //*Group 5: inverse the arrow colors using gsap

  //Split text

  function splitAnimate(params) {
    gsap.registerPlugin(SplitText);
    const splitchars = selectAll(".splitchars");
    splitchars.forEach((splitchar, key, p) => {
      // console.log(p);
      new SplitText(splitchar, {
        type: "chars",
        charsClass: "otherchars",
      });
    });

    let herowords = selectAll(".otherchars");

    const showHero = () => {
      gsap
        .timeline({ defaults: { ease: "expo.out", delay: 0 } })
        .set(splitchars, { overflow: "hidden" })
        .addLabel("start")
        .fromTo(
          herowords,
          { y: "102%" },

          {
            duration: 1.3,
            y: "0",
            ease: "power2.inOut",
          },
          "start+=0"
        );
    };

    showHero();
  }
  setTimeout(() => {
    splitAnimate();
  }, 10);

  let scaledHover = selectAll([".projectImage2-inner img", ".otherImage-inner img"]);

  scaledHover.forEach((scaled) => {
    let gsapHover = gsap.timeline();

    let mouseenter = "mouseenter",
      mouseleave = "mouseleave",
      event;

    scaled.addEventListener("mouseenter", zoom);

    scaled.addEventListener("mouseleave", reset);
    function zoom() {
      TweenMax.staggerTo(
        scaled,
        1.5,
        {
          ease: "Expo.easeOut",
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1.1,
        },
        0.04
      );
    }
    function reset() {
      TweenMax.staggerTo(
        scaled,
        1.5,
        {
          ease: "Expo.easeOut",
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
        },
        0.07
      );
    }
  });

  // !closing tag :dont remove
}

export default Vanilla;
