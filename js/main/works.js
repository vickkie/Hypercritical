import MouseFollower from "mouse-follower";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/all";

import lozad from "lozad";
import gsap from "gsap";
import Reeller from "reeller";

// App.js using react

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
      scrollTo: {
        y: 0,
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
  window.addEventListener("resize", cursor);
});

//Group 4: gsap scroll trigger

gsap.registerPlugin(ScrollTrigger);

let maintl = gsap.timeline();

maintl.to("main", {
  margin: 0,
  ease: "none",
  borderRadius: 0,
});

ScrollTrigger.create({
  animation: maintl,
  trigger: ".work-wrapper",
  start: "bottom bottom",
  end: "bottom center",
  scrub: true,
  markers: !true,
  toggleActions: "play none none reverse",
});

//Group 5: mreeler-marquee

Reeller.registerGSAP(gsap);

const reeller = new Reeller({
  container: ".sw-partner-marquee",
  wrapper: ".sw-partner-marquee-row",
  itemSelector: ".sw-partner-marquee-row-item",
  speed: 40,
});

//Group 6: rolling text

let elements = document.querySelectorAll(".rolling-text");

elements.forEach((element) => {
  let innerText = element.innerText;
  element.innerHTML = "";

  let textContainer = document.createElement("div");
  textContainer.classList.add("block");

  for (let letter of innerText) {
    let span = document.createElement("span");
    span.innerText = letter.trim() === "" ? "\xa0" : letter;
    span.classList.add("letter");
    textContainer.appendChild(span);
  }

  element.appendChild(textContainer);
  element.appendChild(textContainer.cloneNode(true));

  element.addEventListener("mouseover", () => {
    // Add the 'hover' class to the hovered element
    element.classList.add("hover");
  });

  element.addEventListener("mouseout", () => {
    // Remove the 'hover' class when the mouse leaves the element
    element.classList.remove("hover");
  });
});

// For presentation purpose
setTimeout(() => {
  elements.forEach((element) => {
    element.classList.add("play");
  });
}, 600);
