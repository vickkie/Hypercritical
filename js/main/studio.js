import MouseFollower from "mouse-follower";
// import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/all";
import lozad from "lozad";
import Swiper from "swiper";
import "swiper/css";
// import gsap from "gsap";

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

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
  smooth: 1,
  effects: true,
  smoothTouch: 0.1,
});

// let lenis = new Lenis({
//   duration: 3,
//   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//   direction: "vertical",
//   gestureDirection: "vertical",
//   smooth: true,
//   smoothTouch: false,
//   touchMultiplier: 2,
//   infinite: false,
//   autoResize: true,
// });

// lenis.on("scroll", (e) => {});

// function raf(time) {
//   lenis.raf(time);
//   requestAnimationFrame(raf);
// }

// requestAnimationFrame(raf);

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
      let cursorme = new MouseFollower({
        speed: 0.6,
      });

      let sniperCursor = select(".sniper");
      let sniperTarget = select(".snipersvg");
      let sniperTargets = selectAll(["a", "details"]);
      let snipedBlack = selectAll(".snipedblack");
      let snipedwhite = selectAll(".snipedwhite");
      let root = document.documentElement;

      const cursor = new MouseFollower({
        el: sniperCursor,
      });

      sniperTargets.forEach((sniped, i) => {
        let root = document.documentElement;
        sniperTarget.classList.add("rotate-cursorr");
        root.style.setProperty("--sniper-color", "var(--main-sub");
      });

      snipedBlack.forEach((snipeBlack) => {
        snipeBlack.addEventListener("mouseenter", () => {
          root.style.setProperty("--sniper-color", "#000");
          root.style.setProperty("--main-sub", "#000");
        });
        snipeBlack.addEventListener("mouseleave", () => {
          root.style.setProperty("--main-sub", "#fc1234");
          root.style.setProperty("--sniper-color", "var(--main-sub");
        });
      });
    }
  }

  cursor();

  window.addEventListener("resize", cursor);
});

//Group 4: menuUzi midmoon

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

// Group 5: assign links for socials

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
    console.log(
      "%c Greetings from Hypercritical",
      "color:white;background:#c389e1; font-size: 26px;font-family:sans-serif"
    );
  })
  .catch((error) => {
    console.error("Failed to load configuration or assign links:", error);
  });

// Group 6: inverse the arrow colors using gsap

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const darkSections = gsap.utils.toArray(".white-section");
  var arrowWrapper = select(".top-arrow-wrapper");
  var arrowpath = select(".top-arrow-path");
  var menuName = select(".menu-name");
  var menuDotline = selectAll(".menu-dot-line");

  function makedark() {
    arrowpath.style.stroke = "var(--color-bg)";
    arrowWrapper.style.fill = "var(--color-black)";
    menuDotline.forEach((menuDotline) => {
      menuDotline.style.background = "var(--color-black)";
    });
    menuName.style.color = "var(--color-black)";
  }

  function makewhite() {
    arrowpath.style.stroke = "var(--color-black)";
    arrowWrapper.style.fill = "var(--color-bg)";
    menuDotline.forEach((menuDotline) => {
      menuDotline.style.background = "var(--color-bg)";
    });
    menuName.style.color = "var(--color-bg)";
  }

  //maintain white for hero section

  function maintainWhite() {
    let scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition < 1.0 * window.innerHeight) {
      makewhite();
    } else if (scrollPosition >= 1.0 * window.innerHeight && scrollPosition < 1.8 * window.innerHeight) {
      makedark();
    }
  }

  maintainWhite();

  window.addEventListener("scroll", maintainWhite);

  darkSections.forEach((darkSection, i) => {
    const darken = gsap.timeline({
      scrollTrigger: {
        trigger: darkSection,
        id: i + 1,
        start: "top top",
        endtrigger: darkSection,
        end: "bottom bottom",
        scrub: true,
        markers: !true,
        onEnter: () => makewhite(),
        onLeave: () => makedark(),
        onEnterBack: () => makewhite(),
        onLeaveBack: () => makedark(),
      },
    });
  });
});

//Group 7: progress bar

// Function to update progress bar
function updateProgressBar() {
  let progressBar = select(".progress"),
    progressValue = select(".progress-value"),
    progressColor = select(".progress .color");

  let progressStartValue = 0,
    progressEndValue = 98;

  let progressAnimation = gsap.to(progressColor, {
    duration: 8,
    width: "98%",
    ease: "ease-in",
  });

  // Update the text content
  function updateProgressText() {
    progressStartValue++;
    progressValue.textContent = `${progressStartValue}%`;

    if (progressStartValue == progressEndValue) {
      clearInterval(progress);
    }
  }

  let progress = setInterval(updateProgressText, 80);
}

