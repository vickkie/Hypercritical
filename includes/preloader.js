// Start of preloader vue and jquery

function animateDone() {
  var introTL = gsap.timeline({ delay: 0 }).addLabel("start=+0");
  introTL.to("#loader2", 1, { scaleY: 0, ease: "none" }, "start");
  introTL.to("#loader1", 1, { scaleY: 0, ease: "none" }, "start");
  // introTL.to(".intro__red", 1.4, { scaleY: 0, ease: "none" }, "start=+0.6");
  introTL.to(".intro", 1.2, { scaleY: 0, ease: "none" }, "start=+0.6");
}

function animatingNow() {
  var animating = gsap.timeline({ delay: 0 });
  //   animating.to(".percentage", { scale: 30, duration: 2, ease: "expo.inOut" }, "-=0.85");
}

let mounted = () => {
  document.getElementById("loader1").style.display = "none";
  document.getElementById("loader2").style.display = "block";
};

const preloaderdoc = document.getElementById("preloaderdoc");
const contentLoadingTime = performance.now();

const vue = new Vue({
  el: "#loader2",
  data: {
    loaded: 0,
    loading: null,
    loadStyle: {
      height: "0%",
      display: "block",
    },
    statusElem: $("[status]"),
    loader: $("[loader]"),
    body: $("body"),
    html: $("html"),
    progressbar: $(".preloader__status-bar"),
  },

  ready() {
    this.preloader = $(this.$el);
    this.removeScrolling();

    // Start tracking resource loading
    this.startLoading();
  },
  watch: {
    loaded() {
      this.loadStyle.height = `${this.loaded}%`;
    },
  },
  methods: {
    removeScrolling() {
      this.html.css("overflow", "hidden");
      // this.progressbar.css("display", "block");
    },
    startLoading() {
      this.loading = setInterval(this.load, 20);

      // Listen for all resources to finish loading
      window.addEventListener("load", () => {
        // All resources are loaded
        this.doneLoading();
      });
    },

    load() {
      const progress = this.calculateLoadingProgress();
      const targetProgress = progress.toString().padStart(3, "0");

      const start = +this.loaded;
      const end = +targetProgress;

      const increment = end > start ? 1 : -1;

      const animateNext = () => {
        if ((increment > 0 && this.loaded < end) || (increment < 0 && this.loaded > end)) {
          this.loaded += increment;
          this.loadStyle.height = `${this.loaded}%`;
          if (progress >= 1) {
            mounted();
          }

          setTimeout(animateNext, 20);
        } else {
          if (progress >= 100) {
            this.doneLoading();
          }
        }
      };

      animateNext();
    },

    doneLoading() {
      clearInterval(this.loading);
      this.loadStyle.height = `100%`;
      this.updateStatus();
    },
    enableScrolling() {
      this.html.css("overflow-y", "auto");
      this.animateWebsite();
    },
    updateStatus() {
      this.statusElem.text("100%");
      // this.loader.fadeOut();
      this.animatePreloader();
    },
    calculateLoadingProgress() {
      const labeledResources = document.querySelectorAll("[data-label]");

      const totalLabeledResourcesCount = labeledResources.length;
      const loadedLabeledResourcesCount = Array.from(labeledResources).filter((resource) => resource.complete).length;
      const percentageProgress =
        totalLabeledResourcesCount > 0
          ? Math.floor((loadedLabeledResourcesCount / totalLabeledResourcesCount) * 100)
          : 0;

      return percentageProgress;
    },
    animatePreloader() {
      // setTimeout(() => {
      // this.enableScrolling();
      // animatingNow();

      /* -> */ animateDone();
      // }, 500);

      let app = this;

      let options = {
        duration: 0,
        easing: "swing",
        complete() {
          app.removePreloader();
        },
      };

      this.preloader.delay(0).animate(options);
    },
    removePreloader() {
      this.preloader.remove();
      this.enableScrolling();
      // this.animateWebsite();
      // animateDone();
    },
    animateWebsite() {
      console.log("%c Greetings from HyperCritical", "color:white;background:#c389e1; font-size: 26px;font-family:Uzi");
    },
  },
});
