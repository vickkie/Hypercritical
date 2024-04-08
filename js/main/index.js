<<<<<<< HEAD:js/main/main.js
import MouseFollower from"mouse-follower";import Lenis from"@studio-freight/lenis";import{initializeApp}from"firebase/app";import{getDatabase,ref,push,set}from"firebase/database";import lozad from"lozad";let select=e=>document.querySelector(e),selectAll=e=>document.querySelectorAll(e);document.addEventListener("DOMContentLoaded",(function(){lozad(".lozad",{rootMargin:"100px 0px",loaded:function(e){}}).observe()})),"serviceWorker"in navigator&&window.addEventListener("load",(()=>{navigator.serviceWorker.register("hypercritical-worker.js").catch((e=>console.log("Error:",e)))}));let midmoon=select(".mid-moon"),menuclose=select(".action--close"),menuopen=select(".action--menuUzi");function open(){midmoon.classList.add("mid-moon--light"),midmoon.classList.remove("mid-moon--dark")}function close(){midmoon.classList.add("mid-moon--dark"),midmoon.classList.remove("mid-moon--light")}function assignLinks(e){for(const o in e)if(e.hasOwnProperty(o)){selectAll(o).forEach((t=>{t?t.href=e[o]:console.error(`Elements matching selector ${o} not found.`)}))}}menuopen.addEventListener("click",open),menuclose.addEventListener("click",close),new Promise(((e,o)=>{document.addEventListener("DOMContentLoaded",(function(){fetch("includes/config.json").then((e=>e.json())).then((o=>{assignLinks(o),e()})).catch((e=>{console.error("Error loading config:",e),o(e)}))}))})).then((()=>{})).catch((e=>{console.error("Failed to load configuration or assign links:",e)})),document.addEventListener("DOMContentLoaded",(()=>{let e=select(".menuUzi__item-link"),o=e.querySelector(".contact-emoji"),t=gsap.timeline();e.addEventListener("mouseover",(()=>{t.to(o,{duration:1,rotation:-360,repeat:-1,ease:"linear"})})),e.addEventListener("mouseout",(()=>{t.kill()}))}));const lenis=new Lenis({duration:3,easing:e=>Math.min(1,1.001-Math.pow(2,-10*e)),direction:"vertical",gestureDirection:"vertical",smooth:!0,smoothTouch:!1,touchMultiplier:2,infinite:!1,autoResize:!0});function raf(e){lenis.raf(e),requestAnimationFrame(raf)}lenis.on("scroll",(e=>{})),requestAnimationFrame(raf),gsap.registerPlugin(ScrollTrigger),gsap.registerPlugin(ScrollToPlugin),gsap.registerPlugin(SplitText);const herolargelogo=select(".hero-largelogo");let herotext=new SplitText(herolargelogo,{type:"words",wordsClass:"hero-words"});const splitchars=selectAll(".split-chars");splitchars.forEach((e=>{new SplitText(e,{type:"chars",charsClass:"otherchars"})}));let herowords=selectAll(".hero-words"),heroSeparator=select(".below-line"),heroMedia=select(".hero-image"),heroimageWrapper=select(".parallax-hero");const showHero=()=>{gsap.timeline({defaults:{ease:"expo.out",delay:.5}}).addLabel("start").fromTo(heroSeparator,{width:0},{duration:1.75,width:"100%",stagger:.095},"start").fromTo(herowords,{y:"110%"},{delay:0,duration:2.3,y:"0",stagger:.17,ease:"expo.inOut"},"start+=0.28").fromTo(heroMedia,{width:0},{width:"100%",duration:1.5,ease:"expo.inOut",transformOrigin:"50% 50% 0"},"start+=0.7")};function initParallax(){selectAll(".slide").forEach(((e,o)=>{let t=e.querySelector(".parallax-image");gsap.fromTo(t,{y:"-60vh"},{y:"60vh",scrollTrigger:{trigger:e,scrub:!0,start:"top bottom",end:"bottom top",markers:!1},ease:"none"})}))}function scrollTop(){gsap.to(window,{duration:2,scrollTo:{y:"nav"},ease:"power2.inOut"})}function lineTimeline(e){const o=gsap.timeline({defaults:{duration:3,ease:"power3.out"}});return o.fromTo(e,{scaleX:0,opacity:0,transformOrigin:"left left"},{scaleX:1,opacity:1}),o}document.addEventListener("DOMContentLoaded",(function(){showHero(),setTimeout((()=>{initParallax(),scrollTop()}),3e3)})),selectAll("[line-trigger]").forEach((function(e){const o=e.getAttribute("line-trigger"),t=lineTimeline(e);ScrollTrigger.create({trigger:o,start:"top 92%",animation:t,onEnter:()=>t.play(),onLeaveBack:()=>t.reverse({duration:6.5})})})),document.addEventListener("DOMContentLoaded",(function(){let e=select("#toTop");function o(){(window.scrollY||document.documentElement.scrollTop)>1.2*window.innerHeight?e.style.display="block":e.style.display="none"}o(),window.addEventListener("scroll",o),e.addEventListener("click",(function(){gsap.to(window,{duration:2,delay:0,scrollTo:{y:".hero-main"},ease:e=>Math.min(1,1.001-Math.pow(2,-10*e))})}))})),document.addEventListener("DOMContentLoaded",(function(){function e(){if(innerWidth>767){new MouseFollower}}e(),window.addEventListener("res",e)}));const accordionItems=selectAll("details");accordionItems.forEach((e=>{e.addEventListener("click",(o=>{accordionItems.forEach((o=>{o!=e&&o.removeAttribute("open")}))}))}));let elephant=select(".c-elephant_himself"),elephant_wrapper=select(".elephant-boundary");elephant_wrapper.addEventListener("mouseenter",(()=>{new MouseFollower({el:elephant,container:elephant_wrapper,speed:22.5})}));let peanutWrapper=select(".ourservices");const peanutcursor=new MouseFollower;peanutWrapper.addEventListener("mouseenter",(()=>{peanutcursor.setImg("./../../assets/images/peanut.webp")})),peanutWrapper.addEventListener("mouseleave",(()=>{peanutcursor.removeImg()})),document.addEventListener("DOMContentLoaded",(()=>{gsap.registerPlugin(ScrollTrigger);const e=gsap.utils.toArray(".white-section");var o=select(".top-arrow-wrapper"),t=select(".top-arrow-path"),r=select(".menu-name"),n=selectAll(".menu-dot-line");function a(){t.style.stroke="var(--color-bg)",o.style.fill="var(--color-black)",n.forEach((e=>{e.style.background="var(--color-black)"})),r.style.color="var(--color-black)"}function i(){t.style.stroke="var(--color-black)",o.style.fill="var(--color-bg)",n.forEach((e=>{e.style.background="var(--color-bg)"})),r.style.color="var(--color-bg)"}e.forEach(((e,o)=>{gsap.timeline({scrollTrigger:{trigger:e,id:o+1,start:"top top",endtrigger:e,end:"bottom bottom",scrub:!0,onEnter:()=>i(),onLeave:()=>a(),onEnterBack:()=>i(),onLeaveBack:()=>a()}})}))}));import{Item}from"./code-anime/item";[...selectAll(".grid-itemz > .grid__item-img")].forEach((e=>new Item(e)));let worldvideoWrapper=select(".global-video"),worldvideo=select("#video-background");gsap.registerPlugin(ScrollTrigger);const animateVideo=gsap.timeline({scrollTrigger:{trigger:worldvideoWrapper,start:"top bottom",end:"top top",scrub:!0,markers:!1,toggleActions:"play none none reverse"}});animateVideo.fromTo(worldvideo,{scaleX:.9,borderRadius:"45px"},{scaleX:1,borderRadius:"0px"});const playvideotl=gsap.timeline({scrollTrigger:{trigger:worldvideo,start:"top bottom",end:"bottom top",scrub:!0,onEnter:()=>{worldvideo.paused&&worldvideo.play().catch((e=>{"NotAllowedError"===e.name?console.log("Play request was interrupted by a pause call."):console.error("An unexpected error occurred:",e)}))},onLeave:()=>{worldvideo.paused||worldvideo.pause()},onEnterBack:()=>{worldvideo.paused&&worldvideo.play().catch((e=>{"NotAllowedError"===e.name?console.log("Play request was interrupted by a pause call."):console.error("An unexpected error occurred:",e)}))},onLeaveBack:()=>{worldvideo.paused||worldvideo.pause()}}});var playPromise=worldvideo.play();function showDialog(){gsap.to("#overlay",{duration:.5,opacity:1,scale:1,onComplete:()=>{gsap.to("#dialog",{duration:.5,scale:1,opacity:1,ease:"bounce"})}})}function hideDialog(){gsap.to("#dialog",{duration:.5,scale:0,opacity:0,onComplete:()=>{gsap.to("#overlay",{duration:.5,opacity:0,scale:0})}})}void 0!==playPromise&&playPromise.then((e=>{})).catch((e=>{})),document.addEventListener("DOMContentLoaded",(function(){const e=select(".carousel"),o=select(".-prev"),t=select(".-next");let r=0;function n(o){const t=e.children[0].offsetWidth,n=(e.offsetWidth,e.children.length);"next"===o?r=(r+1)%n:"back"===o&&(r=(r-1+n)%n),e.style.transform=`translateX(-${r*t}px)`}o.addEventListener("click",(function(){n("back")})),t.addEventListener("click",(function(){n("next")}))}));const firebaseConfig={apiKey:process.env.FIREBASE_API_KEY,authDomain:process.env.FIREBASE_AUTH_DOMAIN,databaseURL:process.env.FIREBASE_DATABASE_URL,projectId:process.env.FIREBASE_PROJECT_ID,storageBucket:process.env.FIREBASE_STORAGE_BUCKET,messagingSenderId:process.env.FIREBASE_MESSAGING_SENDER_ID,appId:process.env.FIREBASE_APP_ID,measurementId:process.env.FIREBASE_MEASUREMENT_ID},app=initializeApp(firebaseConfig),database=getDatabase(app);document.getElementById("consultationForm").addEventListener("submit",(function(e){e.preventDefault();var o=document.getElementById("message").value,t=document.getElementById("email").value,r=document.getElementById("yourname").value,n="";document.getElementById("Web-Design").checked&&(n+="Web Design, "),document.getElementById("SEO").checked&&(n+="SEO, "),document.getElementById("Development").checked&&(n+="Development, "),document.getElementById("Other").checked&&(n+="Other, "),n=n.slice(0,-2);for(var a="",i=document.getElementsByName("priceGroup"),l=0;l<i.length;l++)if(i[l].checked){a=i[l].id;break}var s=push(ref(database,"consultations"));set(s,{name:r,message:o,budget:a,consultationType:n,email:t,date:(new Date).toISOString()}),showDialog(),document.getElementById("consultationForm").reset()})),select(".close-dialog").addEventListener("click",hideDialog);let checkboxes=selectAll('input[type="checkbox"]');const changeColor=e=>{e.target.parentNode.querySelector(".checkbox-input").classList.toggle("clicked-color"),e.target.parentNode.querySelector(".checkbox-text").classList.toggle("clicked-text")};checkboxes.forEach((e=>{e.addEventListener("change",changeColor)}));let checkradios=selectAll('input[type="radio"]');const changeColorr=e=>{let o=e.target.parentNode.querySelector(".radio-text");selectAll(".radio-text").forEach((e=>e.parentElement.classList.remove("clicked"))),o.parentElement.classList.add("clicked")};function playVideo(e){e.querySelector(".grid__item-video").play()}function resetVideo(e){var o=e.querySelector(".grid__item-video");o.pause(),o.currentTime=0}function toggleVideo(e){var o=e.querySelector(".grid__item-video");o.paused?o.play():(o.pause(),o.currentTime=0)}checkradios.forEach((e=>{e.addEventListener("change",changeColorr)}));const videoDown=e=>{gsap.timeline({defaults:{ease:"expo.out",delay:0}}).fromTo(e.querySelector(".grid__item-video"),{y:"0%"},{duration:1.25,y:"101%",ease:"expo.inOut"},0)},videoUp=e=>{gsap.timeline({defaults:{ease:"expo.out",delay:0}}).fromTo(e.querySelector(".grid__item-video"),{y:"101%"},{duration:1.25,y:"0%",ease:"expo.inOut"},0)};let imgconts=selectAll(".grid-item-vid");imgconts.forEach((e=>{e.addEventListener("mouseenter",(()=>{e.querySelector(".grid__item-video").style.display="block",videoDown(e)}))})),imgconts.forEach((e=>{e.addEventListener("mouseout",(()=>{let o=e.querySelector(".grid__item-video");videoUp(e),setTimeout((()=>{resetVideo(e),o.style.display="none"}),2e3)}))}));
=======
//Imports modules in file
import MouseFollower from "mouse-follower";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";
import lozad from "lozad";

