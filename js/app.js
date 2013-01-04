(function() {
  var App;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  App = (function() {

    function App() {
      this.draw = __bind(this.draw, this);
      this.deviceorientation = __bind(this.deviceorientation, this);
      this.resize = __bind(this.resize, this);      this.setupVars();
      this.bindEvents();
      this.draw();
    }

    App.prototype.setupVars = function() {
      var count;
      this.canvas = document.getElementsByTagName("canvas")[0];
      this.ctx = this.canvas.getContext('2d');
      this.addCircle();
      this.mouseUp = true;
      this.oneSelected = false;
      this.balls = [];
      this.friction = 0.999;
      this.bounceModifier = 0.7;
      this.resize();
      for (count = 0; count <= 15; count++) {
        this.balls.push(new window.Ball(this));
      }
      this.xgravity = 0;
      return this.ygravity = 0.1;
    };

    App.prototype.bindEvents = function() {
      window.addEventListener('resize', this.resize, false);
      window.addEventListener('deviceorientation', this.deviceorientation, false);
      this.canvas.addEventListener('touchmove', this.touchmove, false);
      return document.body.addEventListener("orientationchange", this.orientationchange, false);
    };

    App.prototype.resize = function() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.style.height = "" + this.height + "px";
      this.canvas.style.width = "" + this.width + "px";
      this.canvas.width = this.width;
      return this.canvas.height = this.height;
    };

    App.prototype.deviceorientation = function(event) {
      this.xgravity = -event.beta / 40;
      return this.ygravity = event.gamma / 40;
    };

    App.prototype.addCircle = function() {
      return this.ctx.fillCircle = function(x, y, r) {
        this.beginPath();
        this.arc(x, y, r, 0, Math.PI * 2, false);
        this.closePath();
        return this.fill();
      };
    };

    App.prototype.dist = function(x1, y1, x2, y2) {
      var xs, ys;
      xs = x2 - x1;
      xs = xs * xs;
      ys = y2 - y1;
      ys = ys * ys;
      return Math.sqrt(xs + ys);
    };

    App.prototype.touchmove = function(e) {
      return e.preventDefault();
    };

    App.prototype.orientationchange = function(event) {
      return console.log(window.orientation);
    };

    App.prototype.random = function(int) {
      return Math.random() * int;
    };

    App.prototype.draw = function() {
      var ball, _i, _len, _ref;
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(0, 0, this.width, this.height);
      _ref = this.balls;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ball = _ref[_i];
        ball.draw();
      }
      return setTimeout(this.draw, 50);
    };

    return App;

  })();

  window.addEventListener('load', function() {
    return window.app = new App;
  }, false);

}).call(this);
