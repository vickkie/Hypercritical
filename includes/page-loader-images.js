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

$(document).ready(function () {
  $("body")
    .imagesLoaded()
    .progress(function (instance, img) {})
    .done(function (instance) {
      animateDone();
    })
    .fail(function (instance) {
      console.error("One or more images failed to load.");

      setTimeout(() => {
        animateDone();
      }, 500);
    });
});