// import gsap from "gsap";
// import "splitting/dist/splitting.css";
// import "splitting/dist/splitting-cells.css";
// import Splitting from "splitting";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import ScrollToPlugin from "gsap/ScrollToPlugin";

//global
let select = (e) => document.querySelector(e);
let selectAll = (e) => document.querySelectorAll(e);

// Group 0: lazyload lodash

document.addEventListener("DOMContentLoaded", function () {
  const observer = lozad(".lozad", {
    rootMargin: "100px 0px",
    loaded: function (el) {
      // console.log("Element loaded:", el);
    },
  });
  observer.observe();
});

// group 0.1 : register service worker

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("hypercritical-worker.js")
      //  .then(reg=>
      //   // console.log('serviceWorker')
      //   )
      .catch((err) => console.log("Error:", err));
  });
}

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

//GRoup 3: animation on hover of contact emoji

document.addEventListener("DOMContentLoaded", () => {
  let menuUziItemLink = select(".menuUzi__item-link");
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

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function smoother() {
  ScrollSmoother.create({
    smooth: 1,
    effects: true,
    smoothTouch: 0.1,
  });
}

if (window.innerWidth > 767) {
  smoother();
}

window.addEventListener("resize", smoother);

//Group 5: Animating into into place

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(SplitText);

const herolargelogo = select(".hero-largelogo");

let herotext = new SplitText(herolargelogo, { type: "words", wordsClass: "hero-words" });

const splitchars = selectAll(".split-chars");

splitchars.forEach((splitchar) => {
  new SplitText(splitchar, {
    type: "chars",
    charsClass: "otherchars",
  });
});

let herowords = selectAll(".hero-words");

// console.log(herowords);

let heroSeparator = select(".below-line"),
  heroMedia = select(".parallax-hero");
let heroimageWrapper = select(".hero-image");

const showHero = () => {
  gsap
    .timeline({ defaults: { ease: "expo.out", delay: 0.5 } })
    // .set(heroMedia, { y: "-47.8vh" }, "=-1")
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
      heroimageWrapper,
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
    function heroParallax() {
      gsap.fromTo(
        imageWrapper,
        {
          y: innerWidth > 767 ? "-60vh" : "-30vh",
        },
        {
          y: innerWidth > 767 ? "60vh" : "30vh",
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
    }

    heroParallax();
    window.addEventListener("resize", heroParallax);
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
  initParallax();
  setTimeout(() => {
    scrollTop();
  }, 3000);
});

//group 7 : animate divider lines using gsap and scrollTrigger

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

//group 8: show and hide the scroll top button and scroll to top

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

// Group 11: elephant fun mouse

let elephant = select(".c-elephant_himself");
let elephant_wrapper = select(".elephant-boundary");
// elephant_wrapper.addEventListener("mouseenter", () => {

const elephantcursor = new MouseFollower({
  el: elephant,
  container: elephant_wrapper,
  speed: 22.5,
  hideTimeout: 30000,
});

// });

let peanutWrapper = select(".ourservices");
const peanutcursor = new MouseFollower();

peanutWrapper.addEventListener("mouseenter", () => {
  peanutcursor.setImg("./../../assets/images/peanut.webp");
});

peanutWrapper.addEventListener("mouseleave", () => {
  peanutcursor.removeImg();
});

// Group 12: inverse the arrow colors using gsap

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

//group 13: imported imagehover on innovation services

import { Item } from "./code-anime/item";

[...selectAll(".grid-itemz > .grid__item-img")].forEach((img) => new Item(img));

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
    end: "bottom top",
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

var playPromise = worldvideo.play();

if (playPromise !== undefined) {
  playPromise.then((_) => {}).catch((error) => {});
}

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

select(".close-dialog").addEventListener("click", hideDialog);

//Group 16: toggle buttons color for submition
let checkboxes = selectAll('input[type="checkbox"]');

const changeColor = (event) => {
  let wrapper = event.target.parentNode.querySelector(".checkbox-input");
  wrapper.classList.toggle("clicked-color");
  let wrappertext = event.target.parentNode.querySelector(".checkbox-text");
  wrappertext.classList.toggle("clicked-text");
};

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", changeColor);
});

let checkradios = selectAll('input[type="radio"]');

const changeColorr = (event) => {
  // Find the .radio-text element within the parent of the clicked radio button
  let radiotext = event.target.parentNode.querySelector(".radio-text");
  // Remove 'clicked' class from all .radio-text elements
  selectAll(".radio-text").forEach((rb) => rb.parentElement.classList.remove("clicked"));

  radiotext.parentElement.classList.add("clicked");
};

checkradios.forEach((checkradio) => {
  checkradio.addEventListener("change", changeColorr);
});

// group 17: dropdown video

function playVideo(element) {
  var video = element.querySelector(".grid__item-video");
  video.play();
}

function resetVideo(element) {
  var video = element.querySelector(".grid__item-video");
  video.pause();
  video.currentTime = 0;
}

function toggleVideo(element) {
  var video = element.querySelector(".grid__item-video");
  if (video.paused) {
    video.play();
  } else {
    video.pause();
    video.currentTime = 0;
  }
}

const videoDown = (element) => {
  gsap
    .timeline({ defaults: { ease: "expo.out", delay: 0 } })
    .fromTo(
      element.querySelector(".grid__item-video"),
      { y: "0%" },
      { duration: 1.25, y: "101%", ease: "expo.inOut" },
      0
    );
};

const videoUp = (element) => {
  gsap
    .timeline({ defaults: { ease: "expo.out", delay: 0 } })
    .fromTo(
      element.querySelector(".grid__item-video"),
      { y: "101%" },
      { duration: 1.25, y: "0%", ease: "expo.inOut" },
      0
    );
};

let imgconts = selectAll(".grid-item-vid");

imgconts.forEach((imgcont) => {
  imgcont.addEventListener("mouseenter", () => {
    let gridItemVideo = imgcont.querySelector(".grid__item-video");
    gridItemVideo.style.display = "block";
    videoDown(imgcont); // Call videoDown on mouseenter
  });
});

imgconts.forEach((imgcont) => {
  imgcont.addEventListener("mouseout", () => {
    let gridItemVideo = imgcont.querySelector(".grid__item-video");
    videoUp(imgcont); // Call videoUp on mouseout

    setTimeout(() => {
      resetVideo(imgcont);
      gridItemVideo.style.display = "none";
    }, 2000);
  });
});
>>>>>>> main:js/main/index.js
