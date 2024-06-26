import MouseFollower from "mouse-follower";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
// import Lenis from "@studio-freight/lenis";
//global

let select = (e) => document.querySelector(e);
let selectAll = (e) => document.querySelectorAll(e);

//   Group 0: smooth scroll

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function smoothTouch(params) {
  if (innerWidth > 767) {
    ScrollSmoother.create({
      smooth: 1,
      effects: true,
      smoothTouch: 0.1,
    });
  } else {
    console.info("Phone detected");
  }
}

smoothTouch();

window.addEventListener("resize", smoothTouch);

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

// Group 1.1: assign links

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

function generateInvoiceNumber() {
  // Generate a UUID
  const uuid = uuidv4();
  const uniquePart = uuid.substring(0, 6);
  const invoiceNumber = `INV-${uniquePart}`;
  return invoiceNumber;
}

// Function to handle form submission
document.getElementById("consultationForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var message = document.getElementById("message").value;
  var email = document.getElementById("email").value;
  var name = document.getElementById("yourname").value;
  const uuid = generateInvoiceNumber();
  var status = "Pending";

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

  //get country analytics data, simple

  // Function to fetch the visitor's IP address
  const fetchIpAddress = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Error fetching IP:", error);
      return null;
    }
  };

  // Function to query the IP address for geolocation data
  const fetchGeolocationData = async (ipAddress) => {
    if (!ipAddress) return;

    try {
      const response = await fetch(`http://ip-api.com/json/${ipAddress}`);
      const data = await response.json();
      updateCountry(data.country);
    } catch (error) {
      console.error("Error fetching geolocation data:", error);
    }
  };

  // Function to update the result element with the country name
  const updateCountry = (country) => {
    console.log(country);
    return country;
  };

  // Main logic
  const countryOrigin = async () => {
    const ipAddress = await fetchIpAddress();
    if (ipAddress) {
      fetchGeolocationData(ipAddress);
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    countryOrigin();
  });

  // Generate a unique ID for the new entry

  // Generate a unique ID for the new entry
  // Assuming `uuid` is the UUID for the new consultation
  var newConsultationRef = ref(database, `consultations/${uuid}`);
  set(newConsultationRef, {
    uuid: uuid,
    name: name,
    message: message,
    budget: budget,
    consultationType: consultationType,
    email: email,
    status: status,
    date: new Date().toISOString(),
    comment: `Added From  website registration`,
    seen: "Unread",
    country: countryOrigin(),
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
  checkradio.addEventListener("doubleclicked", () => {
    classList.remove("clicked");
  });
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
        });
        snipeBlack.addEventListener("mouseleave", () => {
          root.style.setProperty("--sniper-color", "var(--main-sub");
        });
      });
    }
  }

  cursor();

  window.addEventListener("resize", cursor);
});

// Group 7: blur header

let headertl = gsap.timeline({
  scrollTrigger: {
    trigger: ".socials-header",
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

const herolargelogo = select(".heading-2.split-chars");
let herotext = new SplitText(herolargelogo, { type: "chars", charsClass: "splitted" });

let splittext = gsap.utils.toArray(".splitted");

function animatehero() {
  let herotl = gsap.timeline();
  herotl
    .addLabel("start")
    .from(
      splittext,
      {
        delay: 0.6,
        duration: 1.2,
        // ease: "power1.inOut",
        y: 120,
      },
      "start"
    )
    .from(
      ".get-in-touch",
      {
        y: "5%",
        duration: 1.2,
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

document.addEventListener("DOMContentLoaded", () => {
  setInterval(() => {
    let chatIframe = document.getElementById("tidio-chat-iframe");
    let chatIframeid = chatIframe ? chatIframe.id : null;

    if (chatIframe) {
      function hideShit() {
        const chatWindow = chatIframe.contentWindow;
        const iframeDocument = chatWindow.document;

        let blockLink = iframeDocument.querySelector(".tidio-5hhiig");

        if (blockLink) {
          blockLink.style.display = "none";
        } else {
          // console.log("block link not found");
        }
      }
      hideShit();
    } else {
      // console.log("chat button not found");
    }
  }, 1000);
});

window.onload = () => {
  animatehero();
  setTimeout(() => {
    changeColors();
  }, 4000);
};
