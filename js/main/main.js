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
