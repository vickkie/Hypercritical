document.addEventListener("DOMContentLoaded", () => {
  let transitionTimeline = gsap.timeline({});

  function animateTransition() {
    transitionTimeline.fromTo(
      ".transition",
      {
        scaleY: 0,
      },
      {
        scaleY: 1,
        duration: 1.2,
        ease: "power2.inOut",
      }
    );
  }

  let allLinks = document.querySelectorAll("a");

  allLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Added 'e' parameter here
      e.preventDefault(); // Prevents the default link behavior
      animateTransition();
      setTimeout(() => {
        window.location.href = link.href;
      }, 1000);
    });
  });
});
