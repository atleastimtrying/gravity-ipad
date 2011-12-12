(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Ball = (function() {

    function Ball(p5, app) {
      this.p5 = p5;
      this.app = app;
      this.pressed = __bind(this.pressed, this);
      this.x = this.p5.random(this.p5.width - 200) + 100;
      this.y = this.p5.random(this.p5.height - 200) + 100;
      this.radius = p5.random(20) + 20;
      this.xacc = this.p5.random(2) - 1;
      this.yacc = this.p5.random(2) - 1;
      this.hue = this.p5.random(300);
      this.snapMouse = false;
    }

    Ball.prototype.draw = function() {
      if (this.snapMouse) {
        this.x = this.p5.mouseX;
        this.y = this.p5.mouseY;
      }
      this.p5.fill(this.hue, 10, 8);
      this.p5.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
      this.friction();
      this.hitTest();
      return this.movement();
    };

    Ball.prototype.movement = function() {
      this.x += this.xacc;
      this.y += this.yacc;
      return this.edges();
    };

    Ball.prototype.friction = function() {
      this.xacc *= this.app.friction;
      this.yacc *= this.app.friction;
      this.xacc += this.app.xgravity;
      return this.yacc += this.app.ygravity;
    };

    Ball.prototype.edges = function() {
      if (this.y > this.p5.height - this.radius) {
        this.y = this.p5.height - this.radius;
        this.yacc *= -1;
      }
      if (this.y < this.radius) {
        this.y = this.radius;
        this.yacc *= -1;
      }
      if (this.x >= this.p5.width - this.radius) {
        this.x = this.p5.width - this.radius;
        this.xacc *= -1;
      }
      if (this.x < this.radius) {
        this.x = this.radius;
        return this.xacc *= -1;
      }
    };

    Ball.prototype.hitTest = function() {
      var ball, _i, _len, _ref, _results;
      _ref = this.app.balls;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ball = _ref[_i];
        _results.push(this.intersect(ball));
      }
      return _results;
    };

    Ball.prototype.setAcc = function(xacc, yacc) {
      this.xacc = xacc;
      return this.yacc = yacc;
    };

    Ball.prototype.pressed = function() {
      if (this.p5.dist(this.p5.mouseX, this.p5.mouseY, this.x, this.y) < this.radius && !this.app.oneSelected) {
        this.snapMouse = true;
        return this.app.oneSelected = true;
      }
    };

    Ball.prototype.released = function() {
      if (this.snapMouse) {
        this.setAcc(this.p5.mouseX - this.p5.pmouseX, this.p5.mouseY - this.p5.pmouseY);
        return this.snapMouse = false;
      }
    };

    Ball.prototype.testforself = function(ball) {
      return ball.x !== this.x && ball.y !== this.y;
    };

    Ball.prototype.intersect = function(ball) {
      var Across1, Across2, App1, App2, Depart1, Depart2, distance, theta;
      distance = this.p5.dist(this.x, this.y, ball.x, ball.y);
      if (distance < ball.radius + this.radius && this.testforself(ball)) {
        this.x = ball.x + (this.x - ball.x) * (ball.radius + this.radius) / distance;
        this.y = ball.y + (this.y - ball.y) * (ball.radius + this.radius) / distance;
        theta = this.p5.atan2(ball.y - this.y, ball.x - this.x);
        App1 = -(ball.xacc * this.p5.cos(theta) + ball.yacc * this.p5.sin(theta));
        Across1 = ball.yacc * this.p5.cos(theta) - ball.xacc * this.p5.sin(theta);
        App2 = this.xacc * this.p5.cos(theta) + this.yacc * this.p5.sin(theta);
        Across2 = this.yacc * this.p5.cos(theta) - this.xacc * this.p5.sin(theta);
        Depart1 = App2;
        Depart2 = App1;
        Depart1 *= 0.8;
        Depart2 *= 0.8;
        Across1 *= 0.8;
        Across2 *= 0.8;
        ball.xacc = Depart1 * this.p5.cos(theta) - Across1 * this.p5.sin(theta);
        ball.yacc = Depart1 * this.p5.sin(theta) + Across1 * this.p5.cos(theta);
        this.xacc = -(Across2 * this.p5.sin(theta) + Depart2 * this.p5.cos(theta));
        return this.yacc = Across2 * this.p5.cos(theta) - Depart2 * this.p5.sin(theta);
      }
    };

    return Ball;

  })();

}).call(this);
