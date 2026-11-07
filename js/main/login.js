let select = (e) => document.querySelector(e);
document.addEventListener("DOMContentLoaded", () => {
  const titlePage = select(".nav_logo_parent");

  if (matchMedia("screen and (max-width: 768px)").matches) {
    titlePage.innerHTML = "H.C";
  }
});
