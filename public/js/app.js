
  window.sketch = function(p5) {
    p5.setup = function() {
      var count;
      p5.colorMode(p5.HSB, 300, 10, 10, 10);
      p5.size(window.innerWidth, window.innerHeight);
      p5.noStroke();
      p5.smooth();
      this.mouseUp = true;
      this.oneSelected = false;
      this.balls = [];
      this.friction = 0.999;
      for (count = 0; count <= 5; count++) {
        this.balls.push(new window.Ball(p5, this));
      }
      this.xgravity = 0;
      return this.ygravity = 0.1;
    };
    p5.draw = function() {
      var ball, _i, _len, _ref, _results;
      p5.fill(0, 0, 0, 1);
      p5.rect(0, 0, p5.width, p5.height);
      _ref = this.balls;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ball = _ref[_i];
        _results.push(ball.draw());
      }
      return _results;
    };
    p5.mousePressed = function() {
      var ball, _i, _len, _ref, _results;
      _ref = this.balls;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ball = _ref[_i];
        _results.push(ball.pressed());
      }
      return _results;
    };
    p5.touchStart = function() {
      var ball, _i, _len, _ref, _results;
      _ref = this.balls;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ball = _ref[_i];
        _results.push(ball.pressed());
      }
      return _results;
    };
    p5.mouseReleased = function() {
      var ball, _i, _len, _ref, _results;
      this.oneSelected = false;
      _ref = this.balls;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ball = _ref[_i];
        _results.push(ball.released());
      }
      return _results;
    };
    p5.touchEnd = function() {
      var ball, _i, _len, _ref, _results;
      this.oneSelected = false;
      _ref = this.balls;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ball = _ref[_i];
        _results.push(ball.released());
      }
      return _results;
    };
    return p5.keypressed = function() {
      var ball, _i, _len, _ref, _results;
      _ref = this.balls;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ball = _ref[_i];
        _results.push(ball.setAcc(0, 0));
      }
      return _results;
    };
  };

  $(function() {
    var canvas;
    canvas = $("canvas");
    window.processing = new Processing(canvas[0], window.sketch);
    $(window).resize(function() {
      $("canvas").css({
        height: $(window).height(),
        width: $(window).width()
      });
      return processing.size($(window).width(), $(window).height());
    });
    $(window).bind("deviceorientation", window.deviceOrientationHandler);
    $(body).bind("touchmove", window.blockIosScroll);
    return $(body).bind("orientationchange", window.blockRotation);
  });

  window.deviceOrientationHandler = function(event) {
    window.processing.xgravity = -event.originalEvent.beta / 40;
    return window.processing.ygravity = event.originalEvent.gamma / 40;
  };

  window.blockIosScroll = function(event) {
    return event.preventDefault();
  };

  window.blockRotation = function(event) {
    return alert(window.orientation);
  };
