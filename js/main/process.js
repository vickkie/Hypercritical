import MouseFollower from "mouse-follower";

//global
let select = (e) => document.querySelector(e);
let selectAll = (e) => document.querySelectorAll(e);

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
  smooth: 1,
  effects: true,
  smoothTouch: 0.1,
});

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

// Group 2: assign links

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
  })
  .catch((error) => {
    console.error("Failed to load configuration or assign links:", error);
  });

assignExp();

// Group 3: Line Animation
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

selectAll("[line-trigger]").forEach(function (element) {
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

//Group 4: show and hide the scroll top button and scroll to top

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

//Group 5: show mouse follower

document.addEventListener("DOMContentLoaded", function () {
  function cursor() {
    if (innerWidth > 767) {
      let cursorme = new MouseFollower();
    }
  }

  cursor();
  window.addEventListener("res", cursor);
});

// Group 6: blur header

let headertl = gsap.timeline({
  scrollTrigger: {
    trigger: ".process-wrapper-hero",
    start: "center top",
  },
});

headertl.addLabel("start").fromTo(
  ".nav",
  {
    backdropFilter: "blur(0px)",
  },
  {
    backdropFilter: "blur(5px)",
    duration: 0.2,
    ease: "power3.out",
  }
);

// Group 8: inverse the arrow colors using gsap

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

    if (scrollPosition < 1.0 * window.innerHeight) {
      makewhite();
    } else if (scrollPosition >= 1.0 * window.innerHeight && scrollPosition < 1.8 * window.innerHeight) {
      makedarker();
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
        markers: true,
        onEnter: () => makedark(),
        onLeave: () => makewhite(),
        onEnterBack: () => makedark(),
        onLeaveBack: () => makewhite(),
      },
    });
  });
});

//Group 9: parallax hero

function initParallax() {
  let slides = selectAll(".slide");
  let slideId = 0;
  slides.forEach((slide, i) => {
    let imageWrapper = slide.querySelector(".parallax-process");
    function heroParallax() {
      gsap.fromTo(
        imageWrapper,
        {
          y: innerWidth > 767 ? "-60vh" : "-10vh",
        },
        {
          y: innerWidth > 767 ? "60vh" : "10vh",
          scrollTrigger: {
            trigger: slide,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
            markers: !true,
          },
          ease: "none",
        }
      );
    }
    heroParallax();
  });
}

window.onload = () => {
  initParallax();
};

//Group 10: control opening and closing of accordion

document.addEventListener("DOMContentLoaded", function () {
  const detailsElements = document.querySelectorAll(".col__content-txt");

  detailsElements.forEach((details) => {
    const content = details.querySelector(".details-content");
    const summary = details.querySelector("summary");

    // Initially hide the content
    gsap.set(content, { height: 0, overflow: "hidden" });

    function openDetails() {
      // Calculate the height of the content
      const height = content.scrollHeight;

      details.setAttribute("open", "");
      gsap.fromTo(
        content,
        { height: 0 },
        {
          height: height,
          duration: 0.5,
        }
      );
    }

    function closeDetails() {
      // Animate back to height 0
      gsap.to(content, {
        height: 0,
        duration: 0.5,
        onComplete: () => {
          details.removeAttribute("open");
        },
      });
    }

    // Event listener for the summary click
    summary.addEventListener("click", function (event) {
      if (details.hasAttribute("open")) {
        // If the details are open, close them
        closeDetails();
      } else {
        openDetails();
      }

      // Prevent the default action to avoid the default toggle behavior
      event.preventDefault();
    });
  });

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
});
