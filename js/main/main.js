//Imports modules in file

import MouseFollower from "mouse-follower";
import Lenis from "@studio-freight/lenis";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import ScrollToPlugin from "gsap/ScrollToPlugin";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";

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

// group 14: animate how video resizes ..main video also includes autoplay

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

//complicated way to pause and unpause video

const playvideotl = gsap.timeline({
  scrollTrigger: {
    trigger: worldvideo,
    start: "top bottom",
    end: "bottom bottom",
    scrub: true,
    onEnter: () => {
      if (worldvideo.paused) {
        worldvideo.play().catch((error) => {
          if (error.name === "NotAllowedError") {
            console.log("Play request was interrupted by a pause call.");
          } else {
            console.error("An unexpected error occurred:", error);
          }
        });
      }
    },
    onLeave: () => {
      if (!worldvideo.paused) {
        worldvideo.pause();
      }
    },
    onEnterBack: () => {
      if (worldvideo.paused) {
        worldvideo.play().catch((error) => {
          if (error.name === "NotAllowedError") {
            console.log("Play request was interrupted by a pause call.");
          } else {
            console.error("An unexpected error occurred:", error);
          }
        });
      }
    },
    onLeaveBack: () => {
      if (!worldvideo.paused) {
        worldvideo.pause();
      }
    },
  },
});

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
//group 15 : overlay and succes button

function showDialog() {
  // Show the overlay with a fade-in animation
  gsap.to("#overlay", {
    duration: 0.5,
    opacity: 1,
    scale: 1,
    onComplete: () => {
      gsap.to("#dialog", {
        duration: 0.5,
        scale: 1,
        opacity: 1,
        ease: "bounce",
      });
    },
  });
}

// Function to hide the dialog box and overlay with GSAP animations
function hideDialog() {
  // Hide the dialog box with a scale animation
  gsap.to("#dialog", {
    duration: 0.5,
    scale: 0,
    opacity: 0,
    onComplete: () => {
      gsap.to("#overlay", {
        duration: 0.5,
        opacity: 0,
        scale: 0,
      });
    },
  });
}

// Group 16: firebase

// Initialize Firebase API
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL, //databaseURL here
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to handle form submission
document.getElementById("consultationForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var message = document.getElementById("message").value;
  var email = document.getElementById("email").value;
  var name = document.getElementById("yourname").value;

  // Collect checkbox values
  var webDesign = document.getElementById("Web-Design").checked;
  var seo = document.getElementById("SEO").checked;
  var development = document.getElementById("Development").checked;
  var other = document.getElementById("Other").checked;

  // Determine the consultation type based on checkboxes
  var consultationType = "";
  if (webDesign) consultationType += "Web Design, ";
  if (seo) consultationType += "SEO, ";
  if (development) consultationType += "Development, ";
  if (other) consultationType += "Other, ";
  // Remove the trailing comma and space if any
  consultationType = consultationType.slice(0, -2);

  // Collect budget radio button value
  var budget = "";
  var budgetRadios = document.getElementsByName("priceGroup");
  for (var i = 0; i < budgetRadios.length; i++) {
    if (budgetRadios[i].checked) {
      budget = budgetRadios[i].id;
      break;
    }
  }

  // Generate a unique ID for the new entry
  var newConsultationRef = push(ref(database, "consultations"));
  set(newConsultationRef, {
    name: name,
    message: message,
    budget: budget,
    consultationType: consultationType,
    email: email,
    date: new Date().toISOString(),
  });

  showDialog();

  document.getElementById("consultationForm").reset();
});

document.querySelector(".close-dialog").addEventListener("click", hideDialog);

//Group 16: toggle buttons color for submition
let checkboxes = document.querySelectorAll('input[type="checkbox"]');

const changeColor = (event) => {
  let wrapper = event.target.parentNode.querySelector(".checkbox-input");
  wrapper.classList.toggle("clicked-color");
  let wrappertext = event.target.parentNode.querySelector(".checkbox-text");
  wrappertext.classList.toggle("clicked-text");
};

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", changeColor);
});

let checkradios = document.querySelectorAll('input[type="radio"]');

const changeColorr = (event) => {
  // Find the .radio-text element within the parent of the clicked radio button
  let radiotext = event.target.parentNode.querySelector(".radio-text");
  // Remove 'clicked' class from all .radio-text elements
  document.querySelectorAll(".radio-text").forEach((rb) => rb.parentElement.classList.remove("clicked"));
  // Add 'clicked' class to the parent of the clicked .radio-text element
  radiotext.parentElement.classList.add("clicked");
};

checkradios.forEach((checkradio) => {
  checkradio.addEventListener("change", changeColorr);
});
