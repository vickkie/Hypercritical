//Group 1: menuUzi midmoon
let midmoon = document.querySelector(".mid-moon");
let menuclose = document.querySelector(".action--close");
let menuopen = document.querySelector(".action--menuUzi");

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

// Group 2: assign links

function assignLinks(config) {
  for (const key in config) {
    if (config.hasOwnProperty(key)) {
      const elements = document.querySelectorAll(key);
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

//GRoup 3: animation on hover of contact emoji

document.addEventListener("DOMContentLoaded", () => {
  let menuUziItemLink = document.querySelector(".menuUzi__item-link");
  let defaultImage = menuUziItemLink.querySelector(".contact-emoji");

  let rotateremoji = gsap.timeline();

  const rotateemoji = () => {
    rotateremoji.to(defaultImage, {
      duration: 1,
      rotation: -360,
      repeat: -1,
      ease: "linear",
    });
  };

  menuUziItemLink.addEventListener("mouseover", rotateemoji);
  menuUziItemLink.addEventListener("mouseout", () => {
    rotateremoji.kill();
  });
});

//group 4: smooth scrolling

import Lenis from "@studio-freight/lenis";

const lenis = new Lenis({
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

//Group 5: Animating into into place

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";

let select = (e) => document.querySelector(e);
let selectAll = (e) => document.querySelectorAll(e);

const herolargelogo = select(".hero-largelogo");
const heroText = Splitting({ target: herolargelogo, by: "words" });

let herowords = selectAll(".hero-largelogo [data-word]");

console.log(herowords);

let heroSeparator = select(".below-line"),
  heroMedia = select(".hero-image");

const showHero = () => {
  gsap
    .timeline({ defaults: { ease: "expo.out", delay: 1.2 } })
    .addLabel("start")
    .fromTo(
      heroSeparator,
      { width: 0 },
      {
        duration: 1.75,
        width: "100%",
        stagger: 0.095,
      },
      "start"
    )
    .fromTo(
      herowords,
      { y: "101%" },

      {
        delay: 0,
        duration: 2.3,
        y: "0",
        stagger: 0.17,
        ease: "expo.inOut",
      },
      "start+=0.28"
    )

    .fromTo(
      heroMedia,
      { width: 0 },

      { width: "100%", duration: 1.5, ease: "expo.inOut", transformOrigin: "50% 50% 0" },
      "start+=0.7"
    );
};

// Group 7: parallax effect

function initParallax() {
  let slides = selectAll(".slide");
  let slideId = 0;
  slides.forEach((slide, i) => {
    let imageWrapper = slide.querySelector(".parallax-image");

    gsap.fromTo(
      imageWrapper,
      {
        y: "-60vh",
      },
      {
        y: "60vh",
        scrollTrigger: {
          trigger: slide,
          scrub: true,
          start: "top bottom", // position of trigger meets the scroller position
          end: "bottom top",
          markers: !1,
        },
        ease: "none",
      }
    );
  });
}

function scrollTop() {
  gsap.to(window, {
    duration: 2,
    scrollTo: {
      y: "nav",
    },
    ease: "power2.inOut",
  });
}

document.addEventListener("DOMContentLoaded", function () {
  showHero();
  setTimeout(() => {
    initParallax();
    scrollTop();
  }, 3000);
});

//group 7 : animate divider lines using gsap and scrollTrigger
// Group 5: Line Animation
function lineTimeline(element) {
  const afterPseudotl = gsap.timeline({
    defaults: {
      duration: 3,
      ease: "power3.out",
    },
  });

  afterPseudotl.fromTo(
    element,
    {
      scaleX: 0,
      opacity: 0,
      transformOrigin: "left left",
    },
    {
      scaleX: 1,
      opacity: 1,
    }
  );

  return afterPseudotl;
}

document.querySelectorAll("[line-trigger]").forEach(function (element) {
  const lineTrigger = element.getAttribute("line-trigger");

  const linetimeline = lineTimeline(element);

  ScrollTrigger.create({
    trigger: lineTrigger,
    start: "top 92%",
    animation: linetimeline,
    onEnter: () => linetimeline.play(),
    onLeaveBack: () => linetimeline.reverse({ duration: 6.5 }),
  });
});

//group 8: show and hide the scroll top button and scroll to top

document.addEventListener("DOMContentLoaded", function () {
  let toTopbutton = document.querySelector("#toTop");

  // Add an event listener to check scroll position
  window.addEventListener("scroll", function () {
    let scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition > 1.5 * window.innerHeight) {
      toTopbutton.style.display = "block";
    } else {
      toTopbutton.style.display = "none";
    }
  });

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

//Group 9: show mouse follower

document.addEventListener("DOMContentLoaded", function () {
  function cursor() {
    if (innerWidth > 767) {
      let cursorme = new MouseFollower();
    }
  }

  cursor();
  window.addEventListener("res", cursor);
});

//Group 10: control opening and closing of accordion

const accordionItems = document.querySelectorAll("details");

accordionItems.forEach((accordionItem) => {
  accordionItem.addEventListener("click", (event) => {
    accordionItems.forEach((sibling) => {
      if (sibling != accordionItem) {
        sibling.removeAttribute("open");
      }
    });
  });
});

let elephant = select(".c-elephant_himself");
// let elephant_wrapper = select(".c-elephant_himself_wrap");
let elephant_wrapper = select(".ourservices");

elephant_wrapper.addEventListener("mouseenter", () => {
  console.log("enter");
  const elephantcursor = new MouseFollower({
    el: elephant,
    container: elephant_wrapper,
    speed: 22.3,
  });
});
