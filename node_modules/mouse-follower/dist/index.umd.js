(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.MouseFollower = factory());
})(this, (function () {
    /*!
     * Cuberto Mouse Follower
     * https://cuberto.com/
     *
     * @version 1.1.2
     * @author Cuberto, Artem Dordzhiev (Draft)
     */
    var MouseFollower = /*#__PURE__*/function () {
      /**
       * @typedef {Object} MouseFollowerOptions
       * @property {string|HTMLElement|null} [el] Existed cursor element.
       * @property {string|HTMLElement|null} [container] Cursor container.
       * @property {string} [className] Cursor root element class name.
       * @property {string} [innerClassName] Inner element class name.
       * @property {string} [textClassName] Text element class name.
       * @property {string} [mediaClassName] Media element class name.
       * @property {string} [mediaBoxClassName] Media inner element class name.
       * @property {string} [iconSvgClassName] SVG sprite class name.
       * @property {string} [iconSvgNamePrefix] SVG sprite icon class name prefix.
       * @property {string} [iconSvgSrc] SVG sprite source.
       * @property {string|null} [dataAttr] Name of data attribute for changing cursor state directly in HTML.
       * @property {string} [hiddenState] Hidden state name.
       * @property {string} [textState] Text state name.
       * @property {string} [iconState] Icon state name.
       * @property {string|null} [activeState] Active (mousedown) state name. Set false to disable.
       * @property {string} [mediaState] Media (image/video) state name.
       * @property {Object} [stateDetection] State detection rules.
       * @property {boolean} [visible] Is cursor visible by default.
       * @property {boolean} [visibleOnState] Automatically show/hide cursor when state added.
       * @property {number} [speed] Cursor movement speed.
       * @property {string} [ease] Timing function of cursor movement.
       * @property {boolean} [overwrite] Overwrite or remain cursor position when `mousemove` event happens.
       * @property {number} [skewing] Default skewing factor.
       * @property {number} [skewingText] Skewing effect factor in a text state.
       * @property {number} [skewingIcon] Skewing effect factor in a icon state.
       * @property {number} [skewingMedia] Skewing effect factor in a media (image/video) state.
       * @property {number} [skewingDelta] Skewing effect base delta.
       * @property {number} [skewingDeltaMax] Skew effect max delta.
       * @property {number} [stickDelta] Stick effect delta.
       * @property {number} [showTimeout] Delay before show.
       * @property {boolean} [hideOnLeave] Hide the cursor when mouse leave container.
       * @property {number} [hideTimeout] Delay before hiding. It should be equal to the CSS hide animation time.
       * @property {number[]} [initialPos] Array (x, y) of initial cursor position.
       */

      /**
       * Register GSAP animation library.
       *
       * @param {gsap} gsap GSAP library.
       */
      MouseFollower.registerGSAP = function registerGSAP(gsap) {
        MouseFollower.gsap = gsap;
      }
      /**
       * Create cursor instance.
       *
       * @param {MouseFollowerOptions} [options] Cursor options.
       */
      ;

      function MouseFollower(options) {
        if (options === void 0) {
          options = {};
        }

        /** @type {MouseFollowerOptions} **/
        this.options = Object.assign({}, {
          el: null,
          container: document.body,
          className: 'mf-cursor',
          innerClassName: 'mf-cursor-inner',
          textClassName: 'mf-cursor-text',
          mediaClassName: 'mf-cursor-media',
          mediaBoxClassName: 'mf-cursor-media-box',
          iconSvgClassName: 'mf-svgsprite',
          iconSvgNamePrefix: '-',
          iconSvgSrc: '',
          dataAttr: 'cursor',
          hiddenState: '-hidden',
          textState: '-text',
          iconState: '-icon',
          activeState: '-active',
          mediaState: '-media',
          stateDetection: {
            '-pointer': 'a,button'
          },
          visible: true,
          visibleOnState: false,
          speed: 0.55,
          ease: 'expo.out',
          overwrite: true,
          skewing: 0,
          skewingText: 2,
          skewingIcon: 2,
          skewingMedia: 2,
          skewingDelta: 0.001,
          skewingDeltaMax: 0.15,
          stickDelta: 0.15,
          showTimeout: 0,
          hideOnLeave: true,
          hideTimeout: 300,
          hideMediaTimeout: 300,
          initialPos: [-window.innerWidth, -window.innerHeight]
        }, options);
        if (this.options.visible && options.stateDetection == null) this.options.stateDetection['-hidden'] = 'iframe';
        this.gsap = MouseFollower.gsap || window.gsap;
        this.el = typeof this.options.el === 'string' ? document.querySelector(this.options.el) : this.options.el;
        this.container = typeof this.options.container === 'string' ? document.querySelector(this.options.container) : this.options.container;
        this.skewing = this.options.skewing;
        this.pos = {
          x: this.options.initialPos[0],
          y: this.options.initialPos[1]
        };
        this.vel = {
          x: 0,
          y: 0
        };
        this.event = {};
        this.events = [];
        this.init();
      }
      /**
       * Init cursor.
       */


      var _proto = MouseFollower.prototype;

      _proto.init = function init() {
        if (!this.el) this.create();
        this.createSetter();
        this.bind();
        this.render(true);
        this.ticker = this.render.bind(this, false);
        this.gsap.ticker.add(this.ticker);
      }
      /**
       * Create cursor DOM element and append to container.
       */
      ;

      _proto.create = function create() {
        this.el = document.createElement('div');
        this.el.className = this.options.className;
        this.el.classList.add(this.options.hiddenState);
        this.inner = document.createElement('div');
        this.inner.className = this.options.innerClassName;
        this.text = document.createElement('div');
        this.text.className = this.options.textClassName;
        this.media = document.createElement('div');
        this.media.className = this.options.mediaClassName;
        this.mediaBox = document.createElement('div');
        this.mediaBox.className = this.options.mediaBoxClassName;
        this.media.appendChild(this.mediaBox);
        this.inner.appendChild(this.media);
        this.inner.appendChild(this.text);
        this.el.appendChild(this.inner);
        this.container.appendChild(this.el);
      }
      /**
       * Create GSAP setters.
       */
      ;

      _proto.createSetter = function createSetter() {
        this.setter = {
          x: this.gsap.quickSetter(this.el, 'x', 'px'),
          y: this.gsap.quickSetter(this.el, 'y', 'px'),
          rotation: this.gsap.quickSetter(this.el, 'rotation', 'deg'),
          scaleX: this.gsap.quickSetter(this.el, 'scaleX'),
          scaleY: this.gsap.quickSetter(this.el, 'scaleY'),
          wc: this.gsap.quickSetter(this.el, 'willChange'),
          inner: {
            rotation: this.gsap.quickSetter(this.inner, 'rotation', 'deg')
          }
        };
      }
      /**
       * Create and attach events.
       */
      ;

      _proto.bind = function bind() {
        var _this = this;

        this.event.mouseleave = function () {
          return _this.hide();
        };

        this.event.mouseenter = function () {
          return _this.show();
        };

        this.event.mousedown = function () {
          return _this.addState(_this.options.activeState);
        };

        this.event.mouseup = function () {
          return _this.removeState(_this.options.activeState);
        };

        this.event.mousemoveOnce = function () {
          return _this.show();
        };

        this.event.mousemove = function (e) {
          _this.gsap.to(_this.pos, {
            x: _this.stick ? _this.stick.x - (_this.stick.x - e.clientX) * _this.options.stickDelta : e.clientX,
            y: _this.stick ? _this.stick.y - (_this.stick.y - e.clientY) * _this.options.stickDelta : e.clientY,
            overwrite: _this.options.overwrite,
            ease: _this.options.ease,
            duration: _this.visible ? _this.options.speed : 0,
            onUpdate: function onUpdate() {
              return _this.vel = {
                x: e.clientX - _this.pos.x,
                y: e.clientY - _this.pos.y
              };
            }
          });
        };

        this.event.mouseover = function (e) {
          for (var target = e.target; target && target !== _this.container; target = target.parentNode) {
            if (e.relatedTarget && target.contains(e.relatedTarget)) break;

            for (var state in _this.options.stateDetection) {
              if (target.matches(_this.options.stateDetection[state])) _this.addState(state);
            }

            if (_this.options.dataAttr) {
              var params = _this.getFromDataset(target);

              if (params.state) _this.addState(params.state);
              if (params.text) _this.setText(params.text);
              if (params.icon) _this.setIcon(params.icon);
              if (params.img) _this.setImg(params.img);
              if (params.video) _this.setVideo(params.video);
              if (typeof params.show !== 'undefined') _this.show();
              if (typeof params.stick !== 'undefined') _this.setStick(params.stick || target);
            }
          }
        };

        this.event.mouseout = function (e) {
          for (var target = e.target; target && target !== _this.container; target = target.parentNode) {
            if (e.relatedTarget && target.contains(e.relatedTarget)) break;

            for (var state in _this.options.stateDetection) {
              if (target.matches(_this.options.stateDetection[state])) _this.removeState(state);
            }

            if (_this.options.dataAttr) {
              var params = _this.getFromDataset(target);

              if (params.state) _this.removeState(params.state);
              if (params.text) _this.removeText();
              if (params.icon) _this.removeIcon();
              if (params.img) _this.removeImg();
              if (params.video) _this.removeVideo();
              if (typeof params.show !== 'undefined') _this.hide();
              if (typeof params.stick !== 'undefined') _this.removeStick();
            }
          }
        };

        if (this.options.hideOnLeave) {
          this.container.addEventListener('mouseleave', this.event.mouseleave, {
            passive: true
          });
        }

        if (this.options.visible) {
          this.container.addEventListener('mouseenter', this.event.mouseenter, {
            passive: true
          });
        }

        if (this.options.activeState) {
          this.container.addEventListener('mousedown', this.event.mousedown, {
            passive: true
          });
          this.container.addEventListener('mouseup', this.event.mouseup, {
            passive: true
          });
        }

        this.container.addEventListener('mousemove', this.event.mousemove, {
          passive: true
        });

        if (this.options.visible) {
          this.container.addEventListener('mousemove', this.event.mousemoveOnce, {
            passive: true,
            once: true
          });
        }

        if (this.options.stateDetection || this.options.dataAttr) {
          this.container.addEventListener('mouseover', this.event.mouseover, {
            passive: true
          });
          this.container.addEventListener('mouseout', this.event.mouseout, {
            passive: true
          });
        }
      }
      /**
       * Render the cursor in a new position.
       *
       * @param {boolean} [force=false] Force render.
       */
      ;

      _proto.render = function render(force) {
        if (force !== true && (this.vel.y === 0 || this.vel.x === 0)) {
          this.setter.wc('auto');
          return;
        }

        this.trigger('render');
        this.setter.wc('transform');
        this.setter.x(this.pos.x);
        this.setter.y(this.pos.y);

        if (this.skewing) {
          var distance = Math.sqrt(Math.pow(this.vel.x, 2) + Math.pow(this.vel.y, 2));
          var scale = Math.min(distance * this.options.skewingDelta, this.options.skewingDeltaMax) * this.skewing;
          var angle = Math.atan2(this.vel.y, this.vel.x) * 180 / Math.PI;
          this.setter.rotation(angle);
          this.setter.scaleX(1 + scale);
          this.setter.scaleY(1 - scale);
          this.setter.inner.rotation(-angle);
        }
      }
      /**
       * Show cursor.
       */
      ;

      _proto.show = function show() {
        var _this2 = this;

        this.trigger('show');
        clearInterval(this.visibleInt);
        this.visibleInt = setTimeout(function () {
          _this2.el.classList.remove(_this2.options.hiddenState);

          _this2.visible = true;

          _this2.render(true);
        }, this.options.showTimeout);
      }
      /**
       * Hide cursor.
       */
      ;

      _proto.hide = function hide() {
        var _this3 = this;

        this.trigger('hide');
        clearInterval(this.visibleInt);
        this.el.classList.add(this.options.hiddenState);
        this.visibleInt = setTimeout(function () {
          return _this3.visible = false;
        }, this.options.hideTimeout);
      }
      /**
       * Toggle cursor.
       *
       * @param {boolean} [force] Force state.
       */
      ;

      _proto.toggle = function toggle(force) {
        if (force === true || force !== false && !this.visible) {
          this.show();
        } else {
          this.hide();
        }
      }
      /**
       * Add state/states to the cursor.
       *
       * @param {string} state State name.
       */
      ;

      _proto.addState = function addState(state) {
        var _this$el$classList;

        this.trigger('addState', state);
        if (state === this.options.hiddenState) return this.hide();

        (_this$el$classList = this.el.classList).add.apply(_this$el$classList, state.split(' '));

        if (this.options.visibleOnState) this.show();
      }
      /**
       * Remove state/states from cursor.
       *
       * @param {string} state State name.
       */
      ;

      _proto.removeState = function removeState(state) {
        var _this$el$classList2;

        this.trigger('removeState', state);
        if (state === this.options.hiddenState) return this.show();

        (_this$el$classList2 = this.el.classList).remove.apply(_this$el$classList2, state.split(' '));

        if (this.options.visibleOnState && this.el.className === this.options.className) this.hide();
      }
      /**
       * Toggle cursor state.
       *
       * @param {string} state State name.
       * @param {boolean} [force] Force state.
       */
      ;

      _proto.toggleState = function toggleState(state, force) {
        if (force === true || force !== false && !this.el.classList.contains(state)) {
          this.addState(state);
        } else {
          this.removeState(state);
        }
      }
      /**
       * Set factor of skewing effect.
       *
       * @param {number} value Skewing factor.
       */
      ;

      _proto.setSkewing = function setSkewing(value) {
        this.gsap.to(this, {
          skewing: value
        });
      }
      /**
       * Reverts skewing factor to default.
       */
      ;

      _proto.removeSkewing = function removeSkewing() {
        this.gsap.to(this, {
          skewing: this.options.skewing
        });
      }
      /**
       * Stick cursor to the element.
       *
       * @param {string|HTMLElement} element Element or selector.
       */
      ;

      _proto.setStick = function setStick(element) {
        var el = typeof element === 'string' ? document.querySelector(element) : element;
        var rect = el.getBoundingClientRect();
        this.stick = {
          y: rect.top + rect.height / 2,
          x: rect.left + rect.width / 2
        };
      }
      /**
       * Unstick cursor from the element.
       */
      ;

      _proto.removeStick = function removeStick() {
        this.stick = false;
      }
      /**
       * Transform cursor to text mode with a given string.
       *
       * @param {string} text Text.
       */
      ;

      _proto.setText = function setText(text) {
        this.text.innerHTML = text;
        this.addState(this.options.textState);
        this.setSkewing(this.options.skewingText);
      }
      /**
       * Reverts cursor from text mode.
       */
      ;

      _proto.removeText = function removeText() {
        this.removeState(this.options.textState);
        this.removeSkewing();
      }
      /**
       * Transform cursor to svg icon mode.
       *
       * @param {string} name Icon identifier.
       * @param {string} [style=""] Additional SVG styles.
       */
      ;

      _proto.setIcon = function setIcon(name, style) {
        if (style === void 0) {
          style = '';
        }

        this.text.innerHTML = "<svg class='" + this.options.iconSvgClassName + " " + this.options.iconSvgNamePrefix + name + "'" + (" style='" + style + "'><use xlink:href='" + this.options.iconSvgSrc + "#" + name + "'></use></svg>");
        this.addState(this.options.iconState);
        this.setSkewing(this.options.skewingIcon);
      }
      /**
       * Reverts cursor from icon mode.
       */
      ;

      _proto.removeIcon = function removeIcon() {
        this.removeState(this.options.iconState);
        this.removeSkewing();
      }
      /**
       * Transform cursor to media mode with a given element.
       *
       * @param {HTMLElement} element Element.
       */
      ;

      _proto.setMedia = function setMedia(element) {
        var _this4 = this;

        clearTimeout(this.mediaInt);

        if (element) {
          this.mediaBox.innerHTML = '';
          this.mediaBox.appendChild(element);
        }

        this.mediaInt = setTimeout(function () {
          return _this4.addState(_this4.options.mediaState);
        }, 20);
        this.setSkewing(this.options.skewingMedia);
      }
      /**
       * Revert cursor from media mode.
       */
      ;

      _proto.removeMedia = function removeMedia() {
        var _this5 = this;

        clearTimeout(this.mediaInt);
        this.removeState(this.options.mediaState);
        this.mediaInt = setTimeout(function () {
          return _this5.mediaBox.innerHTML = '';
        }, this.options.hideMediaTimeout);
        this.removeSkewing();
      }
      /**
       * Transform cursor to image mode.
       *
       * @param {string} url Image url.
       */
      ;

      _proto.setImg = function setImg(url) {
        if (!this.mediaImg) this.mediaImg = new Image();
        if (this.mediaImg.src !== url) this.mediaImg.src = url;
        this.setMedia(this.mediaImg);
      }
      /**
       * Reverts cursor from image mode.
       */
      ;

      _proto.removeImg = function removeImg() {
        this.removeMedia();
      }
      /**
       * Transform cursor to video mode.
       *
       * @param {string} url Video url.
       */
      ;

      _proto.setVideo = function setVideo(url) {
        if (!this.mediaVideo) {
          this.mediaVideo = document.createElement('video');
          this.mediaVideo.muted = true;
          this.mediaVideo.loop = true;
          this.mediaVideo.autoplay = true;
        }

        if (this.mediaVideo.src !== url) {
          this.mediaVideo.src = url;
          this.mediaVideo.load();
        }

        this.mediaVideo.play();
        this.setMedia(this.mediaVideo);
      }
      /**
       * Reverts cursor from video mode.
       */
      ;

      _proto.removeVideo = function removeVideo() {
        if (this.mediaVideo && this.mediaVideo.readyState > 2) this.mediaVideo.pause();
        this.removeMedia();
      }
      /**
       * Attach an event handler function.
       *
       * @param {string} event Event name.
       * @param {function} callback Callback.
       */
      ;

      _proto.on = function on(event, callback) {
        if (!(this.events[event] instanceof Array)) this.off(event);
        this.events[event].push(callback);
      }
      /**
       * Remove an event handler.
       *
       * @param {string} event Event name.
       * @param {function} [callback] Callback.
       */
      ;

      _proto.off = function off(event, callback) {
        if (callback) {
          this.events[event] = this.events[event].filter(function (f) {
            return f !== callback;
          });
        } else {
          this.events[event] = [];
        }
      }
      /**
       * Execute all handlers for the given event type.
       *
       * @param {string} event Event name.
       * @param params Extra parameters.
       */
      ;

      _proto.trigger = function trigger(event) {
        var _arguments = arguments,
            _this6 = this;

        if (!this.events[event]) return;
        this.events[event].forEach(function (f) {
          return f.call.apply(f, [_this6, _this6].concat([].slice.call(_arguments, 1)));
        });
      }
      /**
       * Get cursor options from data attribute of a given element.
       *
       * @param {HTMLElement} element Element.
       * @return {Object} Options.
       */
      ;

      _proto.getFromDataset = function getFromDataset(element) {
        var dataset = element.dataset;
        return {
          state: dataset[this.options.dataAttr],
          show: dataset[this.options.dataAttr + 'Show'],
          text: dataset[this.options.dataAttr + 'Text'],
          icon: dataset[this.options.dataAttr + 'Icon'],
          img: dataset[this.options.dataAttr + 'Img'],
          video: dataset[this.options.dataAttr + 'Video'],
          stick: dataset[this.options.dataAttr + 'Stick']
        };
      }
      /**
       * Destroy cursor instance.
       */
      ;

      _proto.destroy = function destroy() {
        this.trigger('destroy');
        this.gsap.ticker.remove(this.ticker);
        this.container.removeEventListener('mouseleave', this.event.mouseleave);
        this.container.removeEventListener('mouseenter', this.event.mouseenter);
        this.container.removeEventListener('mousedown', this.event.mousedown);
        this.container.removeEventListener('mouseup', this.event.mouseup);
        this.container.removeEventListener('mousemove', this.event.mousemove);
        this.container.removeEventListener('mousemove', this.event.mousemoveOnce);
        this.container.removeEventListener('mouseover', this.event.mouseover);
        this.container.removeEventListener('mouseout', this.event.mouseout);

        if (this.el) {
          this.container.removeChild(this.el);
          this.el = null;
          this.mediaImg = null;
          this.mediaVideo = null;
        }
      };

      return MouseFollower;
    }();

    return MouseFollower;

}));
