import MouseFollower from "mouse-follower";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/all";
import lozad from "lozad";
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
      scrollTo: {
        y: 0,
      },
      ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  }

  function scrollToPosition() {
    gsap.to(window, {
      duration: 2,
      delay: 0,
      scrollTo: {
        y: ".service-welcome",
      },
      ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  }

  let triggerButton = select(".circle-arrow");
  triggerButton.addEventListener("click", scrollToPosition);
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

function adjustHeight() {
  videotl.to(".cb-intro-figure", {
    width: "98%",
    height: window.matchMedia("(max-width: 767px)").matches ? "50vh" : "98vh",
    ease: "expo.inOut",
  });
}

window.addEventListener("resize", adjustHeight);
adjustHeight();

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
    console.log(
      "%c Greetings from Hypercritical",
      "color:white;background:#c389e1; font-size: 26px;font-family:sans-serif"
    );
  })
  .catch((error) => {
    console.error("Failed to load configuration or assign links:", error);
  });

// Group 7: inverse the arrow colors using gsap

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
  darkSections.forEach((darkSection, i) => {
    //  let id = i;
    //  console.log(id);

    const darken = gsap.timeline({
      scrollTrigger: {
        trigger: darkSection,
        id: i + 1,
        start: "top top",
        endtrigger: darkSection,
        end: "bottom bottom",
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

gsap.registerPlugin(SplitText);

const herolargelogo = select(".hero-largelogo");

let herotext = new SplitText(".innerservice", { type: "chars", charsClass: "inner-service2" });

// const splitchars = selectAll(".split-chars");

// splitchars.forEach((splitchar) => {
//   new SplitText(splitchar, {
//     type: "chars",
//     charsClass: "otherchars",
//   });
// });

// Group 8: years of experience and data
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
        reject(error);
      });
  });
})
  .then(() => {})
  .catch((error) => {
    console.error("Failed to load configuration or assign links:", error);
  });

//Group 9: Lets scan document page

let rightScan = select(".right-scan");
let leftScan = select(".left-scan");

function animatehero() {
  let scantl = gsap.timeline();
  scantl
    .addLabel("start")
    .from(
      rightScan,
      {
        delay: 0.6,
        duration: 2,
        // ease: "power1.inOut",
        x: 100,
      },
      "start"
    )
    .from(
      leftScan,
      {
        delay: 0.6,
        duration: 2,
        // ease: "power1.inOut",
        x: -100,
      },
      "start"
    );
}

window.onload = () => {
  animatehero();
};
