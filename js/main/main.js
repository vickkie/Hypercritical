//Imports modules in file

import MouseFollower from "mouse-follower";
import Lenis from "@studio-freight/lenis";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import ScrollToPlugin from "gsap/ScrollToPlugin";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";

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

let select = (e) => document.querySelector(e);
let selectAll = (e) => document.querySelectorAll(e);

const herolargelogo = select(".hero-largelogo");
const heroText = Splitting({ target: herolargelogo, by: "words" });
const splitchars = selectAll(".split-chars");

splitchars.forEach((splitchar) => {
  Splitting({
    target: splitchar,
    by: "chars",
  });
});

let herowords = selectAll(".hero-largelogo [data-word]");

// console.log(herowords);

let heroSeparator = select(".below-line"),
  heroMedia = select(".hero-image");
let heroimageWrapper = select(".parallax-hero");

const showHero = () => {
  gsap
    .timeline({ defaults: { ease: "expo.out", delay: 0.5 } })
    .set(heroimageWrapper, { y: "-60vh" })
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
      { y: "110%" },

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

// Group 11: elephant fun mouse

let elephant = select(".c-elephant_himself");
// let elephant_wrapper = select(".c-elephant_himself_wrap");
let elephant_wrapper = select(".elephant-boundary");
elephant_wrapper.addEventListener("mouseenter", () => {
  const elephantcursor = new MouseFollower({
    el: elephant,
    container: elephant_wrapper,
    speed: 22.5,
  });
});

// Group 12: inverse the arrow colors using gsap

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const darkSections = gsap.utils.toArray(".white-section");
  var arrowWrapper = document.querySelector(".top-arrow-wrapper");
  var arrowpath = document.querySelector(".top-arrow-path");

  function makedark() {
    arrowpath.style.stroke = "var(--color-bg)";
    arrowWrapper.style.fill = "var(--color-black)";
  }

  function makewhite() {
    arrowpath.style.stroke = "var(--color-black)";
    arrowWrapper.style.fill = "var(--color-bg)";
  }
  darkSections.forEach((darkSection, i) => {
    //  let id = i;
    //  console.log(id);
    const darken = gsap.timeline({
      scrollTrigger: {
        trigger: darkSection,
        id: i + 1,
        start: "top 40%",
        endtrigger: darkSection,
        end: "bottom 10%",
        scrub: true,
        // markers: true,
        onEnter: () => makewhite(),
        onLeave: () => makedark(),
        onEnterBack: () => makewhite(),
        onLeaveBack: () => makedark(),
      },
    });
  });
});

//group 13: imported imagehover on innovation services

import { Item } from "./code-anime/item";

[...document.querySelectorAll(".grid-itemz > .grid__item-img")].forEach((img) => new Item(img));

// group 14: animate how video resizes ..main video

let worldvideoWrapper = select(".global-video");
let worldvideo = select("#video-background");

gsap.registerPlugin(ScrollTrigger);

const animateVideo = gsap.timeline({
  scrollTrigger: {
    trigger: worldvideoWrapper,
    start: "top bottom",
    end: "top top",
    scrub: true,
    markers: !1,
    toggleActions: "play none none reverse",
  },
});

animateVideo.fromTo(
  worldvideo,

  {
    scaleX: 0.9,
    borderRadius: "45px",
  },
  {
    scaleX: 1,
    borderRadius: "0px",
  }
);

//GRoup 14: animate button on portfolio work trailers

// script.js
document.addEventListener("DOMContentLoaded", function () {
  const carouselItems = select(".carousel");
  const backButton = select(".-prev");
  const nextButton = select(".-next");

  let currentIndex = 0;

  function moveCarousel(direction) {
    const itemWidth = carouselItems.children[0].offsetWidth;
    const carouselWidth = carouselItems.offsetWidth;
    const totalItems = carouselItems.children.length;

    if (direction === "next") {
      currentIndex = (currentIndex + 1) % totalItems;
    } else if (direction === "back") {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    }

    carouselItems.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  }

  backButton.addEventListener("click", function () {
    moveCarousel("back");
  });

  nextButton.addEventListener("click", function () {
    moveCarousel("next");
  });
});

//split and show this section header

// if (innerWidth > 767) {
//   document.addEventListener("DOMContentLoaded", () => {
//     const fx28Titles = [...document.querySelectorAll(".content__title[data-splitting][data-effect28]")];

//     gsap.registerPlugin(ScrollTrigger);
//     gsap.registerPlugin(SplitText);

//     // let title = new SplitText(".content__title[data-splitting][data-effect28]", {
//     //   type: "words,lines,chars",
//     //   wordsClass: "content__title word",
//     //   charsClass: "char",
//     //   linesClass: "lines",
//     // });

//     fx28Titles.forEach((title) => {
//       const words = [...title.querySelectorAll(".word")];

//       for (const word of words) {
//         const chars = word.querySelectorAll(".char");
//         const charsTotal = chars.length;

//         gsap.fromTo(
//           chars,
//           {
//             "will-change": "transform, filter",
//             transformOrigin: "50% 100%",
//             scale: (position) => {
//               const factor =
//                 position < Math.ceil(charsTotal / 2)
//                   ? position
//                   : Math.ceil(charsTotal / 2) - Math.abs(Math.floor(charsTotal / 2) - position) - 1;
//               return gsap.utils.mapRange(0, Math.ceil(charsTotal / 2), 0.5, 2.1, factor);
//             },
//             y: (position) => {
//               const factor =
//                 position < Math.ceil(charsTotal / 2)
//                   ? position
//                   : Math.ceil(charsTotal / 2) - Math.abs(Math.floor(charsTotal / 2) - position) - 1;
//               return gsap.utils.mapRange(0, Math.ceil(charsTotal / 2), 0, 60, factor);
//             },
//             rotation: (position) => {
//               const factor =
//                 position < Math.ceil(charsTotal / 2)
//                   ? position
//                   : Math.ceil(charsTotal / 2) - Math.abs(Math.floor(charsTotal / 2) - position) - 1;
//               return position < charsTotal / 2
//                 ? gsap.utils.mapRange(0, Math.ceil(charsTotal / 2), -4, 0, factor)
//                 : gsap.utils.mapRange(0, Math.ceil(charsTotal / 2), 0, 4, factor);
//             },
//             filter: "blur(12px) opacity(0)",
//           },
//           {
//             ease: "power2.inOut",
//             y: 0,
//             rotation: 0,
//             scale: 1,
//             filter: "blur(0px) opacity(1)",
//             scrollTrigger: {
//               trigger: word,
//               start: "top bottom+=40%",
//               end: "top top+=15%",
//               scrub: true,
//             },
//             stagger: {
//               amount: 0.15,
//               from: "center",
//             },
//           }
//         );
//       }
//     });
//   });
// }
