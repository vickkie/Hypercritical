import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPLugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  let transitionTimeline = gsap.timeline();

  function animateTransition() {
    transitionTimeline.fromTo(
      ".transition",
      {
        scaleY: 0,
      },
      {
        scaleY: 1,
      }
    );
  }

  let allLinks = document.querySelectorAll("a");

  allLinks.forEach((link) => {
    link.addEventListener("click", animateTransition);
  });
});
