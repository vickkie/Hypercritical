// Start of preloader Vue and jQuery

function animateDone() {
  let transitionTimeline = gsap.timeline({});

  transitionTimeline.fromTo(
    ".transition-in",
    {
      scaleY: 1,
    },
    {
      scaleY: 0,
      duration: 1.2,
      ease: "power2.inOut",
    }
  );
}

// Assuming you've included jQuery and the imagesLoaded plugin correctly
$(document).ready(function () {
  $("body");
  // .imagesLoaded()
  // .done(function () {
  animateDone();
  // });
});
