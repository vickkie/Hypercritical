document.addEventListener("DOMContentLoaded", () => {
  function animateTransition() {
    // Initialize the timeline
    const transitionTimeline = gsap.timeline();

    // Add a label to the timeline and animate the transition-out element
    transitionTimeline.addLabel("start", 0).fromTo(
      ".transition-out",
      {
        scaleY: 0,
      },
      {
        scaleY: 1,
        duration: 1.2,
        ease: "power2.inOut",
      },
      "start"
    );

    // Animate the transition-in element
    TweenMax.to(
      ".transition-in",
      {
        scaleY: 1,
        duration: 1.1, // Adjusted duration to match the timeline
        ease: "power2.inOut", // Added ease for consistency
      },
      "start+=1.0"
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
