import MouseFollower from "mouse-follower";
import Lenis from "@studio-freight/lenis";

let select = (e) => document.querySelector(e);
let selectAll = (e) => document.querySelectorAll(e);

//   Group 1: smooth scroll

let lenis = new Lenis({
  duration: 3,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
  autoResize: true,
});

lenis.on("scroll", (e) => {});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

//group 2: show and hide the scroll top button and scroll to top

document.addEventListener("DOMContentLoaded", function () {
  let toTopbutton = select("#toTop");

  // Add an event listener to check scroll position
  function showTotop() {
    let scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition > 1.2 * window.innerHeight) {
      toTopbutton.style.display = "block";
    } else {
      toTopbutton.style.display = "none";
    }
  }
  showTotop();
  window.addEventListener("scroll", showTotop);

  function scrollTop() {
    gsap.to(window, {
      duration: 2,
      delay: 0,
      scrollTo: {
        y: ".hero-main",
      },
      ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  }

  toTopbutton.addEventListener("click", scrollTop);
});

//Group 3: show mouse follower

document.addEventListener("DOMContentLoaded", function () {
  function cursor() {
    if (innerWidth > 767) {
      let cursorme = new MouseFollower();
    }
  }
  cursor();
  window.addEventListener("res", cursor);
});
