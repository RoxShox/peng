!(function () {
  var t = 2 * Math.PI,
    i = {
      x: 1,
      y: 1,
    },
    s = function (s, h) {
      (this.canvas = document.getElementById(s)),
        (this.ctx = null),
        (this.particles = []),
        (this.starsCounter = h),
        (this.maxW = window.innerWidth),
        (this.maxH = window.innerHeight),
        (this.init = function () {
          var t = this.canvas;
          (t.width = this.maxW),
            (t.height = this.maxH),
            (this.ctx = t.getContext("2d"));
          for (var i = 0; i < this.starsCounter; i++) {
            var s = new n(i, this.maxW, this.maxH);
            this.particles.push(s);
          }
          window.addEventListener("resize", this.onResize.bind(this), !1);
        }),
        (this.onMouseMove = function (t) {
          i = {
            x: t.offsetX,
            y: t.offsetY,
          };
        }),
        (this.onResize = function () {
          var t = this.canvas;
          //   (this.maxW = window.innerWidth),
          this.maxH = window.innerHeight;
          //     (t.width = this.maxW),
          //     (t.height = this.maxH);
          //   for (var i = this.particles, s = 0; s < i.length; s++)
          //     i[s].onResize(this.maxW, this.maxH);
        }),
        (this.animate = function () {
          var t = this;
          requestAnimationFrame(function () {
            t.animate();
          }),
            t.render();
        }),
        (this.render = function () {
          var t = 0.00075 * new Date().getTime(),
            i = this.ctx;
          i.clearRect(0, 0, this.maxW, this.maxH);
          for (var s = this.particles, h = 0; h < s.length; h++) {
            s[h].onUpdate(i, t);
          }
        });
      var n = function (i, s, h) {
        const curHeight = window.innerWidth > 768 ? 0.5 : 0.3;

        return (
          (this.id = i),
          (this.x = Math.random() * s),
          (this.y = Math.random() * h * curHeight),
          (this.radius = 1 + Math.random() * 2),
          (this.alpha = Math.random()),
          (this.velocity = 0.05 * this.radius),
          (this.onUpdate = function (i, s) {
            (this.alpha = Math.abs(0.8 * Math.sin(s + this.id))),
              (this.x -= this.velocity),
              this.x <= 0 && (this.x = window.innerWidth),
              i.beginPath(),
              (i.fillStyle = "rgba(255, 255, 255, " + this.alpha + ")"),
              i.arc(this.x, this.y, this.radius, 0, t),
              i.fill(),
              i.closePath();
          }),
          (this.onResize = function (t, i) {
            (this.x = Math.random() * t), (this.y = Math.random() * i);
          }),
          this
        );
      };
      this.init(), this.animate();
    };
  //   window.stars = new s("star-field", 50);
  window.stars = new s("star-field", 200);
})();
