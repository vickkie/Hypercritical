{
  // Class menuUzi.

  let allowTilt = true;

  class MenuUzi {
    constructor(el) {
      this.DOM = { el: el };
      // Open and close ctls.
      this.DOM.openCtrl = this.DOM.el.querySelector(".action--menuUzi");
      this.DOM.closeCtrl = this.DOM.el.querySelector(".action--close");
      this.DOM.openCtrl.addEventListener("click", () => this.open());
      this.DOM.closeCtrl.addEventListener("click", () => this.close());
      this.DOM.openCtrl.addEventListener("mouseenter", () => {
        allowTilt = false;
        tilt.reset();
      });
      this.DOM.openCtrl.addEventListener("mouseleave", () => {
        allowTilt = true;
      });

      // The menuUzi items.
      this.DOM.items = Array.from(this.DOM.el.querySelectorAll(".menuUzi__item"));
      // The total number of items.
      this.itemsTotal = this.DOM.items.length;

      // Custom elements that will be animated.
      this.DOM.mainLinks = this.DOM.el.querySelectorAll(".mainmenuUzi > a.mainmenuUzi__item");
      this.DOM.sidemenuUziLinks = this.DOM.el.querySelectorAll(".sidemenuUzi span.sidemenuUzi__item-inner");
      this.DOM.menuUzilink = this.DOM.el.querySelector(".menuUzi__item-link");
    }
    // Open the menuUzi.
    open() {
      this.toggle("open");
    }
    // Close the menuUzi.
    close() {
      this.toggle("close");
    }
    toggle(action) {
      if (this.isAnimating) return;
      // (dis)allow the main image tilt effect.
      allowTilt = action === "open" ? false : true;
      this.isAnimating = true;
      // Toggling the open state class.
      this.DOM.el.classList[action === "open" ? "add" : "remove"]("menuUzi--open");
      // After all is animated..
      const animationEnd = (pos) => {
        if (pos === this.itemsTotal - 1) {
          this.isAnimating = false;
        }
      };
      // Going through each menuUzi´s item.
      this.DOM.items.forEach((el, pos) => {
        // The inner wrapper.
        const innerEl = el.querySelector(".menuUzi__item-inner");
        // config and inner config will have the starting transform values (when opening) and the end ones (when closing) for both the item and its inner element.
        const config = {};
        const configInner = {};
        // Direction defined in the HTML data-direction.
        // bt (bottom to top) || tb (top to bottom) || lr (left to right) || rl (right to left)
        const direction = el.dataset.direction;
        // Using 101% instead of 100% to avoid rendering problems.
        // In order to create the "reveal" effect, the item slides moves in one direction and its inner element in the opposite direction.
        if (direction === "bt") {
          config.y = "101%";
          configInner.y = "-101%";
          configInner.x = "0%";
        } else if (direction === "tb") {
          config.y = "-101%";
          configInner.y = "101%";
          configInner.x = "0%";
        } else if (direction === "lr") {
          config.x = "-101%";
          configInner.x = "101%";
        } else if (direction === "rl") {
          config.x = "101%";
          configInner.x = "-101%";
        } else {
          config.x = "101%";
          config.y = "101%";
          configInner.x = "-101%";
          configInner.y = "-101%";
        }

        if (action === "open") {
          // Setting the initial values.
          TweenMax.set(el, config);
          TweenMax.set(innerEl, configInner);

          // Animate.
          TweenMax.to([el, innerEl], 0.9, {
            ease: Quint.easeOut,
            x: "0%",
            y: "0%",
            onComplete: () => animationEnd(pos),
          });
        } else {
          TweenMax.to(el, 0.6, {
            ease: Quart.easeInOut,
            x: config.x || 0,
            y: config.y || 0,
          });
          TweenMax.to(innerEl, 0.6, {
            ease: Quart.easeInOut,
            x: configInner.x || 0,
            y: configInner.y || 0,
            onComplete: () => animationEnd(pos),
          });
        }
      });

      // Show/Hide open and close ctrls.
      TweenMax.to(this.DOM.closeCtrl, 0.6, {
        delay: action === "open" ? 0.7 : 0.1,
        ease: action === "open" ? Quint.easeOut : Quart.easeInOut,
        startAt: action === "open" ? { rotation: 0 } : null,
        opacity: action === "open" ? 1 : 0,
        rotation: action === "open" ? 180 : 270,
      });
      TweenMax.to(this.DOM.openCtrl, action === "open" ? 0.6 : 0.3, {
        delay: action === "open" ? 0 : 0.3,
        ease: action === "open" ? Quint.easeOut : Quad.easeOut,
        opacity: action === "open" ? 0 : 1,
      });

      // Main links animation.
      TweenMax.staggerTo(
        this.DOM.mainLinks,
        action === "open" ? 0.9 : 0.2,
        {
          ease: action === "open" ? Quint.easeOut : Quart.easeInOut,
          startAt: action === "open" ? { y: "50%", opacity: 0 } : null,
          y: action === "open" ? "0%" : "50%",
          opacity: action === "open" ? 1 : 0,
        },
        action === "open" ? 0.1 : -0.1
      );

      // SidemenuUzi links animation.
      TweenMax.staggerTo(
        this.DOM.sidemenuUziLinks,
        action === "open" ? 0.5 : 0.2,
        {
          ease: action === "open" ? Quint.easeInOut : Quart.easeInOut,
          startAt: action === "open" ? { y: "100%" } : null,
          y: action === "open" ? "0%" : "100%",
        },
        action === "open" ? 0.05 : -0.05
      );

      // The "Learn how to participate" menuUzi link.
      TweenMax.to(this.DOM.menuUzilink, action === "open" ? 0.9 : 0.6, {
        ease: action === "open" ? Quint.easeOut : Quart.easeInOut,
        startAt: action === "open" ? { x: "10%" } : null,
        x: action === "open" ? "0%" : "10%",
      });
    }
  }
  // Initialize the menuUzi.
  const menuUzi = new MenuUzi(document.querySelector("nav.menuUzi"));

  // Preload images.
  imagesLoaded(document.querySelector(".background"), { background: true }, () =>
    document.body.classList.remove("loading")
  );

  // extra stuff..

  // From http://www.quirksmode.org/js/events_properties.html#position
  // Get the mouse position.
  const getMousePos = (e) => {
    let posx = 0;
    let posy = 0;
    if (!e) e = window.event;
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return { x: posx, y: posy };
  };

  // Main image  tilt effect.
  class TiltFx {
    constructor() {
      this.DOM = { main: document.querySelector(".background") };
      // Number of layers (how many repeated image elements)
      this.layersTotal = 4;
      this.layout();
      this.initEvents();
    }
    layout() {
      let inner = "";
      for (let i = 0; i <= this.layersTotal - 1; ++i) {
        inner += '<div class="background__copy" style="background-image: url()"></div>';
      }
      this.DOM.main.innerHTML = inner;
      this.DOM.layers = Array.from(this.DOM.main.querySelectorAll(".background__copy"));
    }
    initEvents() {
      this.mousemoveFn = (ev) => requestAnimationFrame(() => this.tilt(ev));
      document.body.addEventListener("mousemove", this.mousemoveFn);
    }
    // Tilt the image wrap and texts when mouse moving the current slide.
    tilt(ev) {
      if (!allowTilt) return;
      const mousepos = getMousePos(ev);
      const bounds = this.DOM.main.getBoundingClientRect();
      // Mouse position relative to the main element (this.DOM.main).
      const relmousepos = {
        x: mousepos.x - bounds.left,
        y: mousepos.y - bounds.top,
      };

      this.DOM.layers.forEach((layer, pos) => {
        // Move the element from -val to val pixels in both x and y axis.
        let val = pos + 1;
        let t = { x: [val, -val], y: [val, -val] },
          r = { x: [-2, 2], y: [-val, val] },
          s = { v: [1.03, 0.97] };

        const transforms = {
          translation: {
            x: ((t.x[1] - t.x[0]) / bounds.width) * relmousepos.x + t.x[0],
            y: ((t.y[1] - t.y[0]) / bounds.height) * relmousepos.y + t.y[0],
          },
          rotation: {
            x: ((r.x[1] - r.x[0]) / bounds.height) * relmousepos.y + r.x[0],
            y: ((r.y[1] - r.y[0]) / bounds.width) * relmousepos.x + r.y[0],
          },
          scale: {
            v: ((s.v[1] - s.v[0]) / bounds.height) * relmousepos.y + s.v[0],
          },
        };

        TweenMax.to(layer, 1.5, {
          ease: "Power1.easeOut",
          x: transforms.translation.x,
          y: transforms.translation.y,
          rotationX: transforms.rotation.x,
          rotationY: transforms.rotation.y,
          scale: transforms.scale.v,
        });
      });
    }
    // Scale up all the layers.
    zoom() {
      TweenMax.staggerTo(
        this.DOM.layers,
        1.5,
        {
          ease: "Expo.easeOut",
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1.1,
        },
        0.04
      );
    }
    reset() {
      TweenMax.staggerTo(
        this.DOM.layers,
        1.5,
        {
          ease: "Expo.easeOut",
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
        },
        0.07
      );
    }
  }

  const tilt = new TiltFx();
}
