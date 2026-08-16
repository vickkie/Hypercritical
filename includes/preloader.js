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
    // Monotonic target — only ever increases, so the displayed value
    // can never move backwards. This is what stops the 49,48,49,50 chatter.
    targetLoaded: 0,
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
      // Show loader2 / hide loader1 once, up front.
      mounted();

      // Single animation loop. Previously this used setInterval(load, 20)
      // AND each load() spawned its own recursive setTimeout chain, so
      // multiple chains mutated `loaded` at the same time — the root cause
      // of the 49,48,49,50 jumping. One rAF loop = one writer.
      this.loading = requestAnimationFrame(this.tick);

      // When all resources finish, push the target to 100 and let the
      // loop ease the displayed value up to it smoothly.
      window.addEventListener("load", () => {
        this.targetLoaded = 100;
      });
    },

    // One frame of the loader. Called via requestAnimationFrame only.
    tick() {
      const sampled = this.calculateLoadingProgress();

      // Monotonic floor: the target never moves backwards.
      if (sampled > this.targetLoaded) this.targetLoaded = sampled;

      // Ease toward the target. Math.ceil on the gap guarantees we always
      // advance by at least 1 per frame while below target (so the number
      // never stalls), and the 0.18 factor makes the step shrink as we
      // approach — giving a smooth deceleration instead of a flat ±1 march.
      const gap = this.targetLoaded - this.loaded;
      if (gap > 0) {
        this.loaded = Math.min(100, this.loaded + Math.max(1, Math.ceil(gap * 0.18)));
        this.loadStyle.height = `${this.loaded}%`;
      }

      if (this.loaded >= 100) {
        this.doneLoading();
        return;
      }

      this.loading = requestAnimationFrame(this.tick);
    },

    doneLoading() {
      if (this.loading) cancelAnimationFrame(this.loading);
      this.loading = null;
      this.loaded = 100;
      this.targetLoaded = 100;
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
      setTimeout(() => {
        animateDone();
      }, 200);

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
