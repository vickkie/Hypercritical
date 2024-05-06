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

    if (document.querySelector(".transition-in")) {
      gsap.to(
        ".transition-in",
        {
          scaleY: 1,
          duration: 1.1, // Adjusted duration to match the timeline
          ease: "power2.inOut", // Added ease for consistency
        },
        "start+=1.0"
      );
    } else {
      //escape the loop if not found

      gsap.to(
        ".transition-out",
        {
          scaleY: 0,
          duration: 1.1, // Adjusted duration to match the timeline
          ease: "power2.inOut", // Added ease for consistency
        },
        "start+=1.0"
      );
      console.warn("transition not found");
    }
  }

  let allLinks = document.querySelectorAll(".transit");

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

// group 2: forced reload on back to ensure transition is done

window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    window.location.reload();
  }
});
