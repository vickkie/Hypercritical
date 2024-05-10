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

// Group 5: blur header

let headertl = gsap.timeline({
  scrollTrigger: {
    trigger: ".project-title",
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

//Group 9: split using  gsap splitetext

gsap.registerPlugin(SplitText);

const herolargelogo = select(".project-title");
let herotext = new SplitText(herolargelogo, { type: "chars", charsClass: "split-chars" });

console.log(herotext);

let splittext = gsap.utils.toArray(".split-chars");

function animatehero() {
  let herotl = gsap.timeline();
  herotl.addLabel("start").from(
    splittext,
    {
      delay: 0.6,
      duration: 1.2,
      // ease: "power1.inOut",
      y: 120,
    },
    "start"
  );
}

function changeColors() {
  let navtl = gsap.timeline({
    scrollTrigger: {
      trigger: ".footer",
      start: "top top",
      toggleActions: "play none none reverse",
    },
  });

  navtl
    .addLabel("start")
    .fromTo(
      ".nav_logo_parent",
      {
        color: "var(--color-black)",
      },
      {
        color: "var(--color-bg)",
        duration: 0.1,
        ease: "power4.out",
      }
    )
    .fromTo(
      ".est_nav svg",
      {
        fill: "var(--color-black)",
      },
      {
        fill: "var(--color-bg)",
        duration: 0.1,
        ease: "power4.out",
      }
    );
}

window.onload = () => {
  animatehero();
  setTimeout(() => {
    changeColors();
  }, 4000);
};
