import MouseFollower from "mouse-follower";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/all";
import lozad from "lozad";
import Reeller from "reeller";
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

let elements = selectAll(".rolling-text");

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

//Group 7: cursor to view projects

var mediaWrappers = selectAll(".media-wrapper");

// Function to handle mousemove event
function handleMouseMove(e) {
  var x = e.clientX;
  var y = e.clientY;

  gsap.to(".view-cursor", 0.5, { duration: 0, x: x, y: y });
}

// Function to handle mouseenter event
function handleMouseEnter() {
  gsap.to(".view-cursor", 0.5, { scale: 1, ease: "expo.inOut" });
}

// Function to handle mouseleave event
function handleMouseLeave() {
  gsap.to(".view-cursor", 0.5, { scale: 0, ease: "expo.inOut" });
}

// event listeners for each
mediaWrappers.forEach(function (mediaWrapper) {
  mediaWrapper.addEventListener("mousemove", handleMouseMove);
  mediaWrapper.addEventListener("mouseenter", handleMouseEnter);
  mediaWrapper.addEventListener("mouseleave", handleMouseLeave);
});

//Group 8: menuUzi midmoon
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

// Group 8: assign links for socials

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

// Group 10: inverse the arrow colors using gsap

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

//Group 11: gsap show and hide sidebar for projects

function startLenis(i) {
  let customWrapper = select(".work-drawer .inner");
  let content = select(".scroll-wrapper");
  let body = select("body");

  let lenis = new Lenis({
    // wrapper: customWrapper,
    // content: content,
    // eventsTarget: customWrapper,
    // eventsTarget: body,
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

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

function killLenis() {
  lenis.destroy();
}

let tileButtons = document.querySelectorAll(".work-tile");
let thisDOM = select("html");

tileButtons.forEach((button, i) => {
  button.addEventListener("click", () => {
    gsap
      .timeline()
      .addLabel("start", "+=0")
      .to(
        ".work-drawer",
        {
          duration: 1,
          xPercent: -100,
          ease: "power2.inOut",
          onComplete: () => {},
        },
        "start"
      )
      .to(
        ".backdrop",
        {
          opacity: 1,
          duration: 0.01,
          scale: 1,
          onComplete: () => {
            killLenis();
            // console.log(`killed lenis${i}`);
          },
        },
        "start"
      );

    let closeDrawer = select(".closeDrawer");

    closeDrawer.addEventListener("click", () => {
      gsap
        .timeline({ defaults: { ease: "power2.inOut" } })
        .addLabel("start", "+=0")
        .to(".work-drawer", {
          duration: 1,
          xPercent: 0,
          ease: "power2.inOut",
        })
        .to(backdrop, {
          opacity: 0,
          duration: 0.01,
          scale: 0,
          onComplete: () => {
            startLenis();
          },
        })
        .to(
          ".drawer-wrapper",
          {
            scrollTop: 0,
            duration: 0.5,
            ease: "power2.inOut",
          },
          "start"
        );
    });

    // Select the target element
  });
});

let backdrop = select("#backdrop");
backdrop.addEventListener("click", () => {
  gsap
    .timeline({ defaults: { ease: "power2.inOut" } })
    .addLabel("start=+0")
    .to(
      ".work-drawer",
      {
        duration: 1,
        xPercent: 0,
        ease: "power2.inOut",
      },
      "start"
    )
    .to(
      backdrop,
      {
        opacity: 0,
        duration: 0.01,
        scale: 0,
        onComplete: () => {
          startLenis();
        },
      },
      "start"
    )
    .to(
      ".drawer-wrapper",
      {
        scrollTop: 0,
        duration: 0.5,
        ease: "power2.inOut",
      },
      "start"
    );
});
