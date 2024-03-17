import MouseFollower from "mouse-follower";
import Lenis from "@studio-freight/lenis";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";
//global

let select = (e) => document.querySelector(e);
let selectAll = (e) => document.querySelectorAll(e);

//   Group 0: smooth scroll

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

// Group 1: assign links

let mouseFollower = new MouseFollower();

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

//group 2 : overlay and succes button

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

// Group 3: firebase

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

//Group 4 :toggle buttons color for submition

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

//group 5: show and hide the scroll top button and scroll to top

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

//Group 6: show mouse follower

document.addEventListener("DOMContentLoaded", function () {
  function cursor() {
    if (innerWidth > 767) {
      let cursorme = new MouseFollower();
    }
  }

  cursor();
  window.addEventListener("res", cursor);
});
