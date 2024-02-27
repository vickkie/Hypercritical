// magnetic-curberto.js

(function ($) {
    function Magnetic(el, options) {
        this.el = $(el);
        this.options = $.extend(true, {
            y: 0.2,
            x: 0.2,
            s: 0.2,
            rs: 0.7
        }, this.el.data('magnetic') || options);

        this.y = 0;
        this.x = 0;
        this.width = 0;
        this.height = 0;

        if (this.el.data('magnetic-init')) return;
        this.el.data('magnetic-init', true);

        this.bind();
    }

    Magnetic.prototype.bind = function () {
        var self = this;

        this.el.on('mouseenter', function () {
            self.y = self.el.offset().top - window.pageYOffset;
            self.x = self.el.offset().left - window.pageXOffset;
            self.width = self.el.outerWidth();
            self.height = self.el.outerHeight();
        });

        this.el.on('mousemove', function (e) {
            var y = (e.clientY - self.y - self.height / 2) * self.options.y;
            var x = (e.clientX - self.x - self.width / 2) * self.options.x;

            self.move(x, y, self.options.s);
        });

        this.el.on('mouseleave', function (e) {
            self.move(0, 0, self.options.rs);
        });
    };

    Magnetic.prototype.move = function (x, y, speed) {
        gsap.to(this.el, {
            y: y,
            x: x,
            force3D: true,
            overwrite: true,
            duration: speed
        });
    };

    window.Magnetic = Magnetic;

})(jQuery);
