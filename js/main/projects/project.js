import MouseFollower from "mouse-follower";
import Vanilla from "./ProjectVanilla";

let select = (e) => document.querySelector(e);
let selectAll = (e) => document.querySelectorAll(e);

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// ScrollSmoother.create({
//   smooth: 1,
//   effects: true,
//   smoothTouch: 0.1,
// });

//Group 1: menuUzi midmoon

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

//Animate arrows on hover

function AnimateArrows(params) {
  let thirtyWrapper = select(".thirtyworks");
  let thirtyArrowLeft = selectAll(".thirty-left svg");
  let thirtyArrowRight = selectAll(".thirty-right svg");

  // GSAP timeline
  let thirtytl = gsap.timeline({ repeat: -1, paused: true });
  //  the animation sequence
  thirtytl
    .addLabel("start", 0)
    .to(thirtyArrowLeft, { duration: 2, x: -30, ease: "none" }, "start")
    .to(thirtyArrowRight, { duration: 2, x: 30, ease: "none" }, "start")
    .to(thirtyArrowLeft, { duration: 2, x: 0, ease: "none" }, "start+=2")
    .to(thirtyArrowRight, { duration: 2, x: 0, ease: "none" }, "start+=2");

  // Event listeners

  thirtyWrapper.addEventListener("mouseenter", () => {
    thirtytl.play();
  });
  thirtyWrapper.addEventListener("mouseleave", () => {
    thirtytl.pause();
  });
}

// // Group 2: assign links

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

//Assign data inside

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
    Vanilla();
    AnimateArrows();
  })
  .catch((error) => {
    console.error("Failed to load configuration or assign links:", error);
  });

assignExp();

// //Group 3: show mouse follower

document.addEventListener("DOMContentLoaded", function () {
  function cursor() {
    if (innerWidth > 767) {
      let cursorme = new MouseFollower();
    }
  }

  cursor();
  window.addEventListener("resize", cursor);
});

// //Group 4: show and hide the scroll top button and scroll to top

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

// // Group 6: inverse the arrow colors using gsap

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const darkSections = gsap.utils.toArray(".white-section");
  var arrowWrapper = select(".top-arrow-wrapper");
  var arrowpath = select(".top-arrow-path");
  var menuName = select(".menu-name");
  var menuDotline = selectAll(".menu-dot-line");
  let navBelowline = select(".nav .below-line");
  let mainloogo = select(".nav_logo_parent");
  let midloogo = select(".est_nav");

  function makedark() {
    arrowpath.style.stroke = "var(--color-bg)";
    arrowWrapper.style.fill = "var(--color-black)";

    menuDotline.forEach((menuDotline) => {
      menuDotline.style.background = "var(--color-black)";
    });
    menuName.style.color = "var(--color-black)";
  }

  function makedarker() {
    arrowpath.style.stroke = "var(--color-black)";
    midloogo.style.fill = "var(--color-black)";
    navBelowline.style.background = "var(--color-black)";
    mainloogo.style.color = "var(--color-black)";
    arrowWrapper.style.fill = "var(--color-black)";
    menuDotline.forEach((menuDotline) => {
      menuDotline.style.background = "var(--color-black)";
    });
    menuName.style.color = "var(--color-black)";
  }

  function makewhite() {
    midloogo.style.fill = "var(--color-bg)";
    navBelowline.style.background = "var(--color-bg)";
    mainloogo.style.color = "var(--color-bg)";
    menuDotline.forEach((menuDotline) => {
      menuDotline.style.background = "var(--color-bg)";
    });
    menuName.style.color = "var(--color-bg)";
  }

  //maintain white for hero section

  function maintainWhite() {
    let scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition < 0.8 * window.innerHeight) {
      makewhite();
      // } else if (scrollPosition >= 0.8 * window.innerHeight && scrollPosition < 1.8 * window.innerHeight) {
      //   makedarker();
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
        onEnter: () => makedarker(),
        onLeave: () => makedark(),
        onEnterBack: () => makewhite(),
        onLeaveBack: () => makedark(),
      },
    });
  });
});

// group 18: create gsap amation on arrows on hover back and forth they move together
