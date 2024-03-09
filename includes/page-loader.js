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
  $("body")
    .imagesLoaded()
    .done(function () {
      animateDone();
    });
});

// let mounted = () => {};

// const preloaderdocs = document.getElementById(".transition-in");

// const vue = new Vue({
//   el: ".loader-trans",
//   data: {
//     loaded: 0,
//     loading: null,
//     loadStyle: {
//       height: "0%",
//       display: "block",
//     },
//     statusElem: $("[status]"),
//     body: $("body"),
//     html: $("html"),
//   },

//   ready() {
//     this.preloader = $(this.$el);
//     this.removeScrolling();

//     // Start tracking resource loading
//     this.startLoading();
//   },
//   watch: {
//     loaded() {
//       this.loadStyle.height = `${this.loaded}%`;
//     },
//   },
//   methods: {
//     removeScrolling() {
//       this.html.css("overflow", "hidden");
//       // this.progressbar.css("display", "block");
//     },
//     startLoading() {
//       this.loading = setInterval(this.load, 20);

//       // Listen for all resources to finish loading
//       window.addEventListener("load", () => {
//         // All resources are loaded
//         this.doneLoading();
//       });
//     },

//     load() {
//       const progress = this.calculateLoadingProgress();
//       const targetProgress = progress.toString().padStart(3, "0");

//       const start = +this.loaded;
//       const end = +targetProgress;

//       const increment = end > start ? 1 : -1;

//       const animateNext = () => {
//         if ((increment > 0 && this.loaded < end) || (increment < 0 && this.loaded > end)) {
//           this.loaded += increment;
//           this.loadStyle.height = `${this.loaded}%`;

//           setTimeout(animateNext, 20);
//         } else {
//           if (progress >= 100) {
//             this.doneLoading();
//           }
//         }
//       };

//       animateNext();
//     },

//     doneLoading() {
//       clearInterval(this.loading);
//       this.loadStyle.height = `100%`;
//       this.updateStatus();
//     },
//     enableScrolling() {
//       this.html.css("overflow-y", "auto");
//       this.animateWebsite();
//     },
//     updateStatus() {
//       this.statusElem.text("100%");
//       // this.loader.fadeOut();
//       this.animatePreloader();
//     },
//     calculateLoadingProgress() {
//       const labeledResources = document.querySelectorAll("[data-label]");

//       const totalLabeledResourcesCount = labeledResources.length;
//       const loadedLabeledResourcesCount = Array.from(labeledResources).filter((resource) => resource.complete).length;
//       const percentageProgress =
//         totalLabeledResourcesCount > 0
//           ? Math.floor((loadedLabeledResourcesCount / totalLabeledResourcesCount) * 100)
//           : 0;

//       return percentageProgress;
//     },
//     animatePreloader() {
//       animateDones();

//       let app = this;

//       let options = {
//         duration: 0,
//         easing: "swing",
//         complete() {
//           app.removePreloader();
//         },
//       };

//       this.preloader.delay(0).animate(options);
//     },
//     removePreloader() {
//       this.preloader.remove();
//       this.enableScrolling();
//     },
//     animateWebsite() {
//       console.log("%c Greetings from HyperCritical", "color:white;background:#c389e1; font-size: 26px;font-family:Uzi");
//     },
//   },
// });