// Options for the Intersection Observer
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.0,
};

// Intersection Observer instance
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Element is in the viewport
      updateProgressBar();
      observer.unobserve(entry.target); // Stop observing once the element is visible
    }
  });
}, options);

// Target element to observe
const targetElement = document.querySelector(".progress");

// Start observing the target element
observer.observe(targetElement);

//Group 8: eye catching magnetic

$(document).ready(function () {
  $(".magnetic").each(function () {
    new Magnetic(this, ".magnetic-parent", {
      y: 0.15, // horizontal delta
      x: 0.15, // vertical delta
      s: 0.2, // speed
      rs: 0.7, // release speed
    });
  });
});

// Automatic handle magnetic elements through attribute
$("[data-magnetic]").each(function () {
  new Magnetic(this);
});

//Group 9: SWipper js testimonials

const swiper = new Swiper(".swiper", {
  loop: true,
});

let swiperSlides = selectAll(".swiper-slide");

swiperSlides.forEach(function (slide) {
  slide.addEventListener("click", function () {
    swiper.slideNext();
  });
});

// Group 10  : scrolltrigger to margin;

gsap.registerPlugin(ScrollTrigger);

let maintl = gsap.timeline({
  scrollTrigger: {
    trigger: ".footer",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    markers: !1,
    toggleActions: "play none none reverse",
  },
});

maintl.to("main", {
  margin: 0,
  ease: "none",
  borderRadius: 0,
});

//Group 11: partners modal
function scaleModal() {
  gsap.timeline().addLabel("start", "+=0").to(
    ".partner-modal",
    {
      duration: 0.3,
      opacity: 1,
      scale: 1,
      ease: "power4.inOut",
    },
    "start"
  );
}
// Function to open the modal
function openModal() {
  gsap
    .timeline()
    .addLabel("start", "+=0")
    .to(
      ".partner-modal",
      {
        duration: 0.001,
        scale: 1.2,
        ease: "power4.inOut",
        onComplete: () => {
          scaleModal();
        },
      },
      "start"
    );
}

// Function to close the modal --close is in react

// Add event listeners to partner buttons
let partnerButtons = document.querySelectorAll(".partner-logo");
partnerButtons.forEach((button, i) => {
  button.addEventListener("click", openModal);
});
let designerButtons = document.querySelectorAll(".designer");
designerButtons.forEach((designer, i) => {
  designer.addEventListener("click", (event) => {
    event.preventDefault();
    openModal();
  });
});

let partnerElement = select(".partner-modal");
let partnerInnerElement = select(".partner-modal-inner");

const closeModalnow = () => {
  gsap
    .timeline({ defaults: { ease: "power4.inOut" } })
    .addLabel("start", "+=0")
    .to(
      ".partner-modal",
      {
        duration: 0.1,
        opacity: 0,
      },
      "start"
    )
    .to(
      ".partner-modal",
      {
        duration: 0.3,
        scale: 0,
      },
      "start"
    );
};

partnerElement.addEventListener("click", () => {
  closeModalnow();
});

// Group 12: years of experience and data
function assignExp(config) {
  for (const key in config) {
    if (config.hasOwnProperty(key)) {
      const elements = selectAll(key);
      elements.forEach((element) => {
        if (element) {
          element.innerHTML = config[key];
        } else {
          console.error(`Elements matching selector ${key} not found.`);
        }
      });
    }
  }
}

new Promise((resolve, reject) => {
  document.addEventListener("DOMContentLoaded", function () {
    fetch("includes/config-data.json")
      .then((response) => response.json())
      .then((data) => {
        assignExp(data);
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

//Group 13: scroll to

function scrollToPosition() {
  gsap.to(window, {
    duration: 2,
    delay: 0,
    scrollTo: {
      y: ".below-studio-inner-wrapper",
    },
    ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
}

let triggerButton = select(".div-svg");
triggerButton.addEventListener("click", scrollToPosition);

// Group 12: split and animate

let splitText = new SplitText(".split-text", {
  type: "lines,words",
  linesClass: "lineChild",
  wordsClass: "wordsChild",
});

function splitShow() {
  let linestl = gsap.timeline({
    scrollTrigger: {
      trigger: ".studio-intro",
      start: "top bottom",
      markers: !true,
      toggleActions: "play none none none",
    },
  });

  linestl.from(".wordsChild", {
    delay: 0.5,
    duration: 1,
    y: 100,
    stagger: 0.1,
    ease: "expo3.inOut",
  });
}

window.onload = () => {
  splitShow();
};
