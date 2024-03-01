let logomain = document.querySelector(".nav_logo_parent");
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
  logomain.style.color = "var(--color-black)";
}

menuopen.addEventListener("click", open);
menuclose.addEventListener("click", close);
