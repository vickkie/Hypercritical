import MouseFollower from "mouse-follower";
import Lenis from "@studio-freight/lenis";
import lozad from "lozad";
import { ScrollTrigger } from "gsap/all";
// import gsap from "gsap";
// import { ScrollToPlugin } from "gsap/all";

let select = (e) => document.querySelector(e);
let selectAll = (e) => document.querySelectorAll(e);

//group 0:: lozad lazyload ..

document.addEventListener("DOMContentLoaded", function () {
  const observer = lozad(".lozad", {
    rootMargin: "200px 0px",
    loaded: function (el) {
      // console.log("Element loaded:", el);
    },
  });
  observer.observe();
});

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
      ScrollTo: {
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

//Group 5 : animate video

gsap.registerPlugin(ScrollTrigger);

let videotl = gsap.timeline({
  scrollTrigger: {
    trigger: ".cb-intro-figure",
    start: "top 90%",
    end: "top 10",
    scrub: true,
    markers: !1,
    toggleActions: "play none none reverse",
  },
});

videotl.to(".cb-intro-figure", {
  width: "98%",
  height: "98vh",
  ease: "expo.inOut",
});

//Group 4 : animate background of redifing

gsap.registerPlugin(ScrollTrigger);

let redifinetl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hc-greeting-bg",
    start: "top 20%",
    end: "bottom top",
    scrub: 2,
    markers: !1,
    toggleActions: "play none none reverse",
  },
});

redifinetl.to(".hc-greeting-bg-media", {
  x: "-20%",
  ease: "expo.inOut",
});

//Group 5: menuUzi midmoon
let midmoon = select(".mid-moon");
let menuclose = select(".action--close");
let menuopen = select(".action--menuUzi");

function open() {
  midmoon.classList.add("mid-moon--light");
  midmoon.classList.remove("mid-moon--dark");
}
// Close the menuUzi.
function close() {
  midmoon.classList.add("mid-moon--dark");
  midmoon.classList.remove("mid-moon--light");
}

menuopen.addEventListener("click", open);
menuclose.addEventListener("click", close);

// Group 6: assign links

function assignLinks(config) {
  for (const key in config) {
    if (config.hasOwnProperty(key)) {
      const elements = selectAll(key);
      elements.forEach((element) => {
        if (element) {
          element.href = config[key];
        } else {
          console.error(`Elements matching selector ${key} not found.`);
        }
      });
    }
  }
}

new Promise((resolve, reject) => {
  document.addEventListener("DOMContentLoaded", function () {
    fetch("includes/config.json")
      .then((response) => response.json())
      .then((data) => {
        assignLinks(data);
        resolve();
      })
      .catch((error) => {
        console.error("Error loading config:", error);
        reject(error); // Reject the promise if there's an error`
      });
  });
})
  .then(() => {
    // console.log("Configuration loaded and links assigned.");
  })
  .catch((error) => {
    console.error("Failed to load configuration or assign links:", error);
  });
