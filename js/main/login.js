let select = (e) => document.querySelector(e);
let selectAll = (e) => document.querySelectorAll(e);

document.addEventListener("DOMContentLoaded", () => {
  const titlePage = select(".nav_logo_parent");
  const email = select(".inputLogin1");
  const password = select(".inputLogin2");
  const passwordInput = select(".inputLogin2");
  console.log(passwordInput);

  if (matchMedia("screen and (max-width: 768px)").matches) {
    titlePage.innerHTML = "H.C";
  }
});
